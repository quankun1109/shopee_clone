package com.nhq.app.controller;
import java.util.List;

import com.nhq.app.model.Product;
import com.nhq.app.service.ProductService;
public class ProductController {

    // Lấy danh sách tất cả sản phẩm
    public static List<Product> getAllProducts() {
        return ProductService.getAllProducts();
    }

    public static boolean updateProductLove(String productId, int love) {
        ProductService productService = new ProductService();
        return productService.updateProductLove(productId, love);
    }
}