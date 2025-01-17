import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Instructor_Sidebar from './Instructor_Sidebar';
import { Outlet } from 'react-router-dom';

function InstructorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem('token');

    // If the token is not found, redirect to the login page
    if (!token) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Instructor_Sidebar />
      <div className="content">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}

export default InstructorDashboard;
