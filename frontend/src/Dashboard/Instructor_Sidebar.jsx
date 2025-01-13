import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Instructor_Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Instructor Dashboard</h2>
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
            to="/instructor-dashboard/addcourses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Add Courses
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
            to="/instructor-dashboard/logout"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Instructor_Sidebar;