const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

// ADD flight
router.post("/add", async(req,res)=>{
 try{
  const flight = await Flight.create(req.body);
  res.json(flight);
 }catch(err){
  res.status(500).json({error:err.message});
 }
});

// GET flights
router.get("/", async(req,res)=>{
 const flights = await Flight.find();
 res.json(flights);
});

module.exports = router;


// Get All Flights
//router.get("/", async (req, res) => {
//  try {
 //   const flights = await Flight.find();
//    res.json(flights);
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});






