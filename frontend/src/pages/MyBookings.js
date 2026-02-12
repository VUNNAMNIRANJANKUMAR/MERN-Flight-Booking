import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function MyBookings() {

  const [bookings,setBookings]=useState([]);

  const loadBookings = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user) return;

    axios.get(`${API}/api/booking/${user._id}`)
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  };

  useEffect(()=>{
    loadBookings();
  },[]);

  const cancelBooking = (id) => {
    axios.delete(`${API}/api/booking/${id}`)
      .then(()=>{
        alert("Cancelled");
        loadBookings();
      })
      .catch(()=>alert("Cancel failed"));
  };

  return(
    <div style={{padding:20}}>

      <h2>My Bookings</h2>

      {bookings.length===0 && <p>No bookings</p>}

      {bookings.map(b=>(
        <div key={b._id} style={{border:"1px solid",margin:10,padding:10}}>

          <h3>{b.flightId?.from} → {b.flightId?.to}</h3>
          <p>Date: {b.flightId?.journeyDate}</p>
          <p>Departure: {b.flightId?.departureTime}</p>
          <p>Status: {b.status}</p>

          <button onClick={()=>cancelBooking(b._id)}>
            Cancel
          </button>

        </div>
      ))}

    </div>
  );
}
