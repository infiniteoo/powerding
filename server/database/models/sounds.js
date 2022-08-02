const mongoose = require("mongoose");

const SoundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  soundType: {
    type: String,
    required: true,
  },

  length: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bpm: {
    type: Number,
    required: false,
  },
  key: {
    type: String,
    required: false,
  },
  dateEntered: {
    type: Date,
    default: Date.now,
  },
});

const Sounds = mongoose.model("Sounds", SoundSchema);

module.exports = Sounds;
