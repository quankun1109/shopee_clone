package com.nhq.app.service;
import java.util.List;

import com.nhq.app.model.Product;
import com.nhq.app.repository.ProductRepository;
public class ProductService {

    // Lấy danh sách sản phẩm từ ProductRepository
    public static List<Product> getAllProducts() {
        return ProductRepository.getAllProducts();
    }

    public boolean updateProductLove(String productId, int love) {
        ProductRepository productRepo = new ProductRepository();
        return productRepo.updateLove(productId, love);
    }

     // Lấy danh sách các sản phẩm yêu thích
     public List<Product> getLovedProducts() {
        ProductRepository productRepo = new ProductRepository();
        return productRepo.findLovedProducts();
    }
}