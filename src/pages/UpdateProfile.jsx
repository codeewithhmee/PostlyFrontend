import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("image", profilePic);

    try {
      setLoading(true);
      const response = await fetch("https://postlybackend-ovcm.onrender.com/api/blogs/update_user", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("avatar", data.user.profile);


      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{textAlign:"center",marginBottom:"10px"}}>Update Profile</h2>

      {error   && <p style={{ color: "red",   marginBottom: "10px",textAlign:"center" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "10px",textAlign:"center" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            background: loading ? "#888" : "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;