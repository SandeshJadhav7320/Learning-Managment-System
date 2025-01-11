import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; // Used for rendering nested routes

const StudentLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* The page content will be rendered here */}
      </div>
    </div>
  );
};

export default StudentLayout;
