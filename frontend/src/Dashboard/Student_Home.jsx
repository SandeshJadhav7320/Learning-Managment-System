import React, { useEffect, useState } from 'react';
import './Student_Home.css';
import axios from 'axios';

const Student_Home = () => {
  const [studentData, setStudentData] = useState({});
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:8080/student/profile');
        setStudentData(studentResponse.data);

        const coursesResponse = await axios.get('http://localhost:8080/student/courses');
        setCourses(coursesResponse.data);

        const assignmentsResponse = await axios.get('http://localhost:8080/student/assignments');
        setAssignments(assignmentsResponse.data);

        const deadlinesResponse = await axios.get('http://localhost:8080/student/deadlines');
        setDeadlines(deadlinesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-home">
      <div className="profile-section">
        <img
          src={studentData.profilePicture || 'default-profile.png'}
          alt="Profile"
          className="profile-img"
        />
        <h2>Welcome, {studentData.name}!</h2>
        <p>{studentData.email}</p>
      </div>

      <div className="cards-section">
        <div className="card">
          <h3>Total Enrolled Courses</h3>
          <p>{courses.length}</p>
        </div>

        <div className="card">
          <h3>Completed Assignments</h3>
          <p>{assignments.filter((assignment) => assignment.completed).length}</p>
        </div>

        <div className="card">
          <h3>Upcoming Deadlines</h3>
          <p>{deadlines.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Student_Home;
