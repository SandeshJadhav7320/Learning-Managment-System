import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Instructor_Sidebar from './Instructor_Sidebar';
import { Outlet } from 'react-router-dom';

function InstructorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Corrected key name to match what's saved in Login.jsx
    const token = localStorage.getItem('authToken');

    if (!token) {
    
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
