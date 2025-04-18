package com.example.course.service;

import com.example.course.entity.Course;
import com.example.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    private static final String UPLOAD_DIR = "uploads"; // ✅ Store videos in `uploads/`

    // ✅ Add Course with Multiple Video Uploads
    public Course addCourse(Course course, List<MultipartFile> videoFiles) throws IOException {
        List<String> videoUrls = new ArrayList<>();

        if (videoFiles != null && !videoFiles.isEmpty()) {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs(); // ✅ Create directory if not exists
            }

            for (MultipartFile videoFile : videoFiles) {
                // ✅ Ensure unique filename to avoid overwriting
                String uniqueFileName = UUID.randomUUID() + "_" + videoFile.getOriginalFilename();
                String filePath = UPLOAD_DIR + File.separator + uniqueFileName;
                
                try {
                    Files.copy(videoFile.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
                    String videoUrl = "/uploads/" + uniqueFileName; // ✅ URL for frontend
                    videoUrls.add(videoUrl);
                } catch (IOException e) {
                    throw new IOException("Failed to store video: " + videoFile.getOriginalFilename(), e);
                }
            }
        }

        course.setVideoUrls(videoUrls);
        return courseRepository.save(course);
    }

    // ✅ Retrieve all courses
    public List<Course> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        courses.forEach(course -> course.getVideoUrls().size()); // ✅ Force loading
        return courses;
    }

    // ✅ Delete a course and its videos
    public void deleteCourse(Long courseId) {
        Optional<Course> courseOptional = courseRepository.findById(courseId);

        if (!courseOptional.isPresent()) {
            throw new IllegalArgumentException("Course not found with ID: " + courseId);
        }

        Course course = courseOptional.get();

        // ✅ Safely attempt to delete associated video files
        if (course.getVideoUrls() != null) {
            for (String videoUrl : course.getVideoUrls()) {
                try {
                    String filename = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
                    File videoFile = new File(UPLOAD_DIR + File.separator + filename);

                    if (videoFile.exists()) {
                        boolean deleted = videoFile.delete();
                        if (!deleted) {
                            System.out.println("⚠️ Could not delete file: " + videoFile.getAbsolutePath());
                        }
                    } else {
                        System.out.println("⚠️ File not found: " + videoFile.getAbsolutePath());
                    }
                } catch (Exception e) {
                    System.out.println("❌ Error deleting video file: " + videoUrl);
                    e.printStackTrace(); // Log for debugging
                }
            }
        }

        // ✅ Delete course from database
        try {
            courseRepository.deleteById(courseId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete course from DB: " + e.getMessage());
        }
    }

}
