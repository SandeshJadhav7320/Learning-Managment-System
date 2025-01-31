import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Student Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/student-dashboard/home"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/courses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/availabel_courses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Available Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/logout"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
