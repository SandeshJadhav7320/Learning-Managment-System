package com.example.enroll.enrollcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.enroll.RequestDTO.EnrollmentRequest;
import com.example.enroll.ResponseDTO.ApiResponse;
import com.example.enroll.sevice.EnrollmentService;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentRequest request) {
        try {
            enrollmentService.enrollStudent(request.getStudentId(), request.getCourseId());
            return ResponseEntity.ok(new ApiResponse(true, "Enrollment successful!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
}
