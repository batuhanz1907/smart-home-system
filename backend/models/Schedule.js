const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  },

  title: {
    type: String,
    default: "",
    trim: true,
  },

  subtitle: {
    type: String,
    default: "",
    trim: true,
  },

  roomName: {
    type: String,
    default: "Living room",
    trim: true,
  },

  enabled: {
    type: Boolean,
    default: false,
  },

  selectedDays: {
    type: [Number],
    default: [],
  },

  timeOn: {
    type: String,
    default: "",
  },

  timeOff: {
    type: String,
    default: "",
  },

  periodOn: {
    type: String,
    default: "",
  },

  periodOff: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
