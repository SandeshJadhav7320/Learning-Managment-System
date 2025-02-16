package com.example.lms.Service;

import com.example.lms.Dto.LoginDTO;
import com.example.lms.Dto.StudentDTO;
import com.example.lms.Response.LoginResponse;

public interface StudentServices {

    String addStudent(StudentDTO studentDto);

    LoginResponse loginStudent(LoginDTO loginDto);

    // Add the method to fetch student by email
    StudentDTO getStudentByEmail(String email);
}
