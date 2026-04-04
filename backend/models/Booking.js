const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight"
  },
  seatsBooked: Number,
  totalPrice: Number,

  status: {
    type: String,
    default: "Booked"
  }, // ✅ comma added here

  pnr: {
    type: String,
    unique: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
