const express = require("express");
const router = express.Router();
const PowerDings = require("../database/models/powerdings");

router.get("/", (req, res) => {
  console.log("powerding route hit");
});

router.post("/", (req, res) => {
  // get all powerdings with streamer name
  console.log("powerding POST route hit");
  console.log(req.body);
  PowerDings.find({ streamer: req.params.streamer })
    .sort({ date: -1 })
    .then((powerdings) => res.json(powerdings));
});

module.exports = router;
