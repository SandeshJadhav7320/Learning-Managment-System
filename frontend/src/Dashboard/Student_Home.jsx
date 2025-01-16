import React from 'react';

const Homepage = ({ studentName }) => {
  return (
    <div className="homepage">
      <div className="welcome-message">
        <h1>Welcome, {studentName}!</h1>
        <p>Ready to start your learning journey?</p>
      </div>
      <div className="cta-buttons">
        <button onClick={() => alert('View Courses')}>View Courses</button>
        <button onClick={() => alert('Go to Profile')}>Go to Profile</button>
      </div>
    </div>
  );
};

export default Homepage;
