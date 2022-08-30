const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

const sendEmail = require("../email/email.send");
const templates = require("../email/email.templates");
const emailMsgs = require("../email/email.msgs");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, email, organization, streamer } = req.body;

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
        /* res.json(savedUser); */
      });
    }
  });
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

router.get("/streamer/:streamer", (req, res) => {
  console.log("streamer route hit");
  User.findOne({ username: req.params.streamer }, (err, user) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

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
    req.logout((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("logout successful");
      }
    });
  }
});

// change password route

router.post(
  "/change-password",
  function (req, res, next) {
    console.log("routes/user.js, change-password, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("req", req.body);
    User.findOne(
      { email: req.body.email },

      (err, user) => {
        if (err) {
          console.log("found an error,", err);
          res.json({ msg: "old password does not match" });
        } else {
          console.log("user: ", user);

          if (user) {
            user.password = req.body.submittedNewPassword;
            user.save((err, updatedUser) => {
              if (err) return res.json(err);

              res.json({ msg: "password successfully changed" });
            });
          } else {
            console.log("old password does not match");
            res.json({ msg: "old password does not match" });
          }
        }
      }
    ).catch((err) => console.log("caught an error", err));
  }
);

module.exports = router;
