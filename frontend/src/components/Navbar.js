import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){

 const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem("user"));

 const logout = ()=>{
   localStorage.clear();
   navigate("/login");
 };

 return(
  <div style={{padding:15,background:"#222",color:"white"}}>

    <Link to="/" style={{color:"white",marginRight:15}}>Flights</Link>

    {user && (
      <Link to="/mybookings" style={{color:"white",marginRight:15}}>
        My Bookings
      </Link>
    )}

    {!user && (
      <Link to="/login" style={{color:"white",marginRight:15}}>
        Login
      </Link>
    )}

    {user && (
      <button onClick={logout} style={{float:"right"}}>
        Logout
      </button>
    )}

  </div>
 );
}
