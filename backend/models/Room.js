const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  name: String,
  size: Number,
  unit: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Room", roomSchema)