const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
 from:String,
 to:String,
 journeyDate:String,
 departureTime:String,
 arrivalTime:String,
 price:Number,
 seats:Number,
 airline:String,
 travelClass:String
},{timestamps:true});

module.exports = mongoose.model("Flight",flightSchema);


// Get All Flights
//router.get("/", async (req, res) => {
//  try {
 //   const flights = await Flight.find();
//    res.json(flights);
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});






