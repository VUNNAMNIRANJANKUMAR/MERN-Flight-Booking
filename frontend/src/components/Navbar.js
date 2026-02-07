import { Link } from "react-router-dom";

export default function Navbar(){
  return(
    <div style={{padding:15,background:"#222",color:"white"}}>

      <Link to="/" style={{color:"white",marginRight:15}}>Flights</Link>
      <Link to="/mybookings" style={{color:"white",marginRight:15}}>My Bookings</Link>
      <Link to="/login" style={{color:"white"}}>Login</Link>

    </div>
  );
}
