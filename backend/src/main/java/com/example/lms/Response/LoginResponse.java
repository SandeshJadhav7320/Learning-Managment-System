package com.example.lms.Response;

public class LoginResponse {

    private String message;
    private boolean status;
    private String role;
    private int studentid;
    private String studentname; // ✅ New field to store instructor or student name

    // Constructor with name
    public LoginResponse(String message, boolean status, String role, int studentid, String studentname) {
        this.message = message;
        this.status = status;
        this.role = role;
        this.studentid = studentid;
        this.studentname = studentname;
    }

    // Constructor without name (for failure)
    public LoginResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

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

    @Override
    public String toString() {
        return "LoginResponse [message=" + message + ", status=" + status + ", role=" + role +
               ", studentid=" + studentid + ", studentname=" + studentname + "]";
    }
}
