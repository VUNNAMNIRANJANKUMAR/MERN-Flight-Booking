const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const router = express.Router();

// Book a flight
router.post("/book", async (req, res) => {
  try {
    const { userId, flightId, seatsBooked } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    if (flight.seats < seatsBooked) return res.status(400).json({ message: "Not enough seats available" });

    flight.seats -= seatsBooked;
    await flight.save();

    const booking = await Booking.create({
      userId,
      flightId,
      seatsBooked,
      totalPrice: seatsBooked * flight.price
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("flightId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// To Cancel the tickets
router.delete("/:id", async(req,res)=>{
  await Booking.findByIdAndDelete(req.params.id);
  res.json({message:"Booking cancelled"});
});

module.exports = router;
