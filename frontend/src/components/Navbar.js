import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>

      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h2 style={styles.logo}>✈️ FlightBooking</h2>

        <Link to="/" style={styles.link}>Flights</Link>

        {user && (
          <Link to="/mybookings" style={styles.link}>
            My Bookings
          </Link>
        )}

        <Link to="/search-pnr" style={styles.link}>
          Search PNR
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>

        {user && (
          <span style={styles.user}>Hi, {user.name}</span>
        )}

        {!user ? (
          <Link to="/login" style={styles.loginBtn}
         onMouseOver={e => e.target.style.color = "#ffc107"}
         onMouseOut={e => e.target.style.color = "white"}>
            Login
          </Link>
        ) : (
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        )}

      </div>

    </div>
  );
}


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    backgroundColor: "#0d6efd",
    color: "white"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  logo: {
    margin: 0
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  },

  user: {
    fontWeight: "bold"
  },

  loginBtn: {
    backgroundColor: "white",
    color: "#0d6efd",
    padding: "6px 12px",
    borderRadius: "5px",
    textDecoration: "none"
  },

  logoutBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }

 link: {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  transition: "0.3s"
}
};
