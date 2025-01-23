import React, { useState, useEffect } from 'react';
import './Availabel_Courses.css'; // Import CSS for styling

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollmentStatus, setEnrollmentStatus] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/instructor/getCourses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Enroll student in course
  const handleEnroll = async (courseId) => {
    const confirmEnrollment = window.confirm('Do you want to enroll in this course?');
    if (!confirmEnrollment) {
      setEnrollmentStatus('Enrollment canceled by the student.');
      return;
    }

    const studentId = 1; // Replace with dynamically fetched student ID

    try {
      const response = await fetch('http://localhost:8080/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId, // Ensure studentId is correct
          courseId: courseId,   // Ensure courseId is correct
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollmentStatus(`Successfully enrolled in course: ${data.courseName}`);
      } else {
        setEnrollmentStatus(data.message || 'Failed to enroll in the course.');
      }
    } catch (error) {
      console.error('Error during enrollment:', error);
      setEnrollmentStatus('An error occurred during enrollment. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

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
            <button 
              className="enroll-btn" 
              onClick={() => handleEnroll(course.id)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      {enrollmentStatus && <p className="enrollment-status">{enrollmentStatus}</p>}
    </div>
  );
};

export default Availabel_Courses;
