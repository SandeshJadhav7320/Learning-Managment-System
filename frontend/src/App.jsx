import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Student_Home from './Dashboard/Student_Home';
import Student_Courses from './Dashboard/Student_Enrolled_Courses'; 
import Login from './components/Login';
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
import CourseVideo from './Dashboard/CourseVideo';  // Import the new CourseVideo component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="availabel_courses" element={<Availabel_Courses />} />
          <Route path="home" element={<Student_Home />} />
          <Route path="courses" element={<Student_Courses />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="home" element={<Student_Home />} />
          <Route path="courses" element={<Student_Courses />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* Instructor Routes */}
        <Route path="/instructor-dashboard" element={<InstructorDashboard />}>
          <Route path="instructorhome" element={<Instructor_Home />} />
          <Route path="addcourses" element={<Instructor_Add_Course />} />
          <Route path="instructorcourses" element={<InstructorCourses />} />
          <Route path="logout" element={<Instructor_Logout />} />
        </Route>

        {/* New Route for Viewing Course Videos */}
        <Route path="/course/:id" element={<CourseVideo />} />

      </Routes>
    </Router>
  );
};

export default App;
