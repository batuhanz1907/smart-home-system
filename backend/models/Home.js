const mongoose = require("mongoose")

const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // şimdilik boş geçebiliriz
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Home", homeSchema)