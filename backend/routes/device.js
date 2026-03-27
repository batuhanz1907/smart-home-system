const express = require("express")
const router = express.Router()
const Device = require("../models/Device")
const auth = require("../middleware/auth")

// GET devices by room
router.get("/:roomId", auth, async (req, res) => {
  try {
    const devices = await Device.find({
      room: req.params.roomId,
      user: req.user.id,
    }).sort({ createdAt: -1 })

    res.json(devices)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// TOGGLE device active status
router.patch("/:id", auth, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id)

    if (!device) {
      return res.status(404).json({ message: "Device not found" })
    }

    if (device.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    device.isActive = !device.isActive
    device.updatedAt = Date.now()

    await device.save()

    res.json(device)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router