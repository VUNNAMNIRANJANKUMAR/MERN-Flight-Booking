const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const flightRoutes = require("./routes/flight");
const bookingRoutes = require("./routes/booking");

require("dotenv").config();

const app = express();

app.use(cors({
  origin : "*"
}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/flight",flightRoutes);
app.use("/api/booking",bookingRoutes);


app.get("/", (req, res) => {
  res.send("Flight Booking Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
