import React, { useState } from "react";
import axios from "axios";
import "./Instructor_Add_Course.css";

const Instructor_Add_Course = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [videoFiles, setVideoFiles] = useState([]); // ✅ Allow multiple videos
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Track upload progress

  const handleVideoChange = (e) => {
    setVideoFiles([...e.target.files]); // ✅ Store multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("description", courseDescription);
    formData.append("fee", courseFee);
    formData.append("duration", courseDuration);

    // ✅ Append multiple videos
    if (videoFiles.length > 0) {
      videoFiles.forEach((video) => {
        formData.append("videos", video); // "videos" should match backend request param
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/instructor/addCourse",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setMessage("✅ Course added successfully!");
      } else {
        setMessage("❌ Failed to add course. Please try again.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("❌ Error adding course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="instructor-page">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea
            className="form-control"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Course Fee</label>
          <input
            type="number"
            className="form-control"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Course Duration</label>
          <input
            type="text"
            className="form-control"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Videos (Multiple allowed)</label>
          <input
            type="file"
            className="form-control"
            accept="video/*"
            multiple // ✅ Allow multiple video uploads
            onChange={handleVideoChange}
          />
          {/* ✅ Show uploaded file names */}
          {videoFiles.length > 0 && (
            <p>📂 Selected Videos: {videoFiles.map((file) => file.name).join(", ")}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Add Course"}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default Instructor_Add_Course;
