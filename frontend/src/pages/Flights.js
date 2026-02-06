import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function Flights() {
  const [flights,setFlights]=useState([]);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
if(!userId){
  window.location.href="/#/login";
}

    axios.get(`${API}/api/flight`)
    .then(res=>setFlights(res.data));
  },[]);

  const bookFlight = async (flightId, price) => {

  const confirm = window.confirm(`Pay ₹${price} ?`);

  if(!confirm) return;

  alert("Payment Successful (Demo)");

  const userId = localStorage.getItem("userId");

  await axios.post(`${API}/api/booking/book`,{
    userId,
    flightId,
    seatsBooked:1,
    totalPrice: price
  });

  alert("Flight booked");
};


  return (
    <div>
      <h2>Flights</h2>
      {flights.map(f=>(
        <div key={f._id}>
          {f.from} → {f.to} | ₹{f.price}
          <button onClick={()=>bookFlight(f._id,f.price)}>Book</button>
        </div>
      ))}
    </div>
  );
}
