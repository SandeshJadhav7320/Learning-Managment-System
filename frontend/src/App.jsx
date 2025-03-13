import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Layout for student pages
import Student_Home from './Dashboard/Student_Home'; // Home page for students
import Student_Courses from './Dashboard/Student_Enrolled_Courses'; // Courses page for students
import Login from './components/Login'; // Login page
import Registration from './components/Registration';
import StudentDashboard from './Dashboard/StudentDashboard';
import Logout from './Dashboard/LogoutPage';
import AdminDashboard from './Dashboard/AdminDashboard';
import Availabel_Courses from './Dashboard/Availabel_Courses';
import InstructorDashboard from './Dashboard/InstructorDashboard';
import Instructor_Home from './Dashboard/Instructor_Home';
import Instructor_Add_Course from './Dashboard/Instructor_Add_Course';
import Instructor_Logout from './Dashboard/Instructor_Logout';
import LogoutPage from './Dashboard/LogoutPage';
import InstructorCourses from './Dashboard/InstructorCourses';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Student Routes (Wrapped in StudentDashboard) */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
            <Route path="availabel_courses" element={<Availabel_Courses />} />
            <Route path="home" element={<Student_Home />} />
            <Route path="courses" element={<Student_Courses />} />
            <Route path="logout" element={<LogoutPage />} />
        </Route>

        {/* Admin Routes (Wrapped in AdminDashboard) */}

        <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="home" element={<Student_Home />} />
            <Route path="courses" element={<Student_Courses />} />
            <Route path="logout" element={<Logout />} />
        </Route>
 
           {/* Instructor Routes (Wrapped in InstructorDashboard) */}
           <Route path="/instructor-dashboard" element={<InstructorDashboard />}>
            <Route path="instructorhome" element={<Instructor_Home />} />
            <Route path="addcourses" element={<Instructor_Add_Course />} />
            <Route path="instructorcourses" element={<InstructorCourses />} />
            <Route path="logout" element={<Instructor_Logout />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
