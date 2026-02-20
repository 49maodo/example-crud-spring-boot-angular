package com.example.gestionproduit.controller;

import com.example.gestionproduit.dto.AuthRequest;
import com.example.gestionproduit.dto.AuthResponse;
import com.example.gestionproduit.model.Role;
import com.example.gestionproduit.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            AuthResponse response = authService.authenticate(authRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Incorrect username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@RequestBody AuthRequest authRequest) {
        try {
            // Default registration is for CLIENT. Admin must be created directly or via
            // secure endpoint.
            AuthResponse response = authService.register(authRequest, Role.ROLE_CLIENT);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(Map.of("error", e.getMessage()));
        }
    }

    // Simplification for testing: allow creating an admin directly
    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody AuthRequest authRequest) {
        try {
            AuthResponse response = authService.register(authRequest, Role.ROLE_ADMIN);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(Map.of("error", e.getMessage()));
        }
    }
}
