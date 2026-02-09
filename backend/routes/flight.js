const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

// Add Flight (Admin)
router.post("/add", async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Flights
//router.get("/", async (req, res) => {
//  try {
 //   const flights = await Flight.find();
//    res.json(flights);
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});

router.get("/", async(req,res)=>{
 const query={};

 if(req.query.from) query.from=req.query.from;
 if(req.query.to) query.to=req.query.to;
 if(req.query.date) query.journeyDate=req.query.date;

 const flights=await Flight.find(query);
 res.json(flights);
});



module.exports = router;
