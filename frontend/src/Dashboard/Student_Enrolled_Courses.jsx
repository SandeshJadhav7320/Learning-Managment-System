import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const studentId = localStorage.getItem("studentId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!studentId) {
        alert("Student ID is missing. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/enrollment/enrolled-courses/${studentId}`);
        if (!response.ok) throw new Error("Failed to fetch enrolled courses");
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  const handleGoToCourse = (course) => {
    navigate(`/course/${course.id}`, {
      state: { videoUrls: course.videoUrls }
    });
  };

  const filteredEnrolledCourses = enrolledCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-page">
      <h1 className="courses-title">My Enrolled Courses</h1>

      <input
        type="text"
        placeholder="Search enrolled courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="courses-container">
        {filteredEnrolledCourses.length > 0 ? (
          filteredEnrolledCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-info">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <button className="course-button" onClick={() => handleGoToCourse(course)}>
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
