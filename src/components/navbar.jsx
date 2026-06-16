import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  async function handleLogout() {
    if (isLoggingOut) return; 
    setIsLoggingOut(true);

    try {
      const res = await fetch("https://postlybackend-ovcm.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Logout response:", data);

      if (!res.ok) {
        alert(data.message || "Failed to log out smoothly.");
      } else {
        localStorage.removeItem("avatar"); 
        navigate("/landing"); 
      }
    } catch (error) {
      console.error("Network Error during logout:", error);
      alert("Network error. Failed to connect to server.");
    } finally {
      setIsLoggingOut(false);
      setToggle(false); 
    }
  }

  return (
    <>
  
      <nav className={`nav_side ${toggle ? "open" : ""}`}>
        <div className="nav_left_side">
          <img 
            onClick={() => { navigate('/update'); }} 
            className='nav_profile' 
            src={localStorage.getItem("avatar") || ""} 
            alt="Profile" 
          />
        </div>
        <div className="nav_middle_side">
          <NavLink to="/home">Discover</NavLink>
          <NavLink to="/dashboard">My Space</NavLink>
          <NavLink to="/write">Create</NavLink>
          <NavLink to="/filter">Explore</NavLink>
          <NavLink to="/search_user">Users</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="nav_right_side">
        
          <span 
            onClick={!isLoggingOut ? handleLogout : null} 
            className="logout_link"
            style={{ cursor: "pointer" }}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </div>
      </nav>

      <nav className='navbar_landing'>
        <div className="nav_left">
          <img 
            onClick={() => { navigate('/update'); }} 
            className='nav_profile' 
            src={localStorage.getItem("avatar") || ""} 
            alt="Profile" 
          />
        </div>
        <div className="nav_middle">
          <NavLink to="/home">Discover</NavLink>
          <NavLink to="/dashboard">My Space</NavLink>
          <NavLink to="/write">Create</NavLink>
          <NavLink to="/filter">Explore</NavLink>
          <NavLink to="/search_user">Users</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="nav_right">
          <span 
            onClick={!isLoggingOut ? handleLogout : null} 
            className="logout_link"
            style={{ cursor: "pointer" }}
          >
            {isLoggingOut ? "..." : "Logout"}
          </span>
        </div>
        <span onClick={() => setToggle(prev => !prev)} className='hamburger'>☰</span>
      </nav>
    </>
  );
};

export default Navbar;