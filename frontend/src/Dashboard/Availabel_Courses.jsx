import React, { useState, useEffect } from "react";
import "./Availabel_Courses.css"; // Import CSS for styling

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set()); // Store enrolled courses
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(""); // Message for the pop-up
  const [showPopup, setShowPopup] = useState(false); // Control the visibility of the pop-up

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

    const fetchEnrolledCourses = async () => {
      const studentId = localStorage.getItem("studentid");
      if (!studentId) return;

      try {
        const response = await fetch(`http://localhost:8080/enrollment/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setEnrolledCourses(new Set(data.map((course) => course.id))); // Store enrolled course IDs
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    Promise.all([fetchCourses(), fetchEnrolledCourses()]).finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId) => {
    const studentId = localStorage.getItem("studentid"); // Get student ID from localStorage
    
    if (!studentId) {
      alert("Student ID is missing. Please log in again.");
      return;
    }
  
    console.log("Enrolling student:", studentId, "in course:", courseId); // Debugging log
  
    const confirmEnrollment = window.confirm("Do you want to enroll in this course?");
    if (!confirmEnrollment) return;
  
    try {
      const response = await fetch("http://localhost:8080/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(studentId), // Ensure it's sent as a number
          courseId: courseId,
        }),
      });
  
      const data = await response.json();
      console.log("Enrollment response:", data); // Debugging log
  
      setPopupMessage(data.message);

      // Update the enrolled courses list after successful enrollment
      setEnrolledCourses((prev) => new Set([...prev, courseId]));
    } catch (error) {
      console.error("Error during enrollment:", error);
      setPopupMessage("An error occurred. Please try again.");
    }
  
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage(""); // Clear the message when the pop-up is closed
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
            <p>
              <strong>Fee:</strong> ${course.fee}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <button
              className="enroll-btn"
              onClick={() => handleEnroll(course.id)}
              disabled={enrolledCourses.has(course.id)} // Disable if already enrolled
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
            <button className="popup-close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availabel_Courses;
