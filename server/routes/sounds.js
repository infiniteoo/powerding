const express = require("express");
const router = express.Router();
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
let upload = multer({ dest: "server/public/sounds/", storage: storage });

// SOUNDS MODEL
const Sounds = require("../database/models/Sounds");

// @route   GET api/sounds
// @desc    Get all sounds
// @access  Public
router.get("/sounds", (req, res) => {
  Sounds.find()
    .sort({ date: -1 })
    .then((sounds) => res.json(sounds));
});

// @ROUTE get api/sounds:parameter
// @desc return various items from the sounds database depending on parameter
// @access Public
router.get("/sounds/:parameter", (req, res) => {
  /* console.log(req.params.parameter); */
  Sounds.find({ soundType: req.params.parameter })
    .sort({ dateEntered: -1 })
    .then((sounds) => res.json(sounds));
});

// @ route GE api/sound:id
// @ desc  Get sound by id
// @ access Private

router.get("/sound/:category/:subcategory/:filename", (req, res) => {
  console.log("oogabooga", req.params);
  res.sendFile(
    path.join(
      __dirname,
      `../public/sounds/${req.params.category}/${req.params.subcategory}/${req.params.filename}`
    )
  );
});

router.post("/sounds/upload/", (req, res) => {
  /* console.log(req); */
  // write req.body to Sounds database
  const newSound = new Sounds({
    soundType: req.body.subcategory,
    name: req.body.name,
    filename: req.body.filename,
    description: req.body.description,
    category: req.body.category,
    key: req.body.soundKey,
    dateEntered: Date.now(),
    length: req.body.length,
    bpm: req.body.bpm,
  });

  newSound.save().then((sound) => res.json(sound));
});

router.post("/sounds/uploadFile", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error("no file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.get("/dates/new_this_week", (req, res) => {
  console.log("route hit");

  // get all sounds from the database uploaded within the last seven days
  Sounds.find({ dateEntered: { $gte: Date.now() - 604800000 } })
    .sort({ dateEntered: -1 })
    .then((sounds) => {
      console.log("new this week db response", sounds);
      res.json(sounds);
    });
});

router.get("/dates/new_since_last_visit", (req, res) => {
  console.log("new since last visit route hit");
  console.log("req", req);
  // get all sounds from the database uploaded since the user last logged in
  Sounds.find({ dateEntered: { $gte: req.user.previousLogin } })
    .sort({ dateEntered: -1 })
    .then((sounds) => {
      console.log("new since last visit db response", sounds);
      res.json(sounds);
    });
});

router.get("/search/:search", (req, res) => {
  console.log("search route hit");
  console.log(req.params.search);
  Sounds.find({ $text: { $search: req.params.search } }).then((sounds) =>
    res.json(sounds)
  );
});

router.post("/sounds/moveFile", (req, res) => {
  // move file to subdirectory named after category and subcategory
  const subdirectory = `${req.body.category}/${req.body.subcategory}`;
  const newPath = path.join(__dirname, "../public/sounds/", subdirectory);
  console.log("REQ.BODY", req.body);
  console.log("NEWPATH:", newPath);
  fs.mkdirSync(newPath, { recursive: true });
  fs.renameSync(
    path.join(__dirname, "../public/sounds/") + req.body.filename,
    path.join(newPath, req.body.filename)
  );
});

module.exports = router;
