import React, { useState } from 'react';
import axios from 'axios';
import './Instructor_Add_Course.css';

const Instructor_Add_Course = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/instructor/addCourse', {
        name: courseName,
        description: courseDescription,
        fee: courseFee,
        duration: courseDuration
      });

      if (response.data.success) {
        setMessage('Course added successfully!');
      } else {
        setMessage('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Error adding course. Please try again.');
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
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Instructor_Add_Course;