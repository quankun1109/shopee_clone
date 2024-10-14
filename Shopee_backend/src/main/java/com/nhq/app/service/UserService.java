package com.nhq.app.service;

import com.nhq.app.model.LoginResponse;
import com.nhq.app.repository.UserRepository;

public class UserService {
    private final UserRepository userRepository = new UserRepository();

    public String registerUser(String email, String password) {
        if (userRepository.userExists(email)) {
            return "User already exists!";
        } else {
            boolean isAdded = userRepository.addUser(email, password);
            return isAdded ? "User registered successfully!" : "Failed to register user.";
        }
    }

    public LoginResponse login(String email, String password) {
        boolean isValidUser = UserRepository.checkUserCredentials(email, password);
        if (isValidUser) {
            String avatarUrl = UserRepository.getUserAvatar(email);
            return new LoginResponse(true, "Login successful!", avatarUrl);
        } else {
            return new LoginResponse(false, "Invalid email or password!", null);
        }
    }    
}