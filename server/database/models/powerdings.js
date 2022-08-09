const mongoose = require("mongoose");

const PowerDingSchema = new mongoose.Schema({
  streamer: {
    type: String,
    required: true,
  },
  ttsVoice: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: false,
  },
  mediaLink: {
    type: String,
    required: false,
  },

  amountPaid: {
    type: Number,
    required: true,
  },
  played: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  archived: {
    type: Boolean,
    required: true,
  },
  dateEntered: {
    type: Date,
    default: Date.now,
  },
});

const PowerDings = mongoose.model("PowerDings", PowerDingSchema);

module.exports = PowerDings;
