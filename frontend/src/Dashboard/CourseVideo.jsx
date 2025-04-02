import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseVideo.css"; // Import CSS for styling

const CourseVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = location.state?.videoUrl || localStorage.getItem("videoUrl");

    if (!url) {
      console.warn("⚠️ No video URL received! Redirecting...");
      setTimeout(() => navigate("/available-courses"), 2000); // Redirect after 2 sec
      return;
    }

    console.log("📌 Received Video URL:", url);

    // Ensure URL starts with "http" (handling local storage paths)
    if (!url.startsWith("http")) {
      url = `http://localhost:8080${url}`;
    }

    // Save it in localStorage to persist across refreshes
    localStorage.setItem("videoUrl", url);
    setVideoUrl(url);
    setLoading(false);
  }, [location, navigate]);

  return (
    <div className="video-container">
      <h2>Course Video</h2>

      {loading ? (
        <div className="spinner"></div> // ✅ Loading spinner
      ) : videoUrl ? (
        <video controls className="video-player">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="error-text">⚠️ No video available for this course.</p>
      )}

      <button className="back-btn" onClick={() => navigate("/available-courses")}>
        🔙 Back to Courses
      </button>
    </div>
  );
};

export default CourseVideo;
