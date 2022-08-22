const express = require("express");
const router = express.Router();
const PowerDings = require("../database/models/powerdings");

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

module.exports = router;
