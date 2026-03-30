const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const Home = require("../models/Home");
const auth = require("../middleware/auth");

router.get("/test", (req, res) => {
  console.log("SCHEDULE TEST ÇALIŞTI");
  res.send("ok");
});

// Kullanıcının schedule kayıtlarını getir
router.get("/", auth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(schedules);
  } catch (err) {
    console.log("GET SCHEDULES ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Yeni schedule ekle
router.post("/", auth, async (req, res) => {
  try {
    console.log("SCHEDULE HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const home = await Home.findOne({ user: req.user.id }).sort({ createdAt: -1 });

    if (!home) {
      return res.status(404).json({ error: "Bu kullanıcıya ait home bulunamadı" });
    }

    const schedule = await Schedule.create({
      user: req.user.id,
      home: home._id,
      room: req.body.roomId || null,

      title: req.body.title || "",
      subtitle: req.body.subtitle || "",
      roomName: req.body.roomName || "Living room",
      enabled: req.body.enabled ?? false,

      selectedDays: req.body.selectedDays || [],
      timeOn: req.body.timeOn || "",
      timeOff: req.body.timeOff || "",
      periodOn: req.body.periodOn || "",
      periodOff: req.body.periodOff || "",
    });

    res.status(201).json(schedule);
  } catch (err) {
    console.log("SCHEDULE SAVE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Schedule enabled aç/kapat
router.patch("/:id", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule bulunamadı" });
    }

    if (typeof req.body.enabled === "boolean") {
      schedule.enabled = req.body.enabled;
    }

    await schedule.save();

    res.json(schedule);
  } catch (err) {
    console.log("UPDATE SCHEDULE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Schedule sil
router.delete("/:id", auth, async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule bulunamadı" });
    }

    res.json({ message: "Schedule silindi", schedule });
  } catch (err) {
    console.log("DELETE SCHEDULE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
