const express = require("express")
const router = express.Router()
const Room = require("../models/Room")
const Device = require("../models/Device")
const auth = require("../middleware/auth") 

// CREATE ROOM
router.post("/", auth, async (req, res) => { 
  const { name, size, unit, homeId } = req.body

  try {
    const room = await Room.create({
      name,
      size,
      unit,
      home: homeId,
      user: req.user.id,
    })

    const defaultDevices = [
      { name: "Smart Lamp", type: "lamp" },
      { name: "Speaker", type: "speaker" },
      { name: "Air Conditioner", type: "ac" },
      { name: "Humidifier", type: "humidifier" },
    ]

    const devices = defaultDevices.map((d) => ({
      ...d,
      user: req.user.id,
      home: homeId,
      room: room._id,
    }))

    await Device.insertMany(devices)

    res.json({ room, devices })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router