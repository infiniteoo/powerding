const express = require("express");
const router = express.Router();
const PowerDings = require("../database/models/powerdings");

// @route   GET api/powerdings
// @desc    Get all powerdings
// @access  Public
router.get("/powerdings", (req, res) => {
  PowerDings.find()
    .sort({ date: -1 })
    .then((powerdings) => res.json(powerdings));
});

module.exports = router;
