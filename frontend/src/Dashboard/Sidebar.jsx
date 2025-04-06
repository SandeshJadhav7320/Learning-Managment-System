import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaGraduationCap className="logo-icon" />
        <span className="logo-text">Student Dashboard</span>
      </div>
      <ul className="navbar-links">
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
    </nav>
  );
};

export default Sidebar;
