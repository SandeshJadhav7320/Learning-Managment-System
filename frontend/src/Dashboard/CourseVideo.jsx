import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = location.state?.videoUrl;

    if (!url) {
      console.warn("⚠️ No video URL received in state! Redirecting...");
      navigate(-1); // Redirect back if no video URL
      return;
    }

    console.log("📌 Received Video URL:", url);

    // ✅ Ensure we only prepend if the URL is relative
    if (!url.startsWith("http")) {
      url = `http://localhost:8080${url}`;
    }

    setVideoUrl(url);
    setLoading(false);

    console.log("✅ Final Video URL:", url);
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Course Video</h2>
      {loading ? (
        <p>⏳ Loading video...</p>
      ) : videoUrl ? (
        <video controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p style={{ color: "red" }}>⚠️ No video available for this course.</p>
      )}
      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
        🔙 Back
      </button>
    </div>
  );
};

export default CourseVideo;
