import React from "react";
import "../css/landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing_page">
      <header className="navbar">
        <div className="nav_left">
          <h2 className="logo">BlogSphere</h2>
        </div>

        <div className="nav_right">
          <button className="btn ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn primary" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>

      <main className="hero">
        <div className="hero_content">
          <h1 >
            Share your ideas with the world 
          </h1>

          <p>
            A modern blogging platform where creators write, explore, and grow
            their audience with ease.
          </p>

          <div className="hero_actions">
            <button
              className="btn primary large"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="btn ghost large"
              onClick={() => navigate("/login")}
            >
              I already have an account
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Landing;