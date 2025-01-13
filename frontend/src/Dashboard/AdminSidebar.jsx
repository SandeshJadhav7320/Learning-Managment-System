import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/instructor-dashboard/instructorhome"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Courses
          </NavLink>
        </li>
    
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

