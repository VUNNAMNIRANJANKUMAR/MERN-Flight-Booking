import React, { useState } from "react";
import axios from "axios";

const API = "https://mern-flight-booking-6qke.onrender.com";

export default function SearchPNR() {
  const [pnr, setPnr] = useState("");
  const [booking, setBooking] = useState(null);

  const searchPNR = async () => {
    try {
      const res = await axios.get(`${API}/api/booking/pnr/${pnr}`);
      setBooking(res.data);
    } catch (err) {
      alert("PNR not found");
      setBooking(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Search by PNR</h2>

      <input
        placeholder="Enter PNR"
        value={pnr}
        onChange={(e) => setPnr(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />

      <button onClick={searchPNR}>Search</button>

      {booking && (
        <div style={{ border: "1px solid", marginTop: 20, padding: 10 }}>
          <h3>{booking.flightId.from} → {booking.flightId.to}</h3>
          <p>Date: {booking.flightId.journeyDate}</p>
          <p>PNR: {booking.pnr}</p>
          <p>Status: {booking.status}</p>
        </div>
      )}
    </div>
  );
}
