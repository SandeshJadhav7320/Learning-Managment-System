import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LogoutPage.css';

const LogoutPage = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    // Fetch logged-in student details from backend or local storage
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        

        if (!token) {
          console.error("No token found. Redirecting to login...");
          navigate("/");  // Redirect to login page if token is not found
          return;
        }
        console.log("Token retrieved:", token);

        console.log("Token:", token); // Log token to ensure it's present
        const response = await fetch('http://localhost:8080/student/profile?email=sandesh@gmail.com', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,  // Add token in the Authorization header
          }
      })
      ;
    
    if (response.ok) {
      const data = await response.json();
      setStudentData({
        name: data.studentname,
        email: data.email,
        role: data.role,
      });
    }  else {
      console.error("Failed to fetch student data:", response.status);
      console.log("Response:", await response.text());
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
};

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    // Clear authentication token or session
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-img">
          {/* Default user icon if no image is available */}
          <i className="fas fa-user"></i>
        </div>
        
        <div className="profile-detail">
          <span>{studentData.role}</span>
  
        </div>
        <div className="profile-detail">
          <span>{studentData.name}</span>
          <p className="profile-value"></p>
        </div>
        <div className="profile-detail">
          <span>{studentData.email}</span>
          <p className="profile-value"></p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
