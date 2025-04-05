package com.example.course.repository;

import com.example.course.entity.Course;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>  {
	
	   @EntityGraph(attributePaths = "videoUrls")
	    List<Course> findAll();
}
