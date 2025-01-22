package com.example.enroll.RequestDTO;
public class EnrollmentRequest {
    private Long studentId;
    private Long courseId;

    // Getter for studentId
    public Long getStudentId() {
        return studentId;
    }

    // Setter for studentId
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    // Getter for courseId
    public Long getCourseId() {
        return courseId;
    }

    // Setter for courseId
    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}

