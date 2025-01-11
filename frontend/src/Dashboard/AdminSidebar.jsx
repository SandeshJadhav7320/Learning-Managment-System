import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
