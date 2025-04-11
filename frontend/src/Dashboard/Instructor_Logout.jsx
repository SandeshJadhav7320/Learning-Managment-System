import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./LogoutPage.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Instructor_Logout = () => {
  const [instructor, setInstructor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    
    if (!email || email === "null" || email === "") {
      console.error("❌ Email not found in localStorage.");
      localStorage.clear();
      navigate("/");
      return;
    }

    axios.get(`http://localhost:8080/student/profile?email=${email}`)
      .then(response => {
        console.log("✅ Instructor fetched:", response.data);
        setInstructor(response.data);
      })
      .catch(error => console.error("Error fetching instructor profile:", error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!instructor) return <p style={{ textAlign: "center", color: "white" }}>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle size={90} className="user-icon" />
        <p><strong>Name:</strong> {instructor.studentname}</p>
        <p><strong>Email:</strong> {instructor.email}</p>
        <p><strong>Role:</strong> {instructor.role}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Instructor_Logout;
