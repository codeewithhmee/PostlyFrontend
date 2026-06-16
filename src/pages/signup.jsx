import React, { useState } from 'react';
import "../css/signup.css";
import {useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate=useNavigate()
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // FIX: Initialized as boolean
  const [otpLoading, setOtpLoading] = useState(false); // Added for OTP feedback
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp:""
  });
  const [profilePic, setProfilePic] = useState(null); 

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleOTP() {
    if (!form.email) {
      return setErr("Please enter your email before requesting an OTP.");
    }

    setErr("");
    setSuccess("");
    setOtpLoading(true);

    try {
      let res = await fetch('https://postlybackend-ovcm.onrender.com/api/auth/otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email: form.email })
      });
      
      let data = await res.json();

      if (!res.ok) {
        setErr(data.message || "Failed to send OTP.");
      } else {
        setSuccess(data.message || "OTP sent successfully!");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      setErr("Network error. Could not request OTP.");
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('otp',form.otp)
      if (profilePic) {
        formData.append('profilePic', profilePic); 
      }

      const res = await fetch("https://postlybackend-ovcm.onrender.com/api/auth/register", {
        method: "POST", 
        credentials: "include",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "Signup failed");
      } else {
        setSuccess("Account created successfully!");
      }
    } catch (error) {
      setErr("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='signup_page'>
      <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>

        
        {/* Dynamic Alert Messages */}
        {err && <p style={{ color: "red", fontWeight: "bold" }}>{err}</p>}
        {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}

        <input
          required
          name="name"
          placeholder='Enter your name'
          type="text"
          value={form.name}
          onChange={handleChange}
          minLength={3}
          disabled={loading}
        />
        
        <div style={{ display: "flex", gap: "10px" }} className='email_otp'>
          <input
            required
            name="email"
            placeholder='Enter your email'
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            required
            name="otp"
            placeholder='Enter  otp'
            type="text"
            value={form.otp}
            onChange={handleChange}
            disabled={loading}
          />
          <button 
            type="button" 
            onClick={handleOTP} 
            disabled={otpLoading || loading}
            style={{backgroundColor:"#f2f2f2"}}
          >
            {otpLoading ? "Sending..." : "Request OTP"}
          </button>
        </div>

        <input
          required
          name="password"
          placeholder='Enter your password'
          type="password"
          value={form.password}
          onChange={handleChange}
          minLength={4}
          disabled={loading}
        />
       <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
         <h5>Profile picture</h5>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
          disabled={loading}
        />
       </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
        <span>Have Account?<span style={{cursor:"pointer",color:"blue"}} onClick={()=>{navigate('/login')}}> Login</span></span>
      </form>
    </div>
  );
}

export default Signup;