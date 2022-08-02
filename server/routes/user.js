const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");
const emailController = require("../email/email.controller");
const sendEmail = require("../email/email.send");
const templates = require("../email/email.templates");
const emailMsgs = require("../email/email.msgs");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, email, organization } = req.body;

  // ADD VALIDATION
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        errmsg: `Sorry, already a user with the email address: ${email}`,
      });
    } else {
      const newUser = new User({
        email: email,
        username: username,
        password: password,
        accessLevel: 0,
        organization: organization,
        confirmed: false,
        downloadsRemaining: 5,
        lastLogin: Date.now(),
        // today's date plus five days
        fifteenDayReset: Date.now() + 1000 * 60 * 60 * 24 * 15,
      });

      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        sendEmail(savedUser.email, templates.confirm(savedUser._id))
          .then(() => res.json({ msg: emailMsgs.confirm }))
          .catch((err) => console.log(err));
        res.json(savedUser);
      });
    }
  });
});

router.post("/deduct-dl", function (req, res) {
  console.log("deduct-dl route hit");
  /*  console.log("deduct-dl req.body: ", req.body); */
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { $inc: { downloadsRemaining: -1 } },
    { new: true },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    }
  );
  /* res.send("deduct-dl response"); */
});

router.post(
  "/login",
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    // update lastLogin date in database
    User.findOne(
      { _id: req.user._id },

      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          // store lastLogin to temporary variable
          let tempDateVariable = user.lastLogin;
          // set lastLogin to current date
          User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $set: { lastLogin: Date.now(), previousLogin: tempDateVariable },
            },
            { new: true },
            function (err, success) {
              if (err) {
                console.log(err);
              } else {
                console.log("success");
              }
            }
          );

          // if user.lastLogin is greater than user.fifteenDayReset, reset downloadsRemaining to 5
          if (user.lastLogin > user.fifteenDayReset) {
            User.findOneAndUpdate(
              { _id: req.user._id },
              {
                $set: {
                  downloadsRemaining: user.downloadsRemaining + 5,
                  fifteenDayReset: Date.now() + 1000 * 60 * 60 * 24 * 15,
                },
              },
              { new: true },
              function (err, user) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("bi-monthly reset.  5 downloads added.");
                }
                /*  console.log("logged in ooga", req.user); */
                var userInfo = {
                  username: user.username,
                  password: user.password,
                  accessLevel: user.accessLevel,
                  downloadsRemaining: user.downloadsRemaining,
                  lastLogin: user.lastLogin,
                  previousLogin: user.previousLogin,
                  userId: user._id,
                  email: user.email,
                  confirmed: user.confirmed,
                };
                res.send(userInfo);
              }
            );
          } else {
            console.log("todays date is less than five day reset date");
          }
        }
        console.log("logged in ooga", req.user);
        var userInfo = {
          username: user.username,
          password: user.password,
          accessLevel: user.accessLevel,
          downloadsRemaining: user.downloadsRemaining,
          lastLogin: user.lastLogin,
          userId: user._id,
          previousLogin: user.previousLogin,
          email: user.email,
          confirmed: user.confirmed,
        };
        res.send(userInfo);
      }
    );
  }
);

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  /*  console.log(req.user); */
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
