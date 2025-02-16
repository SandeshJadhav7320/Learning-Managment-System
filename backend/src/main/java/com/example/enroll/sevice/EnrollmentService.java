package com.example.enroll.sevice;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.course.entity.Course;
import com.example.course.repository.CourseRepository;
import com.example.enroll.Entity.Enrollment;
import com.example.enroll.Repository.EnrollmentRepository;
import com.example.lms.Entity.Student;
import com.example.lms.Repo.StudentRepo;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private CourseRepository courseRepository;
    public void enrollStudent(Long studentId, Long courseId) {
        // Fetch student
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Fetch course
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Allow multiple students to enroll, but prevent duplicate enrollments for the same student
        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("You are already enrolled in this course.");
        }

        // Save enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDateTime.now());
        enrollmentRepository.save(enrollment);
    }

}
