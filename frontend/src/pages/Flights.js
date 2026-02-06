import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mern-flight-booking-6qke.onrender.com/api/flight";

export default function Flights() {
  const [flights,setFlights]=useState([]);

  useEffect(()=>{
    axios.get(`${API}/api/flight`)
    .then(res=>setFlights(res.data));
  },[]);

  const bookFlight = async (flightId) => {
    const userId = localStorage.getItem("userId");

    if(!userId){
      alert("Please login first");
      return;
    }

    await axios.post(`${API}/api/booking/book`,{
      userId,
      flightId,
      seatsBooked:1
    });

    alert("Flight booked");
  };

  return (
    <div>
      <h2>Flights</h2>
      {flights.map(f=>(
        <div key={f._id}>
          {f.from} → {f.to} | ₹{f.price}
          <button onClick={()=>bookFlight(f._id)}>Book</button>
        </div>
      ))}
    </div>
  );
}
