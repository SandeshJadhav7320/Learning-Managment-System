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

    private static final String UPLOAD_DIR = "uploads"; // ✅ Store videos in `uploads/` (Project Root)

    // ✅ Add Course with Video Upload
    public Course addCourse(Course course, MultipartFile videoFile) throws IOException {
        if (videoFile != null && !videoFile.isEmpty()) {
            // 🔹 Ensure Upload Directory Exists
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 🔹 Save Video to Uploads Folder
            String filePath = UPLOAD_DIR + File.separator + videoFile.getOriginalFilename();
            videoFile.transferTo(Paths.get(filePath));

            // ✅ Store Video URL for Frontend Access
            String videoUrl = "/uploads/" + videoFile.getOriginalFilename();

            course.setVideoUrl(videoUrl);
        }
        return courseRepository.save(course);
    }

    // ✅ Retrieve all courses with correct video URLs
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // ✅ Delete a course
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new IllegalArgumentException("Course not found with ID: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }
}
