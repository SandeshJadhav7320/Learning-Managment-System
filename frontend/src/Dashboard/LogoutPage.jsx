import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LogoutPage.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const LogoutPage = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");

    if (!email || email === "null" || email === "") {
      console.warn("No valid email found. Redirecting to login...");
      localStorage.clear();
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:8080/student/profile?email=${email}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!student) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle size={90} className="user-icon" />
        <h2>{student.studentname}</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Role:</strong> Student</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutPage;
