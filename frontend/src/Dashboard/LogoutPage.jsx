import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css"; // Import your styling for the profile page

const LogoutPage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const studentName = localStorage.getItem("studentName");
    const studentEmail = localStorage.getItem("studentEmail");
    const studentId = localStorage.getItem("studentid");

    if (studentName && studentEmail && studentId) {
      setStudent({ name: studentName, email: studentEmail, studentid: studentId });
      setLoading(false);
    } else {
      setError("No student data found. Please log in.");
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentid");
    localStorage.removeItem("studentEmail");
    navigate("/login"); // Redirect to login after logout
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Student Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Student ID:</strong> {student.studentid}</p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
