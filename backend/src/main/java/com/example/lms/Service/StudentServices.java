package com.example.lms.Service;

import com.example.lms.Dto.LoginDTO;
import com.example.lms.Dto.StudentDTO;
import com.example.lms.Response.LoginResponse;

public interface StudentServices {
    
    String addStudent(StudentDTO studentDto);

    // Update the login method to include role in the response
    LoginResponse loginStudent(LoginDTO loginDto);
}
