
import React from 'react';
import Instructor_Sidebar from './Instructor_Sidebar';
import { Outlet } from 'react-router-dom';
function InstructorDashboard() {
  

  return (
    <div className="dashboard-container">
      <Instructor_Sidebar />
      <div className="content">
      <Outlet />
      </div>
    </div>
  );
  }
  
  export default InstructorDashboard