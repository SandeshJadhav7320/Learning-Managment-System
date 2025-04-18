package com.example.enroll.enrollcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.enroll.RequestDTO.EnrollmentRequest;
import com.example.enroll.ResponseDTO.ApiResponse;
import com.example.enroll.sevice.EnrollmentService;
import com.example.course.entity.Course;
import com.example.enroll.Entity.Enrollment;

import java.util.List;

@RestController
@RequestMapping("/enrollment")
@CrossOrigin("**") // Allow frontend access
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentRequest request) {
        try {
            if (request.getStudentId() == null || request.getCourseId() == null) {
                throw new RuntimeException("Student ID and Course ID are required.");
            }

            enrollmentService.enrollStudent(request.getStudentId(), request.getCourseId());
            return ResponseEntity.ok(new ApiResponse(true, "Enrollment successful!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Error: " + e.getMessage()));
        }
    }

    // ✅ Fetch all enrolled courses for a student
    @GetMapping("/enrolled-courses/{studentId}")
    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable Long studentId) {
        List<Course> enrolledCourses = enrollmentService.getEnrolledCoursesByStudentId(studentId);
        return ResponseEntity.ok(enrolledCourses);
    }


    // ✅ Fetch enrollment by ID (Fix for your issue)
    @GetMapping("/{id}")
    public ResponseEntity<?> getEnrollmentById(@PathVariable Long id) {
        try {
            Enrollment enrollment = enrollmentService.getEnrollmentById(id);
            return ResponseEntity.ok(enrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage()));
        }
    }
}