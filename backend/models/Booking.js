const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  seatsBooked: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Booked" } // Booked, Cancelled
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
