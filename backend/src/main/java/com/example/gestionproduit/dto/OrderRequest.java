package com.example.gestionproduit.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private List<OrderLineRequest> lines;

    @Data
    public static class OrderLineRequest {
        private Long productId;
        private Integer quantity;
    }
}
