const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const homeRoutes = require("./routes/home")
const roomRoutes = require("./routes/room")
const deviceRoutes = require("./routes/device")
const scheduleRoutes = require("./routes/schedule");
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/homes", homeRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/devices", deviceRoutes)
app.use("/api/schedules", scheduleRoutes);

// MongoDB bağlantı
mongoose.connect("mongodb://127.0.0.1:27017/smarthome")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("API çalışıyor")
})

app.listen(5000, () => {
  console.log("Server 5000 portunda çalışıyor")
})