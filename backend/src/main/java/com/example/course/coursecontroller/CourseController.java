package com.example.course.coursecontroller;

import com.example.course.entity.Course;
import com.example.course.service.CourseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instructor")
@CrossOrigin(origins = "http://localhost:5173")
 // Adjust for your frontend URL
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/addCourse")
    public Response addCourse(@RequestBody Course course) {
        try {
            Course savedCourse = courseService.addCourse(course);
            return new Response("Course added successfully", true, savedCourse);
        } catch (Exception e) {
            return new Response("Failed to add course", false, null);
        }
    }
    
    @GetMapping("/getCourses")
    public ResponseEntity<List<Course>> getCourses() {
        List<Course> courses = courseService.getAllCourses();
        if (courses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(courses);
    }

}

class Response {
    private String message;
    private boolean success;
    private Object data;

    public Response(String message, boolean success, Object data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
