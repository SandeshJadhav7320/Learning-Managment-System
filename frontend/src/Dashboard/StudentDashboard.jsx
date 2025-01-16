import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


const StudentDashboard = () => {
  const location = useLocation();
  const [studentName, setStudentName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Define routes where user info and welcome message should not be shown
  const hideElementsOnRoutes = ["/student-dashboard/home", "/student-dashboard/courses","/student-dashboard/logout","/student-dashboard/availabel_courses","/student-dashboard/logout"];
  const shouldShowElements = !hideElementsOnRoutes.includes(location.pathname);

  useEffect(() => {
    // Fetch user details from localStorage or backend
    const name = localStorage.getItem("studentName");
    const pic = localStorage.getItem("profilePic"); // Replace with backend fetching if needed
    setStudentName(name || "Student"); // Default name if none is stored
    setProfilePic(
      pic || "https://via.placeholder.com/150" // Default profile picture if none is available
    );
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        {/* Conditionally render user info and welcome message */}
        {shouldShowElements && (
          <div>
            <div className="user-info">
              <img src={profilePic} alt="Profile" className="profile-pic" />
              <p className="user-name">{studentName}</p>
            </div>
            <h1>Welcome, {studentName}!</h1>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
