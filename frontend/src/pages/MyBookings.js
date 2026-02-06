import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function MyBookings(){

  const [bookings,setBookings]=useState([]);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");

    axios.get(`${API}/api/booking/user/${userId}`)
    .then(res=>setBookings(res.data));
  },[]);

  return(
    <div>
      <h2>My Bookings</h2>

      {bookings.map(b=>(
        <div key={b._id}>
          {b.flightId.from} → {b.flightId.to} | ₹{b.totalPrice}
        </div>
      ))}
    </div>
  );
}
