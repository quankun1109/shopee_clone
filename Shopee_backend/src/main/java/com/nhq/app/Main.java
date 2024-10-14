package com.nhq.app;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.nhq.app.controller.ProductController;
import com.nhq.app.controller.UserController;
import com.nhq.app.security.AuthMiddleware;
import com.nhq.app.service.ProductService;

import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

public class Main {

    public static void main(String[] args) {
        // Khởi tạo server
        port(4567);

        // Enable CORS
        enableCORS("*", "*", "*");

        // Khởi tạo các route cho controller
        UserController userController = new UserController();
        userController.initializeRoutes();

        // Route API kiểm tra token
        post("/api/verify-token", (req, res) -> {
            // Lấy token từ header "Authorization"
            String token = req.headers("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // Loại bỏ "Bearer " khỏi token
                if (AuthMiddleware.verifyToken(token)) {
                    res.status(200); // Token hợp lệ
                    return "Token valid";
                } else {
                    res.status(401); // Token không hợp lệ
                    return "Token invalid";
                }
            } else {
                res.status(400); // Không có token
                return "Token missing";
            }
        });

        ProductController productController = new ProductController();
        
        put("/products/:id/love", (req, res) -> {
            String productId = req.params(":id"); // Lấy ID của sản phẩm từ URL
            JSONObject requestBody = new JSONObject(req.body()); // Chuyển request body thành JSON
            int love = requestBody.getInt("love"); // Lấy giá trị 'love' từ request body

            // Gọi service để cập nhật trạng thái love trong cơ sở dữ liệu
            boolean success = productController.updateProductLove(productId, love);

            if (success) {
                res.status(200);
                return new JSONObject().put("message", "Cập nhật thành công").toString();
            } else {
                res.status(500);
                return new JSONObject().put("message", "Lỗi khi cập nhật").toString();
            }
        });

        // Route API lấy danh sách sản phẩm
        get("/products", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(productController.getAllProducts());
        });

        // Lấy danh sách sản phẩm yêu thích (love = 1)
        ProductService productService = new ProductService();
        get("/products/love", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(productService.getLovedProducts());
        });
    }

    // Enable CORS
    private static void enableCORS(final String origin, final String methods, final String headers) {
    before((request, response) -> {
        response.header("Access-Control-Allow-Origin", origin);
        response.header("Access-Control-Request-Method", methods);
        response.header("Access-Control-Allow-Headers", headers);
        response.header("Access-Control-Allow-Credentials", "true");
    });

    // Xử lý yêu cầu OPTIONS (preflight request)
    options("/*", (request, response) -> {
        String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
        if (accessControlRequestHeaders != null) {
            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
        }

        String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
        if (accessControlRequestMethod != null) {
            response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
        }

        return "OK";
    });
}
}
