package com.example.enroll.sevice;

import java.time.LocalDateTime;
import java.util.List;

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

    // Updated enrollStudent method to handle new fields
    public void enrollStudent(Long studentId, Long courseId, String studentName, String qualification, String address) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("You are already enrolled in this course.");
        }

        // Creating a new enrollment object with additional student details
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDateTime.now());
        
        // Set additional student details in the Enrollment entity (if needed)
        enrollment.setStudentName(studentName);
        enrollment.setQualification(qualification);
        enrollment.setAddress(address);

        enrollmentRepository.save(enrollment);
    }

    // ✅ Fetch all enrolled courses for a student
    public List<Course> getEnrolledCoursesByStudentId(Long studentId) {
        return enrollmentRepository.findCoursesByStudentId(studentId);
    }

    // ✅ Fetch enrollment by ID (Fix for your issue)
    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found for ID: " + id));
    }
}
