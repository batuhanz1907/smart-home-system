const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },

  provider: { type: String, default: "local" },

  resetToken: { type: String },
  resetTokenExpire: { type: Date },

  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema)