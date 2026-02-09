import React,{useEffect,useState} from "react";
import axios from "axios";

const API="https://mern-flight-booking-6qke.onrender.com";

export default function MyBookings(){

 const [bookings,setBookings]=useState([]);

 useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"));

  if(!user){
   alert("Please login");
   return;
  }

  axios.get(`${API}/api/booking/user/${user.id}`)
  .then(res=>setBookings(res.data))
  .catch(err=>console.log(err));

 },[]);

 return(
  <div style={{padding:20}}>
   <h2>My Bookings</h2>

   {bookings.length===0 && <p>No bookings yet</p>}

   {bookings.map(b=>(
    <div key={b._id} style={{border:"1px solid #ccc",padding:10,margin:10}}>
     <h3>{b.flightId.from} → {b.flightId.to}</h3>
     <p>Date: {b.flightId.journeyDate}</p>
     <p>Departure: {b.flightId.departureTime}</p>
     <p>Status: {new Date(b.flightId.journeyDate) < new Date() ? "Journey Over" : "Yet To Fly"}</p>
    </div>
   ))}

  </div>
 );
}
