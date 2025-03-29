package com.example.course.coursecontroller;

import com.example.course.entity.Course;
import com.example.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/instructor")
@CrossOrigin(origins = "http://localhost:5173") // Adjust for your frontend URL
public class CourseController {

    @Autowired
    private CourseService courseService;

    // ✅ Add Course with Video Upload
    @PostMapping(value = "/addCourse", consumes = {"multipart/form-data"})
    public ResponseEntity<Response> addCourse(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("fee") Double fee,
            @RequestParam("duration") String duration,
            @RequestParam(value = "video", required = false) MultipartFile videoFile) {
        try {
            System.out.println("📌 Received Course: " + name);
            System.out.println("📌 Video file: " + (videoFile != null ? videoFile.getOriginalFilename() : "No video"));

            Course course = new Course();
            course.setName(name);
            course.setDescription(description);
            course.setFee(fee);
            course.setDuration(duration);

            Course savedCourse = courseService.addCourse(course, videoFile);
            System.out.println("✅ Course Saved with Video URL: " + savedCourse.getVideoUrl());

            return ResponseEntity.ok(new Response("Course added successfully", true, savedCourse));
        } catch (Exception e) {
            e.printStackTrace(); // 🔹 Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("Failed to add course", false, null));
        }
    }

    // ✅ Retrieve All Courses
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

    // ✅ Serve Video Files
 // ✅ Serve Video Files (Fixed)
    @GetMapping("/videos/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename) {
        try {
            Path videoPath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(videoPath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // ✅ Corrected: Now getting media type from resource, not File
                MediaType mediaType = MediaTypeFactory.getMediaType(resource)
                        .orElse(MediaType.APPLICATION_OCTET_STREAM);

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(mediaType)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
