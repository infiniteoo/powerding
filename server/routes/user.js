const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const Powerding = require("../database/models/powerdings");
const passport = require("../passport");
const OPTIONS = require("../config").CHUCK_NORRIS_OPTIONS;
const sendEmail = require("../email/email.send");
const templates = require("../email/email.templates");
const emailMsgs = require("../email/email.msgs");
const axios = require("axios");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "server/public/sounds/");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
let upload = multer({ dest: "server/public/sounds", storage: storage });

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, email, streamer } = req.body;

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
        bannerImage: null,
        soundEffect: null,
        minAmountForMedia: "10.00",
        mediaLength: 180,
        confirmed: false,
        reactionGif: null,

        lastLogin: Date.now(),
      });

      // create three powerding entries in the database for the user
      // loop 3 times
      for (let i = 0; i < 3; i++) {
        axios
          .request(OPTIONS)
          .then(function (response) {
            const newPowerding = new Powerding({
              // set the user to the new user
              streamer: username,
              ttsVoice: 1,
              senderName: "Demo User",
              amountPaid: "1",
              played: "false",
              archived: "false",
              message: response.data.value,
              mediaLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            });

            // save the powerding
            newPowerding.save((err, savedPowerding) => {
              if (err) console.log(err);
              console.log("saved powerding", savedPowerding);
            });
          })
          .catch(function (error) {
            console.error(error);
          });
        // create a new powerding
      }

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
          // set lastLogin to current date
          User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $set: { lastLogin: Date.now() },
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
          bannerImage: user.bannerImage,
          lastLogin: user.lastLogin,
          userId: user._id,
          soundEffect: user.soundEffect,
          email: user.email,
          confirmed: user.confirmed,
          minAmountForMedia: user.minAmountForMedia,
          reactionGif: user.reactionGif,
          mediaLength: user.mediaLength,
        };
        res.send(userInfo);
      }
    );
  }
);

router.get("/streamer/:streamer", (req, res) => {
  console.log("streamer route hit", req.params.streamer);
  User.findOne({ username: req.params.streamer }, (err, user) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      if (user) {
        res.json({
          bannerImage: user.bannerImage,
          soundEffect: user.soundEffect,
          minAmountForMedia: user.minAmountForMedia,
          reactionGif: user.reactionGif,
          mediaLength: user.mediaLength,
        });
      }
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

router.post("/update-min-amount", (req, res) => {
  console.log("req.body", req.body);
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: { minAmountForMedia: req.body.minAmount },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/update-media-length", (req, res) => {
  console.log("req.body", req.body);
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: { mediaLength: req.body.mediaLen },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/update-banner", (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: { bannerImage: req.body.item.image },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/reaction-gif-update", (req, res) => {
  console.log("req.body", req.body);
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: { reactionGif: req.body.item.image },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/sound-effect-update", (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: { soundEffect: req.body.filename },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
});

router.post("/upload-file", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error("no file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.post("/move-file", (req, res) => {
  // move file to subdirectory named after category and subcategory
  console.log("move file ", req.body);
  const subdirectory = `${req.body.username}`;
  const newPath = path.join(__dirname, "../public/sounds/", subdirectory);
  console.log("REQ.BODY", req.body);
  console.log("NEWPATH:", newPath);
  fs.mkdirSync(newPath, { recursive: true });
  fs.renameSync(
    path.join(__dirname, "../public/sounds/") + req.body.filename,
    path.join(newPath, req.body.filename)
  );
});

router.get("/:username/:filename", (req, res) => {
  console.log("in file get route", req.params);
  res.sendFile(
    path.join(
      __dirname,
      `../public/sounds/${req.params.username}/${req.params.filename}`
    )
  );
});



module.exports = router;
