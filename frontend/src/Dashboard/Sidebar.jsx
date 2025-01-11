import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li><Link to="/student-dashboard/home">Home</Link></li>
        <li><Link to="/student-dashboard/courses">Courses</Link></li>
        <li><Link to="/student-dashboard/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
