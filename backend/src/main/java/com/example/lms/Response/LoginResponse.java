package com.example.lms.Response;

public class LoginResponse {
    
    private String message;
    private boolean status;
    private String role;  // Add role if needed

    // Constructor for message and status
    public LoginResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    // Constructor for message, status, and role (you can add role here if you want to return role)
    public LoginResponse(String message, boolean status, String role) {
        this.message = message;
        this.status = status;
        this.role = role;
    }

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

    @Override
    public String toString() {
        return "LoginResponse [message=" + message + ", status=" + status + ", role=" + role + "]";
    }
}
