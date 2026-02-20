package com.example.gestionproduit.service;

import com.example.gestionproduit.model.Product;
import com.example.gestionproduit.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product saveProduct(Product product) {
        if (product.getId() == null) {
            if (productRepository.existsByName(product.getName())) {
                throw new IllegalArgumentException("Product name already exists");
            }
        } else {
            if (productRepository.existsByNameAndIdNot(product.getName(), product.getId())) {
                throw new IllegalArgumentException("Product name already exists");
            }
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
