import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await axios.post(
      "https://mern-flight-booking-6qke.onrender.com/api/auth/login",
      { email, password }
    );
    alert("Login success");
    console.log(res.data);
    localStorage.setItem("userId", res.data.user.id);
    navigate("/");



  };

  return (
    <div>
      <h2>Login</h2>
    <p>
  New user? <a href="/#/register">Register</a>
</p>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
