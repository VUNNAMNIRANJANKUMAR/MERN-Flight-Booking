//import React, { useEffect, useState } from "react";
//import axios from "axios";


//const API = "https://mern-flight-booking-6qke.onrender.com";


//export default function Flights() {
//  const [flights,setFlights]=useState([]);

//  useEffect(()=>{
//    const userId = localStorage.getItem("userId");
//if(!userId){
//  alert("Please login first");
//  return;
//}


  //  axios.get(`${API}/api/flight`)
  //  .then(res=>setFlights(res.data));
  //},[]);

  //const bookFlight = async (flightId, price) => {

  //const confirm = window.confirm(`Pay ₹${price} ?`);

  //if(!confirm) return;

  //alert("Payment Successful (Demo)");

//  const userId = localStorage.getItem("userId");

//  await axios.post(`${API}/api/booking/book`,{
 //   userId,
//    flightId,
 //   seatsBooked:1,
//    totalPrice: price
//  });

//  alert("Flight booked");
//};


  //return (
  //  <div>
   //   <h2>Flights</h2>
  //    {flights.map(f=>(
    //    <div key={f._id}>
     //     {f.from} → {f.to} | ₹{f.price}
     //     <button onClick={()=>bookFlight(f._id,f.price)}>Book</button>
      //      {flights.map(f=>(
  //<div key={f._id} style={{border:"1px solid #ccc",padding:10,margin:10}}>
   // <h3>{f.from} → {f.to}</h3>
   // <p>Price: ₹{f.price}</p>
  //  <button onClick={()=>bookFlight(f._id,f.price)}>Book</button>
 // </div>
//))}

 //       </div>
 //     ))}
//    </div>
//  );
//}





import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function Flights(){

  const [flights,setFlights]=useState([]);
  const [from,setFrom]=useState("");
  const [to,setTo]=useState("");

  const loadFlights = ()=>{
    axios.get(`${API}/api/flight`)
    .then(res=>setFlights(res.data));
  };

  useEffect(()=>{
    loadFlights();
  },[]);

  const search = ()=>{
    axios.get(`${API}/api/flight?from=${from}&to=${to}`)
    .then(res=>setFlights(res.data));
  };

  return(
    <div>

      <h2>Flights</h2>

      <input placeholder="From" onChange={e=>setFrom(e.target.value)}/>
      <input placeholder="To" onChange={e=>setTo(e.target.value)}/>
      <button onClick={search}>Search</button>

      {flights.map(f=>(
        <div key={f._id} style={{border:"1px solid #ccc",padding:10,margin:10}}>
          <h3>{f.from} → {f.to}</h3>
          <p>₹{f.price}</p>
        </div>
      ))}

    </div>
  );
}
