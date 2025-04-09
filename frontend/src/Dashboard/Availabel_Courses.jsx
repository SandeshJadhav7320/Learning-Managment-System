import React, { useState, useEffect } from "react";
import "./Availabel_Courses.css";

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/instructor/getCourses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    Promise.all([fetchCourses()]).finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId) => {
    const studentId = localStorage.getItem("studentid");
    if (!studentId) {
      alert("Student ID is missing. Please log in again.");
      return;
    }

    const confirmEnrollment = window.confirm("Do you want to enroll in this course?");
    if (!confirmEnrollment) return;

    try {
      const response = await fetch("http://localhost:8080/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: Number(studentId), courseId }),
      });

      const data = await response.json();
      setPopupMessage(data.message);
      setEnrolledCourses((prev) => new Set([...prev, courseId]));
    } catch (error) {
      console.error("Error during enrollment:", error);
      setPopupMessage("An error occurred. Please try again.");
    }

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="courses-page">
      <h1 className="courses-title">Available Courses</h1>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="courses-container">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            {course.imageUrl && (
              <img src={course.imageUrl} alt={course.name} className="course-image" />
            )}
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p><strong>Fee:</strong> ${course.fee}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <button
              className="enroll-btn"
              onClick={() => handleEnroll(course.id)}
              disabled={enrolledCourses.has(course.id)}
            >
              {enrolledCourses.has(course.id) ? "Enrolled" : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button className="popup-close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availabel_Courses;
