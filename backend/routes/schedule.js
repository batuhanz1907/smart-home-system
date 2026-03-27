const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const auth = require("../middleware/auth");

router.get("/test", (req, res) => {
  console.log("SCHEDULE TEST ÇALIŞTI");
  res.send("ok");
});

router.post("/", auth, async (req, res) => {
  try {
    console.log("SCHEDULE HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const schedule = await Schedule.create({
      user: req.user.id,
      home: req.body.homeId,
      room: req.body.roomId,
      selectedDays: req.body.selectedDays,
      timeOn: req.body.timeOn,
      timeOff: req.body.timeOff,
      periodOn: req.body.periodOn,
      periodOff: req.body.periodOff,
    });

    res.json(schedule);
  } catch (err) {
    console.log("SCHEDULE SAVE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;