package com.example.course.service;

import com.example.course.entity.Course;
import com.example.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    private static final String UPLOAD_DIR = "uploads"; // 🔹 Folder to store videos

    // ✅ Add Course with Video Upload
    public Course addCourse(Course course, MultipartFile videoFile) throws IOException {
        if (videoFile != null && !videoFile.isEmpty()) {
            // 🔹 Ensure Upload Directory Exists
            File uploadDir = new File("uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 🔹 Save Video to Local Storage
            String filePath = "uploads" + File.separator + videoFile.getOriginalFilename();
            videoFile.transferTo(Paths.get(filePath));

            // ✅ Store Video URL instead of local path
            String videoUrl = "src/main/resources/static/uploads/" + videoFile.getOriginalFilename();
            course.setVideoUrl(videoUrl);
        }
        return courseRepository.save(course);
    }



    // ✅ Retrieve all courses
    public List<Course> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        
        // Update video URL to be accessible via API
        String baseUrl = "http://localhost:8080/instructor/videos/";  
        courses.forEach(course -> {
            if (course.getVideoUrl() != null) {
                String filename = new File(course.getVideoUrl()).getName();
                course.setVideoUrl(baseUrl + filename);
            }
        });

        return courses;
    }


    // ✅ Delete a course
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new IllegalArgumentException("Course not found with ID: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }
}
