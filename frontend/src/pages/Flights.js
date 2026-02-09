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
import { useNavigate } from "react-router-dom";


const API = "https://mern-flight-booking-6qke.onrender.com";


export default function Flights() {

  const [flights, setFlights] = useState([]);
  const [date,setDate]=useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();


  const loadFlights = () => {
    axios.get(`${API}/api/flight`)
      .then(res => setFlights(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const search = () => {
    axios.get(`${API}/api/flight`)
      .then(res => {
        const filtered = res.data.filter(f =>
          f.from.toLowerCase().includes(from.toLowerCase()) &&
          f.to.toLowerCase().includes(to.toLowerCase())
        );
        setFlights(filtered);
      })
      .catch(err => console.log(err));
  };
  const handleBook = (flight) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login to book flights");
    navigate("/login");
    return;
  }

  axios.post(`${API}/api/booking/book`, {
    userId: user.id,
    flightId: flight._id,
    seatsBooked: 1,
    totalPrice: flight.price
  }).then(() => {
  loadFlights();
  navigate("/success");
  }).catch(() => alert("Booking failed"));
};



  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>

      <h1 style={{ textAlign: "center" }}>✈️ Flight Booking</h1>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          placeholder="From"
          onChange={e => setFrom(e.target.value)}
          style={{ padding: 8, marginRight: 5 }}
        />

        <input
          placeholder="To"
          onChange={e => setTo(e.target.value)}
          style={{ padding: 8, marginRight: 5 }}
        />
          <input
 type="date"
 onChange={e=>setDate(e.target.value)}
 style={{padding:8,marginRight:5}}
/>


        <button onClick={search} style={{ padding: 8 }}>
          Search
        </button>
      </div>

      {flights.map(f => (
        <div
          key={f._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 15,
            margin: "10px auto",
            maxWidth: 400,
            boxShadow: "0 2px 5px rgba(0,0,0,.1)"
          }}
        >
          <h3>{f.from} → {f.to}</h3>
          <p>Date: {f.journeyDate}</p>
          <p>Departure: {f.departureTime}</p>
          <p>Arrival: {f.arrivalTime}</p>
          <p>Price: ₹{f.price}</p>

          <button
  style={{ padding: 8, width: "100%" }}
  onClick={() => handleBook(f)}
>
  Book
</button>

        </div>
      ))}

    </div>
  );
}
