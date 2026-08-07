package com.lux.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.repository.ClienteRepository;
import com.lux.backend.repository.ProductoRepository;
import com.lux.backend.repository.VentaRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;

    public DashboardController(
            ProductoRepository productoRepository,
            ClienteRepository clienteRepository,
            VentaRepository ventaRepository) {

        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
        this.ventaRepository = ventaRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> obtenerDatos() {

        Map<String, Object> datos = new HashMap<>();

        datos.put("productos", productoRepository.count());

        datos.put("clientes", clienteRepository.count());

        datos.put("ventas", ventaRepository.count());

        Double totalVentas = ventaRepository.findAll()
                .stream()
                .mapToDouble(v -> v.getTotal())
                .sum();

        datos.put("ganancias", totalVentas);

        return datos;

    }

}