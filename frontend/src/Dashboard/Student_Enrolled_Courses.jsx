import React, { useState, useEffect } from "react";

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentId = localStorage.getItem("studentid");

  useEffect(() => {
    fetch(`http://localhost:8080/enrollment/enrolled-courses/${studentId}`)
      .then((response) => response.json())
      .then((data) => setEnrolledCourses(data))
      .catch((error) => console.error("Error fetching enrolled courses:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Enrolled Courses</h2>
      <div className="row">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card shadow-sm">
                
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  <button className="btn btn-primary">Go to Course</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};



export default Courses;
