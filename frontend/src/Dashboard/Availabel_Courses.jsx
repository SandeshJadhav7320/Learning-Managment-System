import React, { useState, useEffect } from "react";
import EnrollmentForm from "./EnrollmentForm";  // Import the new EnrollmentForm component
import "./Availabel_Courses.css";

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for the enrollment form visibility
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

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

  const handleEnroll = (courseId) => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Student ID is missing. Please log in again.");
      return;
    }

    setSelectedCourseId(courseId);
    setShowEnrollmentForm(true); // Show the form to fill out enrollment details
  };

  const handleFormSubmit = async (courseId, studentId, enrollmentDetails) => {
    try {
      const response = await fetch("http://localhost:8080/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          courseId,
          studentName: enrollmentDetails.studentName,
          qualification: enrollmentDetails.qualification,
          address: enrollmentDetails.address,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPopupMessage("Enrollment successful!");
        setEnrolledCourses((prev) => new Set([...prev, courseId]));
      } else {
        setPopupMessage("An error occurred. Please try again.");
      }
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

      {showEnrollmentForm && (
        <div className="enrollment-modal-overlay">
          <EnrollmentForm
            courseId={selectedCourseId}
            studentId={localStorage.getItem("studentId")}
            onSubmit={handleFormSubmit}
            closeForm={() => setShowEnrollmentForm(false)}
          />
        </div>
      )}

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
