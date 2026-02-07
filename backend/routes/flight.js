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
  const { from,to } = req.query;

  let query = {};

  if(from) query.from = from;
  if(to) query.to = to;

  const flights = await Flight.find(query);
  res.json(flights);
});


module.exports = router;
