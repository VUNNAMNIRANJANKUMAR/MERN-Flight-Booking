const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  seats: Number
}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema);
