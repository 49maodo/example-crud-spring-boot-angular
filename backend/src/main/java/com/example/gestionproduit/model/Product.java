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
    private String name;
    @jakarta.validation.constraints.NotNull(message = "Price is required")
    @jakarta.validation.constraints.Positive(message = "Price must be greater than 0")
    private Double price;
}
