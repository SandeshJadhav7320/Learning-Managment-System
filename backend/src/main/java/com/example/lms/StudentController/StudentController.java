package com.example.lms.StudentController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.lms.Dto.LoginDTO;
import com.example.lms.Dto.StudentDTO;
import com.example.lms.Entity.Student;
import com.example.lms.Repo.StudentRepo;
import com.example.lms.Response.LoginResponse;
import com.example.lms.Service.StudentServices;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    @Autowired
    private StudentRepo studentRepository; // ✅ FIXED

    @PostMapping(path = "/save")
    public String saveStudent(@RequestBody StudentDTO studentDto) {
        return studentServices.addStudent(studentDto);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginDTO loginDto) {
        LoginResponse loginResponse = studentServices.loginStudent(loginDto);
        if (loginResponse.isStatus()) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        }
    }

    @GetMapping("/profile") // ✅ FIXED endpoint
    public ResponseEntity<Student> getStudentByEmail(@RequestParam String email) {
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        return optionalStudent.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
