const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const router = express.Router();

/* BOOK FLIGHT */
router.post("/book", async (req, res) => {
 try {

  const { userId, flightId, seatsBooked } = req.body;

  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: "Flight not found" });

  if (flight.seats < seatsBooked)
   return res.status(400).json({ message: "Not enough seats" });

  flight.seats -= seatsBooked;
  await flight.save();

  const booking = await Booking.create({
   userId,
   flightId,
   seatsBooked,
   totalPrice: seatsBooked * flight.price,
   status: "Booked"
  });

  res.status(201).json(booking);

 } catch (err) {
  res.status(500).json({ error: err.message });
 }
});


/* GET USER BOOKINGS */
router.get("/:userId", async (req,res)=>{
 try{

  const bookings = await Booking.find({ userId:req.params.userId })
   .populate("flightId");

  res.json(bookings);

 }catch(err){
  res.status(500).json({error:err.message});
 }
});


/* CANCEL BOOKING */
router.delete("/:id", async (req,res)=>{
 try{
  await Booking.findByIdAndDelete(req.params.id);
  res.json({message:"Cancelled"});
 }catch(err){
  res.status(500).json({error:err.message});
 }
});

module.exports = router;
