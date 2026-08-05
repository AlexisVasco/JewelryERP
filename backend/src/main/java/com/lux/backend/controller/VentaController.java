package com.lux.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.dto.VentaRequest;
import com.lux.backend.service.VentaService;

@RestController
@RequestMapping("/ventas")
@CrossOrigin(origins = "http://localhost:5173")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping
    public ResponseEntity<?> registrarVenta(@RequestBody VentaRequest ventaRequest) {

        ventaService.registrarVenta(ventaRequest);

        return ResponseEntity.ok("Venta registrada correctamente");
    }

    @GetMapping
    public ResponseEntity<?> listarVentas() {
        
        return ResponseEntity.ok(ventaService.listarVentas());
}
}