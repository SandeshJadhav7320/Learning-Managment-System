package com.example.lms.StudentController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // Login for student
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginDTO loginDto) {
        LoginResponse loginResponse = studentServices.loginStudent(loginDto);

        if (loginResponse.isStatus()) {
            return ResponseEntity.ok(loginResponse); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse); // 401 Unauthorized
        }
    }

    // Fetch logged-in student profile (Frontend must send email)
    @GetMapping(path = "/profile")
    public ResponseEntity<?> getStudentProfile(@RequestParam String email) {
        StudentDTO student = studentServices.getStudentByEmail(email);
        
        if (student != null) {
            return ResponseEntity.ok(student); // 200 OK with student details
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found for email: " + email); // 404 Not Found
        }
    }
}
