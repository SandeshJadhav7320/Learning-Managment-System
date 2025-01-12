import React from 'react';
import './Availabel_Courses.css'; // Import CSS for styling

const Availabel_Courses = () => {
  const courses = [
    {
      id: 1,
      name: "React for Beginners",
      description: "Learn the basics of React with hands-on examples.",
      fee: 100,
      duration: "3 months"
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      description: "Deep dive into JavaScript concepts and ES6 features.",
      fee: 120,
      duration: "2 months"
    },
    {
      id: 3,
      name: "Node.js for Backend",
      description: "Learn how to build scalable applications using Node.js.",
      fee: 150,
      duration: "4 months"
    }
    // Add more courses as needed
  ];

  return (
    <div className="courses-page">
      <h1 className="courses-title">Available Courses</h1>
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p><strong>Fee:</strong> ${course.fee}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <button className="enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availabel_Courses;
