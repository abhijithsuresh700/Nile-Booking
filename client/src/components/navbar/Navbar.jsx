import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const userName = user?.details.name;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleBooking=()=>{
    navigate("/bookings")
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="link">
          <span className="logo">NILE Booking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="navUsername" onClick={handleOpen}>
              {userName}
            </span>
            {open && (
              <div className="dropDownContainer">
                <div className="dropdownListItems">
                  <div className="dropdownListItem" onClick={handleBooking}>Bookings</div>
                  <div className="dropdownListItem" onClick={handleLogout}>LogOut</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" className="link">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login" className="link">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
