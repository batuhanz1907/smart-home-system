const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OAUTH
router.post("/oauth", async (req, res) => {
  const { email, name, password, provider } = req.body;

  if (!email || !provider) {
    return res.status(400).json({ message: "Email ve provider gerekli" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Yeni kullanıcı oluştur
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : await bcrypt.hash(crypto.randomBytes(16).toString("hex"), 10);

      user = await User.create({
        email,
        name,
        provider,
        password: hashedPassword,
      });
    } else if (password) {
      // Mevcut kullanıcı → şifre kontrolü
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Şifre hatalı." });
      }
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 10;
    await user.save();

    res.json({
      message: "Token oluşturuldu",
      resetToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;