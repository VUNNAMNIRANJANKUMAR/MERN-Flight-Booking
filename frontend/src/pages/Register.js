import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit = async () => {
    await axios.post("YOUR_BACKEND_URL/api/auth/register",{name,email,password});
    alert("Registered");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="name" onChange={e=>setName(e.target.value)} />
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
