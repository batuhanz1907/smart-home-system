const express = require("express")
const router = express.Router()
const Home = require("../models/Home")
const authMiddleware = require("../middleware/auth")

// CREATE HOME
router.post("/create", authMiddleware, async (req, res) => {
  const { name } = req.body

  try {
    const home = await Home.create({
      name,
      user: req.user.id,
    })

    res.status(201).json(home)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET USER'S HOME
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const home = await Home.findOne({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(home)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router