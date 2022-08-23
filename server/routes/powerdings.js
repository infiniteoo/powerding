const express = require("express");
const router = express.Router();
const PowerDings = require("../database/models/powerdings");
const axios = require("axios");

router.get("/", (req, res) => {
  console.log("powerding route hit");
  console.log(req.query.streamerName);
  PowerDings.find({ streamer: req.query.streamerName })
    .sort({ date: -1 })
    .then((powerdings) => res.json(powerdings));
});

router.post("/", (req, res) => {
  // get all powerdings with streamer name
  console.log("powerding POST route hit");
  req.body.isAnonymous ? (req.body.donatorName = "Anonymous") : null;
  const newPowerDing = new PowerDings({
    streamer: req.body.streamer,
    ttsVoice: req.body.voice,
    senderName: req.body.donatorName,
    mediaLink: req.body.mediaLink,
    amountPaid: req.body.donationAmount,
    played: false,
    dateEntered: Date.now(),
    message: req.body.text,
    archived: false,
  });

  newPowerDing.save().then((powerding) => res.json(powerding));
});
router.post("/played", (req, res) => {
  console.log("powerding played route hit");
  console.log(req.body._id);
  PowerDings.findByIdAndUpdate(req.body._id, { played: true }).then(
    (powerding) => res.json(powerding)
  );
});

router.post("/archive", (req, res) => {
  console.log("powerding archive route hit");
  console.log(req.body._id);
  PowerDings.findByIdAndUpdate(req.body._id, { archived: true }).then(
    (powerding) => res.json(powerding)
  );
});

router.post("/recaptcha", async (req, res) => {
  console.log("recaptcha POST route hit");
  //Destructuring response token from request body
  const { token } = req.body;

  //sends secret key and response token to google
  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  );

  //check response status and send back to the client-side
  if (res.status(200)) {
    res.send("Human 👨 👩");
  } else {
    res.send("Robot 🤖");
  }
});

module.exports = router;
