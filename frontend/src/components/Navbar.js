import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){

 const navigate = useNavigate();

 const logout = ()=>{
   localStorage.clear();
   navigate("/login");
 };

 return(
  <div style={{padding:15,background:"#222",color:"white"}}>

    <Link to="/" style={{color:"white",marginRight:15}}>Flights</Link>
    <Link to="/mybookings" style={{color:"white",marginRight:15}}>My Bookings</Link>

    <button onClick={logout} style={{float:"right"}}>
      Logout
    </button>

  </div>
 );
}
