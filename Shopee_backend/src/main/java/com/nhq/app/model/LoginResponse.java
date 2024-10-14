package com.nhq.app.model;

public class LoginResponse {
    private boolean success;
    private String message;
    private String avatarUrl;

    public LoginResponse(boolean success, String message, String avatarUrl) {
        this.success = success;
        this.message = message;
        this.avatarUrl = avatarUrl;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }
}