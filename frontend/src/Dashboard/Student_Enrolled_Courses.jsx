import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentId = localStorage.getItem("studentid");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!studentId) {
        alert("Student ID is missing. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/enrollment/enrolled-courses/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  const handleGoToCourse = (course) => {
    navigate(`/course/${course.id}`, { state: { videoUrl: course.videoUrl } });
  };

  return (
    <div className="courses-page">
      <h1 className="courses-title">My Enrolled Courses</h1>
      <div className="courses-container">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <img 
                src={course.imageUrl || "https://via.placeholder.com/300"} 
                alt={course.name} 
                className="course-image"
              />
              <div className="course-info">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <button 
                  className="course-button" 
                  onClick={() => handleGoToCourse(course)}
                >
                  Go to Course
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses">No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
