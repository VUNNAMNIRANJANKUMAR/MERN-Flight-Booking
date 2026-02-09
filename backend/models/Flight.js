const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  journeyDate: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  seats: Number,
  airline: String,
travelClass: String
}, { timestamps: true });

module.exports = mongoose.model("Flight", flightSchema);

router.post("/add", async (req,res)=>{
 try{

  const flight = await Flight.create(req.body);

  res.json(flight);

 }catch(err){
  res.status(500).json({error:err.message});
 }
});
