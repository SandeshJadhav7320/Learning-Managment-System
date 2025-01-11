
import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
function AdminDashboard() {
  

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="content">
      <Outlet />
      
        {/* Other dashboard content goes here */}
      </div>
    </div>
  );
  }
  
  export default AdminDashboard