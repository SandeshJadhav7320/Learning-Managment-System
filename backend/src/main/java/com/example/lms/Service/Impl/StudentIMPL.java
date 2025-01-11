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
        // Ensure the role is being passed from the frontend
        String role = studentDto.getRole(); // Get role from the DTO (it could be "student", "admin", etc.)

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
        // Using Optional to handle the potential null value for the student
        Optional<Student> optionalStudent = studentRepo.findByEmail(loginDto.getEmail());

        // Checking if the student exists in the repository
        if (optionalStudent.isPresent()) {
            Student student1 = optionalStudent.get();
            String password = loginDto.getPassword();
            String encodedPassword = student1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                // Here, check the role of the student (could be stored in a role field)
            	String role = student1.getRole();  // Example: you can set the role directly based on business logic.
                return new LoginResponse("Login success", true, role);
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else {
            return new LoginResponse("Email not exist", false);
        }
    }
}
