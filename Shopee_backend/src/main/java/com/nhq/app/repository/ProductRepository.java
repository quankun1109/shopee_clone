package com.nhq.app.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.nhq.app.config.DatabaseConnection;
import com.nhq.app.model.Product;

public class ProductRepository {

    // Lấy danh sách tất cả sản phẩm từ database
    public static List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        try (Connection conn = DatabaseConnection.getConnection()) {
            String query = "SELECT * FROM products";
            PreparedStatement statement = conn.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setName(resultSet.getString("name"));
                product.setOldPrice(resultSet.getDouble("oldPrice"));
                product.setCurrentPrice(resultSet.getDouble("currentPrice"));
                product.setImageUrl(resultSet.getString("imageURL"));
                product.setBrand(resultSet.getString("brand"));
                product.setOrigin(resultSet.getString("origin"));
                product.setRating(resultSet.getFloat("rating"));
                product.setSold(resultSet.getInt("sold"));
                product.setDiscountPercent(resultSet.getInt("discount"));
                product.setLike(resultSet.getByte("like"));
                product.setLove(resultSet.getByte("love"));
                products.add(product);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }

    public boolean updateLove(String productId, int love) {
    String query = "UPDATE products SET love = ? WHERE id = ?";

    try (Connection conn = DatabaseConnection.getConnection();
         PreparedStatement stmt = conn.prepareStatement(query)) {
        stmt.setInt(1, love);
        stmt.setString(2, productId);

        int rowsUpdated = stmt.executeUpdate();
        return rowsUpdated > 0; // Trả về true nếu cập nhật thành công
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}
public List<Product> findLovedProducts() {
    List<Product> lovedProducts = new ArrayList<>();
    try (Connection conn = DatabaseConnection.getConnection()) {
        String sql = "SELECT * FROM products WHERE love = 1";
        PreparedStatement stmt = conn.prepareStatement(sql);
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            Product product = new Product();
            product.setId(rs.getInt("id"));
            product.setName(rs.getString("name"));
            product.setCurrentPrice(rs.getDouble("currentPrice"));
            product.setImageUrl(rs.getString("imageUrl"));
            lovedProducts.add(product);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return lovedProducts;
}
}
