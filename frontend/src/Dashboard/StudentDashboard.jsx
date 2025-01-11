import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


const StudentDashboard = () => {

  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
      <Outlet />
      
        {/* Other dashboard content goes here */}
      </div>
    </div>
  );
};

export default StudentDashboard;
