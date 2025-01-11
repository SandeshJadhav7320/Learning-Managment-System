package com.example.lms.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentid;

    private String studentname;
    private String email;
    private String password;

    @Column(name = "role")
    private String role; // Optional field for role

    // Constructor, Getters, and Setters


    // Constructor without studentid because it's auto-generated
    public Student(String studentname, String email, String password, String role) {
        this.studentname = studentname;
        this.email = email;
        this.password = password;
        this.role = role; // Set role during registration
    }

    // Default constructor for JPA
    public Student() {
    }

    // Getters and setters
    public int getStudentid() {
        return studentid;
    }

    public void setStudentid(int studentid) {
        this.studentid = studentid;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Student [studentid=" + studentid + ", studentname=" + studentname + ", email=" + email + ", password=" + password + "]";
    }
}
