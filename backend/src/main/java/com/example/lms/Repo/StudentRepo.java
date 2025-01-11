package com.example.lms.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lms.Entity.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
    
    // Find a student by email and password (with Optional for null safety)
    Optional<Student> findOneByEmailAndPassword(String email, String password);

    // Find student by email (returns Optional<Student>)
    Optional<Student> findByEmail(String email);

    // Find students by role (if you have a 'role' field in your Student entity)
    // This can help you query users by role if needed (e.g., all students, instructors, etc.)
    List<Student> findByRole(String role);
}
