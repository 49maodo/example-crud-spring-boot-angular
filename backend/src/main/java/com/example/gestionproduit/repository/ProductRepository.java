package com.example.gestionproduit.repository;

import com.example.gestionproduit.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);
}
