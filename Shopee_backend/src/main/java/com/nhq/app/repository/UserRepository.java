package com.nhq.app.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.nhq.app.config.DatabaseConnection;

public class UserRepository {

    public boolean userExists(String email) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, email);
                try (ResultSet rs = pstmt.executeQuery()) {
                    rs.next();
                    return rs.getInt(1) > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean addUser(String email, String password) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO users (email, pw) VALUES (?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, email);
                pstmt.setString(2, password);
                int rowsAffected = pstmt.executeUpdate();
                return rowsAffected > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean checkUserCredentials(String email, String password) {
        String query = "SELECT * FROM users WHERE email = ? AND pw = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            try (ResultSet rs = pstmt.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static String getUserAvatar(String email) {
        String query = "SELECT avatar_url FROM users WHERE email = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, email);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("avatar_url");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "default-avatar.png";
    }
}