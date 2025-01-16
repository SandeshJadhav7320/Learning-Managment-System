package com.example.course.service;

import com.example.course.entity.Course;
import com.example.course.repository.CourseRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
    

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

}