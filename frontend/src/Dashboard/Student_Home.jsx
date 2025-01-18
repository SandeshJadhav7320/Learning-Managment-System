import React from 'react';
import './Student_Home.css'; // Ensure you link the responsive and animated CSS file

const Homepage = ({ studentName }) => {
  const handleViewCourses = () => {
    alert('Redirecting to Courses...');
    // Navigate to the courses page (use a router or navigate logic here)
  };

  const handleGoToProfile = () => {
    alert('Redirecting to Profile...');
    // Navigate to the profile page (use a router or navigate logic here)
  };

  return (
    <div className="homepage">
      <div className="welcome-message">
        <h1>Welcome, {studentName}!</h1>
        <p>Ready to start your learning journey?</p>
      </div>
      <div className="cta-buttons">
        <button onClick={handleViewCourses} className="animated-button">View Courses</button>
        <button onClick={handleGoToProfile} className="animated-button">Go to Profile</button>
      </div>
    </div>
  );
};

export default Homepage;
