package com.example.lms.StudentController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms.Dto.LoginDTO;
import com.example.lms.Dto.StudentDTO;
import com.example.lms.Response.LoginResponse;
import com.example.lms.Service.StudentServices;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    // Save a new student
    @PostMapping(path = "/save")
    public String saveStudent(@RequestBody StudentDTO studentDto) {
        String id = studentServices.addStudent(studentDto);
        return id;
    }

    // Login for student (you can generalize this to handle instructor/admin roles as well)
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginDTO loginDto) {
        LoginResponse loginResponse = studentServices.loginStudent(loginDto);
        
        // Check if login is successful or failed
        if (loginResponse.isStatus()) {
            return ResponseEntity.ok(loginResponse); // 200 OK
        } else {
            // If login fails, return appropriate HTTP status (401 Unauthorized or 404 Not Found)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse); // 401 Unauthorized
        }
    }
}
