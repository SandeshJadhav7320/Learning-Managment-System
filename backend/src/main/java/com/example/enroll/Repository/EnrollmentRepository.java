package com.example.enroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.course.entity.Course;
import com.example.enroll.Entity.Enrollment;
import com.example.lms.Entity.Student;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByStudentAndCourse(Student student, Course course);
    
    Enrollment findByStudentAndCourse(Student student, Course course);
}

