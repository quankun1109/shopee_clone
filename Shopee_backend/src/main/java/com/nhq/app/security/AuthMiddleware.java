package com.nhq.app.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

public class AuthMiddleware {
    // Xác thực token
    public static boolean verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); // Key bí mật để ký JWT
            JWTVerifier verifier = JWT.require(algorithm).build(); // Tạo JWT verifier
            DecodedJWT jwt = verifier.verify(token); // Xác minh token
            return true; // Token hợp lệ
        } catch (JWTVerificationException exception) {
            return false; // Token không hợp lệ
        }
    }
}