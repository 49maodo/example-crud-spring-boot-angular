package com.example.gestionproduit.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @jakarta.validation.constraints.NotBlank(message = "Name is required")
    @jakarta.persistence.Column(unique = true)
    private String name;

    @jakarta.validation.constraints.NotBlank(message = "Description is required")
    private String description;

    @jakarta.validation.constraints.NotNull(message = "Stock is required")
    @jakarta.validation.constraints.Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    private Boolean actif = true;

    @jakarta.validation.constraints.NotNull(message = "Price is required")
    @jakarta.validation.constraints.Positive(message = "Price must be greater than 0")
    private Double price;

    @org.hibernate.annotations.CreationTimestamp
    @jakarta.persistence.Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;

    @org.hibernate.annotations.UpdateTimestamp
    @jakarta.persistence.Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;
}
