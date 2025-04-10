import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructor_Home.css";

function Instructor_Home() {
  const [instructorName, setInstructorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setInstructorName(name || "Instructor");
  }, []);

  const handleAddCourse = () => {
    navigate("/add-course");
  };

  const handleViewCourses = () => {
    navigate("/instructor-courses");
  };

  return (
    <div className="instructor-home-container">
      <h1>Welcome, {instructorName} 👋</h1>
      <p className="subtext">
        Ready to inspire learners today? Start by creating a new course or
        managing your existing ones.
      </p>
      <div className="actions">
        <button className="btn" onClick={handleAddCourse}>
          ➕ Add New Course
        </button>
        <button className="btn outline" onClick={handleViewCourses}>
          📚 View My Courses
        </button>
      </div>
    </div>
  );
}

export default Instructor_Home;
