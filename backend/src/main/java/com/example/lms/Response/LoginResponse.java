package com.example.lms.Response;

public class LoginResponse {
    
    private String message;
    private boolean status;
    private String role;
    private int studentid; // ✅ Add student ID

    // Constructor with studentid
    public LoginResponse(String message, boolean status, String role, int studentid) {
        this.message = message;
        this.status = status;
        this.role = role;
        this.studentid = studentid;
    }

    // Constructor without studentid for error cases
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

    @Override
    public String toString() {
        return "LoginResponse [message=" + message + ", status=" + status + ", role=" + role + ", studentid=" + studentid + "]";
    }
}
