package com.example.course.repository;

import com.example.course.entity.Video;
import com.example.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByCourse(Course course);
    void deleteByCourse(Course course);
}
