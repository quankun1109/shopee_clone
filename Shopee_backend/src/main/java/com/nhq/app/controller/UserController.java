package com.nhq.app.controller;

import com.google.gson.Gson;
import com.nhq.app.model.LoginResponse;
import com.nhq.app.service.UserService;

import static spark.Spark.get;
import static spark.Spark.post;

public class UserController {
    private final UserService userService = new UserService();
    private final Gson gson = new Gson();
    
    public void initializeRoutes() {
        // Route đăng ký người dùng
        post("/register", (request, response) -> {
            String email = request.queryParams("email");
            String password = request.queryParams("password");
            
            String message = userService.registerUser(email, password);
            response.status(message.equals("User registered successfully!") ? 200 : 400);
            return message;
        });

        //Route đăng nhập
        post("/login", (req, res) -> {
    String email = req.queryParams("email");
    String password = req.queryParams("password");
    
    // Kiểm tra thông tin đăng nhập trong database
    LoginResponse user = userService.login(email, password); // Giả sử có hàm login trả về user
    
    if (user != null) {
        res.status(200); // Trả về 200 OK
        return "{\"success\": true, \"avatarUrl\": \"" + user.getAvatarUrl() + "\"}";
    } else {
        res.status(401); // Trả về 401 nếu thông tin đăng nhập sai
        return "{\"success\": false, \"message\": \"Unauthorized\"}";
    }
});
        
        
        // Route kiểm tra server
        get("/", (req, res) -> "Server is up and running!");
    }
}
