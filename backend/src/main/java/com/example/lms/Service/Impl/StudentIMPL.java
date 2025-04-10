package com.example.lms.Service.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.lms.Dto.LoginDTO;
import com.example.lms.Dto.StudentDTO;
import com.example.lms.Entity.Student;
import com.example.lms.Repo.StudentRepo;
import com.example.lms.Response.LoginResponse;
import com.example.lms.Service.StudentServices;

@Service
public class StudentIMPL implements StudentServices {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addStudent(StudentDTO studentDto) {
        String role = studentDto.getRole(); // Get role from the DTO

        Student student = new Student(
            studentDto.getStudentname(),
            studentDto.getEmail(),
            this.passwordEncoder.encode(studentDto.getPassword()),
            role // Set the role while creating the student
        );

        studentRepo.save(student);
        return student.getStudentname();
    }

    @Override
    
    public LoginResponse loginStudent(LoginDTO loginDto) {
        Optional<Student> optionalStudent = studentRepo.findByEmail(loginDto.getEmail());

        if (optionalStudent.isPresent()) {
            Student user = optionalStudent.get();
            String password = loginDto.getPassword();
            String encodedPassword = user.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                String role = user.getRole();
                return new LoginResponse(
                    "Login success",
                    true,
                    role,
                    user.getStudentid(),
                    user.getStudentname()  // ✅ sending back the name
                );
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else {
            return new LoginResponse("Email not exist", false);
        }
    }



    // Implement the method to fetch student by email
    @Override
    public StudentDTO getStudentByEmail(String email) {
        Optional<Student> studentOptional = studentRepo.findByEmail(email);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return new StudentDTO(student.getStudentid(), student.getStudentname(), student.getEmail(), null, student.getRole());
        }
        return null; // Return null if the student is not found
    }
}
