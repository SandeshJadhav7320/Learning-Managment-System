import React, { useState, useEffect } from "react";
import "./Availabel_Courses.css"; // Import CSS for styling

const Availabel_Courses = () => {
  const [courses, setCourses] = useState([]);
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
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    const confirmEnrollment = window.confirm("Do you want to enroll in this course?");
    if (!confirmEnrollment) {
      setPopupMessage("Enrollment canceled by the student.");
      setShowPopup(true);
      return;
    }
  
    const studentId = 2; // Replace with dynamically fetched student ID
  
    try {
      const response = await fetch("http://localhost:8080/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          courseId: courseId,
        }),
      });
  
      const data = await response.json();
  
      // Check if the response is successful or has a specific message
      if (response.ok) {
        setPopupMessage(`Successfully enrolled in course: ${data.courseName}`);
      } else {
        setPopupMessage(data.message || "Failed to enroll in the course.");
      }
    } catch (error) {
      console.error("Error during enrollment:", error);
      setPopupMessage("An error occurred during enrollment. Please try again.");
    }
  
    setShowPopup(true); // Show the pop-up with the message
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
            <button className="enroll-btn" onClick={() => handleEnroll(course.id)}>
              Enroll Now
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
