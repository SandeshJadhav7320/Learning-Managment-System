import React, { useState, useEffect } from 'react';
import './Availabel_Courses.css'; // Import CSS for styling

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/instructor/getCourses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setMessage('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="courses-page">
      <h1 className="courses-title">Available Courses</h1>
      {message && <p>{message}</p>}
      <div className="courses-container">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <h2>{course.name}</h2>
              <p>{course.description}</p>
              <p><strong>Fee:</strong> ${course.fee}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Availabel_Courses;
