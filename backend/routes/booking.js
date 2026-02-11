const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const router = express.Router();

// BOOK
router.post("/book", async (req,res)=>{
 try{
  const { userId, flightId, seatsBooked } = req.body;

  if(!userId || !flightId){
   return res.status(400).json({message:"Missing data"});
  }

  const flight = await Flight.findById(flightId);
  if(!flight) return res.status(404).json({message:"Flight not found"});

  flight.seats -= seatsBooked;
  await flight.save();

  const booking = await Booking.create({
   userId,
   flightId,
   seatsBooked,
   totalPrice: seatsBooked * flight.price,
   status:"Booked"
  });

  res.json(booking);

 }catch(err){
  console.error(err);
  res.status(500).json({error:err.message});
 }
});

// GET USER BOOKINGS
router.get("/:userId", async (req,res)=>{
 try{
  let bookings = await Booking.find({userId:req.params.userId})
   .populate("flightId");

  bookings = bookings.filter(b=>b.flightId!==null);

  res.json(bookings);

 }catch(err){
  console.error(err);
  res.status(500).json({error:err.message});
 }
});

module.exports = router;
