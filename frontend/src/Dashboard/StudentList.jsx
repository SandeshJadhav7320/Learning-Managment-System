import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css'; // Import the CSS file for styling

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust if you use a different key
      const response = await axios.get('http://localhost:8080/enrollment/all-students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data); // Store students in state
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="student-list-container">
      <h2>Enrolled Students</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentid}>
                <td>{student.studentname}</td>
                <td>{student.email}</td>
                <td>{student.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students enrolled yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
