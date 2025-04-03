package com.example.course.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonBackReference // ✅ Prevent infinite loop
    private Course course;

    // ✅ Default constructor (required by JPA)
    public Video() {}

    // ✅ Parameterized constructor
    public Video(String videoUrl, Course course) {
        this.videoUrl = videoUrl;
        this.course = course;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
