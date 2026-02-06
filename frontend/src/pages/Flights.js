import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Flights() {
  const [flights,setFlights]=useState([]);

  useEffect(()=>{
    axios.get("https://mern-flight-booking-6qke.onrender.com/api/flight")
    .then(res=>setFlights(res.data));
  },[]);

  return (
    <div>
      <h2>Flights</h2>
      {flights.map(f=>(
        <div key={f._id}>
          {f.from} → {f.to} | ₹{f.price}
        </div>
      ))}
    </div>
  );
}
