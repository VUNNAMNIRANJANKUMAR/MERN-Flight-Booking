import axios from "axios";
import { useEffect,useState } from "react";

const API="YOUR_BACKEND";

export default function MyBookings(){

 const [data,setData]=useState([]);

 useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("user"));
   axios.get(`${API}/api/booking/user/${user.id}`)
   .then(res=>setData(res.data));
 },[]);

 return(
  <div style={{padding:20}}>
    <h2>My Bookings</h2>

    {data.map(b=>(
      <div key={b._id} style={{border:"1px solid #ddd",padding:10,margin:10}}>
        {b.flightId.from} → {b.flightId.to}
      </div>
    ))}
  </div>
 );
}
