import React, { useState, useEffect } from "react";
import './InstructorCourses.css'; // Correct import for the CSS file

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/instructor/getCourses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteClick = (courseId) => {
    // Ask for confirmation before deleting the course
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (isConfirmed) {
      handleDelete(courseId);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/instructor/deleteCourse/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Get the token from local storage
          },
        }
      );

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== courseId));
        alert("Course deleted successfully.");
      } else {
        alert("Failed to delete course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="content">
      <h1>Available Courses</h1>

      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p><strong>Fee:</strong> ${course.fee}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <button onClick={() => handleDeleteClick(course.id)}>
              Delete Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
