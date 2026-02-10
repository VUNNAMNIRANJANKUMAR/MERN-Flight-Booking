import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function Flights() {

 const [flights,setFlights]=useState([]);
 const [from,setFrom]=useState("");
 const [to,setTo]=useState("");
 const [date,setDate]=useState("");
 const navigate=useNavigate();

 useEffect(()=>{
  loadFlights();
 },[]);

 const loadFlights=()=>{
  axios.get(`${API}/api/flight`)
   .then(res=>setFlights(res.data))
   .catch(err=>console.log(err));
 };

 const search=()=>{
  axios.get(`${API}/api/flight?from=${from}&to=${to}&date=${date}`)
   .then(res=>setFlights(res.data))
   .catch(err=>console.log(err));
 };

 const handleBook=(flight)=>{
  const user=JSON.parse(localStorage.getItem("user"));

  if(!user){
   alert("Login first");
   navigate("/login");
   return;
  }

  axios.post(`${API}/api/booking/book`,{
   userId:user._id,
   flightId:flight._id,
   seatsBooked:1
  }).then(()=>{
   alert("Booked Successfully");
   navigate("/mybookings");
  }).catch(()=>alert("Booking failed"));
 };

 return(
  <div style={{padding:20}}>

   <h2>Flights</h2>

   <input placeholder="From" onChange={e=>setFrom(e.target.value)}/>
   <input placeholder="To" onChange={e=>setTo(e.target.value)}/>
   <input type="date" onChange={e=>setDate(e.target.value)}/>
   <button onClick={search}>Search</button>

   {flights.map(f=>(
    <div key={f._id} style={{border:"1px solid",margin:10,padding:10}}>

     <h3>{f.from} → {f.to}</h3>
     <p>Date: {f.journeyDate}</p>
     <p>Departure: {f.departureTime}</p>
     <p>Arrival: {f.arrivalTime}</p>
     <p>Airline: {f.airline}</p>
     <p>Class: {f.travelClass}</p>
     <p>Price: ₹{f.price}</p>

     <button onClick={()=>handleBook(f)}>Book</button>

    </div>
   ))}

  </div>
 );
}
