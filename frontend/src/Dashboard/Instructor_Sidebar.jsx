import React from 'react';
import { NavLink } from 'react-router-dom';
import './Instructor_Sidebar.css';
import { Home, BookOpen, List, LogOut } from 'lucide-react';

const Instructor_Sidebar = () => {
  return (
    <nav className="instructor-navbar">
      <div className="navbar-logo">
        🎓 Instructor Dashboard
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/instructor-dashboard/instructorhome" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <Home size={18} style={{ marginRight: '6px' }} />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor-dashboard/addcourses" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <BookOpen size={18} style={{ marginRight: '6px' }} />
            Add Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor-dashboard/instructorcourses" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <List size={18} style={{ marginRight: '6px' }} />
            Available Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/instructor-dashboard/logout" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <LogOut size={18} style={{ marginRight: '6px' }} />
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Instructor_Sidebar;
