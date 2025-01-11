import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Layout for student pages
import Student_Home from './Dashboard/Student_Home'; // Home page for students
import Student_Courses from './Dashboard/Student_Courses'; // Courses page for students
import Login from './components/Login'; // Login page
import Registration from './components/Registration';
import StudentDashboard from './Dashboard/StudentDashboard';
import Logout from './Dashboard/Logout';
import AdminDashboard from './Dashboard/AdminDashboard';




const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Student Routes (Wrapped in StudentDashboard) */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
            <Route path="home" element={<Student_Home />} />
            <Route path="courses" element={<Student_Courses />} />
            <Route path="logout" element={<Logout />} />
        </Route>

        {/* Admin Routes (Wrapped in AdminDashboard) */}

        <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="home" element={<Student_Home />} />
            <Route path="courses" element={<Student_Courses />} />
            <Route path="logout" element={<Logout />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
