import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseVideo.css";

const CourseVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoUrls, setVideoUrls] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let urls = location.state?.videoUrls;

    if (!urls) {
      const stored = localStorage.getItem("videoUrls");
      urls = stored ? JSON.parse(stored) : null;
    }

    if (!urls || urls.length === 0) {
      console.warn("⚠️ No video URLs received! Redirecting...");
      setTimeout(() => navigate("/available-courses"), 2000);
      return;
    }

    const formattedUrls = urls.map((url) =>
      url.startsWith("http") ? url : `http://localhost:8080${url}`
    );

    localStorage.setItem("videoUrls", JSON.stringify(formattedUrls));
    setVideoUrls(formattedUrls);
    setCurrentVideo(formattedUrls[0]);
    setLoading(false);
  }, [location, navigate]);

  const handleVideoClick = (url) => {
    if (url !== currentVideo) {
      setCurrentVideo(null); // Force re-render
      setTimeout(() => setCurrentVideo(url), 100); // Smooth transition
    }
  };

  return (
    <div className="course-video-wrapper">
      {/* Playlist Section */}
      <div className="playlist-section">
        <h3>📚 Course Content</h3>
        <ul>
          {videoUrls.map((url, index) => (
            <li
              key={index}
              className={url === currentVideo ? "active" : ""}
              onClick={() => handleVideoClick(url)}
            >
              <div className="video-thumbnail">🎞️</div>
              <div className="video-info">
                <span className="video-title">Video {index + 1}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Player Section */}
      <div className="video-section">
        {loading ? (
          <div className="spinner"></div>
        ) : currentVideo ? (
          <video
            key={currentVideo}
            controls
            className="video-player"
            autoPlay
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>⚠️ No video available.</p>
        )}

        <button className="back-btn" onClick={() => navigate("/available-courses")}>
          🔙 Back to Courses
        </button>
      </div>
    </div>
  );
};

export default CourseVideo;
