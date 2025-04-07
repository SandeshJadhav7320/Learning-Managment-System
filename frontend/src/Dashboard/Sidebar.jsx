import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faList, faUser } from "@fortawesome/free-solid-svg-icons";
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
          ><FontAwesomeIcon icon={faHome} />  Home 
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/courses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faBook} />  Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/availabel_courses"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faList} />  Available Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student-dashboard/logout"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faUser} />  Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
