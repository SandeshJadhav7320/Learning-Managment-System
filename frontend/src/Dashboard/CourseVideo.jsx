import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CourseVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoUrl = location.state?.videoUrl;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Course Video</h2>
      {videoUrl ? (
        <video width="800" height="450" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available for this course.</p>
      )}
      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>Back</button>
    </div>
  );
};

export default CourseVideo;
