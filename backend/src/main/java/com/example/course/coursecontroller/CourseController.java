package com.example.course.coursecontroller;

import com.example.course.entity.Course;
import com.example.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/instructor")
@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow frontend requests
public class CourseController {

    @Autowired
    private CourseService courseService;

    // ✅ Add Course with Multiple Video Uploads
    @PostMapping(value = "/addCourse", consumes = {"multipart/form-data"})
    public ResponseEntity<Response> addCourse(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("fee") Double fee,
            @RequestParam("duration") String duration,
            @RequestParam(value = "videos", required = false) List<MultipartFile> videoFiles) {
        try {
            System.out.println("📌 Received Course: " + name);
            System.out.println("📌 Number of videos: " + (videoFiles != null ? videoFiles.size() : 0));

            Course course = new Course();
            course.setName(name);
            course.setDescription(description);
            course.setFee(fee);
            course.setDuration(duration);

            Course savedCourse = courseService.addCourse(course, videoFiles);
            System.out.println("✅ Course Saved with Video URLs: " + savedCourse.getVideoUrls());

            return ResponseEntity.ok(new Response("Course added successfully", true, savedCourse));
        } catch (Exception e) {
            e.printStackTrace(); // 🔹 Log error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("Failed to add course", false, null));
        }
    }

    // ✅ Retrieve All Courses
 // ✅ Fetch All Courses
    @GetMapping("/getCourses")
    public ResponseEntity<List<Course>> getCourses() {
        List<Course> courses = courseService.getAllCourses();
        if (courses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(courses);
    }


    // ✅ Delete Course
    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<Response> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteCourse(id);
            return ResponseEntity.ok(new Response("Course deleted successfully", true, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new Response(e.getMessage(), false, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("Failed to delete course", false, null));
        }
    }

    // ✅ Response Class for Consistent API Responses
    static class Response {
        private String message;
        private boolean success;
        private Object data;

        public Response(String message, boolean success, Object data) {
            this.message = message;
            this.success = success;
            this.data = data;
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

        public Object getData() {
            return data;
        }
    }
}
