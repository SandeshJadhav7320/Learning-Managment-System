import React from 'react';
import Sidebar from './Sidebar'; // Your Sidebar component

const Student_Layout = () => {
  return (
    <div className="student-layout">
      <Sidebar /> {/* Sidebar is always visible */}
      <div className="student-content">
        <Outlet /> {/* This renders the active student page */}
      </div>
    </div>
  );
};

export default Student_Layout;
