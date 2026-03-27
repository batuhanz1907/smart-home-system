const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },

  scene: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scene",
  },

  selectedDays: [Number],

  timeOn: String,
  timeOff: String,

  periodOn: String,
  periodOff: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);