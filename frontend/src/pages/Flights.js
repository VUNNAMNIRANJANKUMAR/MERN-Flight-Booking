import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function Flights() {

  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  // 🔍 SEARCH FUNCTION
  const search = async () => {
    try {
      const res = await axios.get(`${API}/api/flight`);
      
      // filter flights
      const filtered = res.data.filter(f =>
        (!from || f.from.toLowerCase().includes(from.toLowerCase())) &&
        (!to || f.to.toLowerCase().includes(to.toLowerCase())) &&
        (!date || f.journeyDate === date)
      );

      setFlights(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  // ✈️ LOAD ALL FLIGHTS INITIALLY
  useEffect(() => {
    search();
  }, []);

  // 🎟️ BOOK FLIGHT
  const handleBook = (flight) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    axios.post(`${API}/api/booking/book`, {
      userId: user.id,
      flightId: flight._id,
      seatsBooked: 1
    })
    .then(() => {
      alert("Booking successful!");
      navigate("/mybookings");
    })
    .catch(err => {
      console.log(err.response?.data);
      alert("Booking failed");
    });
  };

  return (
    <div style={{ padding: 20 }}>

      {/* 🔍 SEARCH BOX */}
      <div style={styles.searchBox}>
        <h2 style={{ marginBottom: "15px" }}>Search Flights</h2>

        <div style={styles.inputs}>

          <input
            placeholder="From"
            value={from}
            onChange={e => setFrom(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="To"
            value={to}
            onChange={e => setTo(e.target.value)}
            style={styles.input}
          />

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={search}
            style={styles.button}
            onMouseOver={e => e.target.style.backgroundColor = "#084298"}
            onMouseOut={e => e.target.style.backgroundColor = "#0d6efd"}
          >
            Search
          </button>

        </div>
      </div>

      {/* ✈️ FLIGHTS LIST */}
      {flights.length === 0 && <p>No flights found</p>}

      {flights.map((f) => (
        <div key={f._id} style={styles.card}>

          <h3>{f.from} → {f.to}</h3>
          <p>Date: {f.journeyDate}</p>
          <p>Departure: {f.departureTime}</p>
          <p>Arrival: {f.arrivalTime}</p>
          <p>Airline: {f.airline}</p>
          <p>Class: {f.travelClass}</p>
          <p><strong>Price: ₹{f.price}</strong></p>

          <button 
            style={styles.bookBtn} 
            onClick={() => handleBook(f)}
          >
            Book Now
          </button>

        </div>
      ))}

    </div>
  );
}


// 🎨 STYLES
const styles = {
  searchBox: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },

  inputs: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1",
    minWidth: "150px"
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px 0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  bookBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
