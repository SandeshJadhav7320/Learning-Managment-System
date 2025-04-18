package com.example.enroll.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.course.entity.Course;
import com.example.enroll.Entity.Enrollment;
import com.example.lms.Entity.Student;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    boolean existsByStudentAndCourse(Student student, Course course);
    
    Enrollment findByStudentAndCourse(Student student, Course course);

    // ✅ Fetch all courses enrolled by a specific student
    @Query("SELECT e.course FROM Enrollment e WHERE e.student.id = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") Long studentId);
}
