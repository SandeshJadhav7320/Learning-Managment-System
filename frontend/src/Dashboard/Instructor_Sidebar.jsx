import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Instructor_Sidebar = () => {
  return (
    <div className="sidebar">
        <h2>Instructor Dashboard</h2>
      <ul>
        <li><Link to="/instructor-dashboard/instructorhome">Home</Link></li>
        <li><Link to="/instructor-dashboard/addcourses">Add Courses</Link></li>
        <li><Link to="/instructor-dashboard/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Instructor_Sidebar;
