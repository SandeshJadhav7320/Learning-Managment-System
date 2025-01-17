package com.example.lms.Dto;

public class LoginResponseDTO {
    
    private String message;
    private String role;

    // Constructor
    public LoginResponseDTO(String message, String role) {
        this.message = message;
        this.role = role;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "LoginResponseDTO [message=" + message + ", role=" + role + "]";
    }
}