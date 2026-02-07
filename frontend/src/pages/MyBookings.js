import axios from "axios";
import { useEffect, useState } from "react";


const API = "https://mern-flight-booking-6qke.onrender.com";


export default function MyBookings(){

  const [bookings,setBookings]=useState([]);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
if(!userId){
  alert("Please login first");
  return;
}


    axios.get(`${API}/api/booking/user/${userId}`)
    .then(res=>setBookings(res.data));
  },[]);

  return(
    <div>
      <h2>My Bookings</h2>

      {bookings.map(b=>(
  <div key={b._id} style={{border:"1px solid #ccc",margin:10,padding:10}}>
    {b.flightId.from} → {b.flightId.to} | ₹{b.totalPrice}
    <button onClick={async()=>{
      await axios.delete(`${API}/api/booking/${b._id}`);
      window.location.reload();
    }}>Cancel</button>
  </div>
))}

      ))}
    </div>
  );
}
