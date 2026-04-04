import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API="https://mern-flight-booking-6qke.onrender.com";

export default function MyBookings(){

 const [bookings,setBookings]=useState([]);

 useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user) return;

  axios.get(`${API}/api/booking/${user.id}`)
   .then(res=>setBookings(res.data))
   .catch(err=>console.log(err));

 },[]);
const cancelBooking = async (id) => {
  try {
    await axios.delete(`${API}/api/booking/${id}`);
    alert("Ticket cancelled");

    // update UI instantly
    setBookings(bookings.map(b =>
      b._id === id ? { ...b, status: "Cancelled" } : b
    ));

  } catch (err) {
    console.log(err);
    alert("Cancel failed");
  }
};
 return(
  <div style={{padding:20}}>
   <h2>My Bookings</h2>
   <Link 
  to="/search-pnr"
  style={{
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    margin-bottom: "20px"
  }}
>
  Search PNR
</Link>

   {bookings.length===0 && <p>No bookings</p>}

   {bookings.map(b=>(
    <div key={b._id} style={{border:"1px solid",margin:10,padding:10}}>

     <h3>{b.flightId.from} → {b.flightId.to}</h3>
     <p>{b.flightId.journeyDate}</p>
     <p>{b.flightId.departureTime}</p>
    <p><strong>PNR:</strong> {b.pnr}</p>
     <p style={{ color: b.status === "Cancelled" ? "red" : "green" }}>
  Status: {b.status}
</p>
    <p style={{ fontWeight:"bold", color:"#007bff", fontSize:"18px" }}>
  PNR: {b.pnr}
</p>
 <button 
  onClick={() => cancelBooking(b._id)}
  disabled={b.status === "Cancelled"}
>
  Cancel Ticket
</button>

    </div>
   ))}

  </div>
 );
}
