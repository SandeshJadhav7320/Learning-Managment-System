import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Availabel_Courses.css'; // Import CSS for styling

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]); // State to hold the fetched courses
  const [message, setMessage] = useState(''); // State to hold any error messages

  // useEffect hook to fetch courses data from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Send GET request to fetch courses from the backend
        const response = await axios.get('http://localhost:8080/instructor/availableCourses');
        setCourses(response.data); // Store the fetched courses in the state
      } catch (error) {
        console.error('Error fetching courses:', error);
        setMessage('Failed to load courses.'); // Set error message if the fetch fails
      }
    };

    fetchCourses(); // Call the function to fetch courses
  }, []); // Empty dependency array ensures this effect runs only once when the component is mounted

  return (
    <div className="courses-page">
      <h1 className="courses-title">Available Courses</h1>
      {message && <p>{message}</p>} {/* Show error message if any */}
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
