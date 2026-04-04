const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const router = express.Router();

function generatePNR() {
  let pnr = "";
  for (let i = 0; i < 12; i++) {
    pnr += Math.floor(Math.random() * 10);
  }
  return pnr;
}

// BOOK
router.post("/book", async (req,res)=>{
 try{
  const { userId, flightId, seatsBooked } = req.body;

  if(!userId || !flightId)
   return res.status(400).json({message:"Missing data"});

  const flight = await Flight.findById(flightId);
  if(!flight) return res.status(404).json({message:"Flight not found"});

  if(flight.seats < seatsBooked)
   return res.status(400).json({message:"No seats"});

  flight.seats -= seatsBooked;
  await flight.save();

 

  const booking = await Booking.create({
   userId,
   flightId,
   seatsBooked,
   totalPrice: flight.price,
   status:"Booked",
   pnr: generatePNR()
  });

  res.json(booking);

 }catch(err){
  console.log(err);
  res.status(500).json({error:err.message});
 }
});

// GET USER BOOKINGS
router.get("/:userId", async(req,res)=>{
 try{
  const bookings = await Booking.find({ userId:req.params.userId })
   .populate("flightId");

  // REMOVE BROKEN BOOKINGS
  const clean = bookings.filter(b=>b.flightId);

  res.json(clean);

 }catch(err){
  console.log(err);
  res.status(500).json({error:err.message});
 }
});


// CANCEL
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update status instead of deleting
    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Ticket cancelled", booking });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
