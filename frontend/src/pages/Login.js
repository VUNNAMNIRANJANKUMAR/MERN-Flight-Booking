import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = async () => {
    const res = await axios.post(
      "https://mern-flight-booking-6qke.onrender.com/api/auth/login",
      { email, password }
    );

    alert("Login success");

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
