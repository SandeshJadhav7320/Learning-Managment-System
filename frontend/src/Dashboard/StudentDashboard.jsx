import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Student_Home from './Student_Home'

const StudentDashboard = () => {
  const location = useLocation();
  

  // Define routes where user info and welcome message should not be shown
  const hideElementsOnRoutes = ["/student-dashboard/home", "/student-dashboard/courses","/student-dashboard/logout","/student-dashboard/availabel_courses","/student-dashboard/logout"];
  const shouldShowElements = !hideElementsOnRoutes.includes(location.pathname);

  useEffect(() => {
    // Fetch user details from localStorage or backend
    const name = localStorage.getItem("studentName");
    const pic = localStorage.getItem("profilePic"); // Replace with backend fetching if needed
   
    
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {/* Conditionally render user info and welcome message */}
        {shouldShowElements && (
          <div>
            <div className="user-info">
            <Student_Home />
            </div>
            
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;