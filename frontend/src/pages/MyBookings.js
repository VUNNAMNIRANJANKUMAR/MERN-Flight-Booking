import axios from "axios";
import { useEffect,useState } from "react";

const API="https://mern-flight-booking-6qke.onrender.com";

export default function MyBookings(){

 const [data,setData]=useState([]);

 useEffect(() => {
 const user = JSON.parse(localStorage.getItem("user"));

 if(!user) return;

 axios
  .get(`${API}/api/booking/user/${user.id}`)
  .then(res => setData(res.data))
  .catch(err=>console.log(err));

}, []);

const today = new Date().toISOString().split("T")[0];
const status =
 booking.flightId.journeyDate < today
 ? "Journey Over"
 : "Yet To Fly";
const cancelBooking = (id)=>{
 axios.delete(`${API}/api/booking/${id}`)
 .then(()=>{
   alert("Cancelled");
   loadBookings();
 });
};

 return(
  <div style={{padding:20}}>
    <h2>My Bookings</h2>
    <p>Status: <b>{status}</b></p>

    {data.map(b=>(
      <div key={b._id} style={{border:"1px solid #ddd",padding:10,margin:10}}>
        {b.flightId.from} → {b.flightId.to}
    <button onClick={() => cancelBooking(b._id)}>
 Cancel Booking
</button>
      </div>
    ))}
  </div>
 );
}
