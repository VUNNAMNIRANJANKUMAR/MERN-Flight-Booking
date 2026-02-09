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
