package com.example.gestionproduit.service;

import com.example.gestionproduit.dto.OrderRequest;
import com.example.gestionproduit.model.Order;
import com.example.gestionproduit.model.OrderLine;
import com.example.gestionproduit.model.Product;
import com.example.gestionproduit.model.User;
import com.example.gestionproduit.repository.OrderRepository;
import com.example.gestionproduit.repository.ProductRepository;
import com.example.gestionproduit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Order createOrder(String username, OrderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);

        double total = 0.0;

        for (OrderRequest.OrderLineRequest lineReq : request.getLines()) {
            Product product = productRepository.findById(lineReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + lineReq.getProductId()));

            if (!product.getActif()) {
                throw new IllegalArgumentException("Product is not active: " + product.getName());
            }

            if (product.getStock() < lineReq.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
            }

            // Deduce stock
            product.setStock(product.getStock() - lineReq.getQuantity());
            productRepository.save(product);

            OrderLine orderLine = new OrderLine();
            orderLine.setOrder(order);
            orderLine.setProduct(product);
            orderLine.setQuantity(lineReq.getQuantity());
            orderLine.setPriceAtPurchase(product.getPrice());

            order.getOrderLines().add(orderLine);
            total += (product.getPrice() * lineReq.getQuantity());
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
