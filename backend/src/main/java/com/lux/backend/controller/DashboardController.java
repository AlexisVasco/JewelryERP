package com.lux.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.entity.Producto;
import com.lux.backend.repository.ClienteRepository;
import com.lux.backend.repository.GastoRepository;
import com.lux.backend.repository.ProductoRepository;
import com.lux.backend.repository.VentaRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;
    private final GastoRepository gastoRepository;

    public DashboardController(
            ProductoRepository productoRepository,
            ClienteRepository clienteRepository,
            VentaRepository ventaRepository,
            GastoRepository gastoRepository) {

        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
        this.ventaRepository = ventaRepository;
        this.gastoRepository = gastoRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> obtenerDatos() {

        Map<String, Object> datos = new HashMap<>();

        // Cantidad total de productos
        datos.put(
                "productos",
                productoRepository.count()
        );

        // Cantidad total de clientes
        datos.put(
                "clientes",
                clienteRepository.count()
        );

        // Cantidad total de ventas
        datos.put(
                "ventas",
                ventaRepository.count()
        );

        // Total vendido
        double totalVentas = ventaRepository.findAll()
                .stream()
                .filter(venta -> venta.getTotal() != null)
                .mapToDouble(venta -> venta.getTotal())
                .sum();

        // Total de gastos
        double totalGastos = gastoRepository.findAll()
                .stream()
                .filter(gasto -> gasto.getValor() != null)
                .mapToDouble(gasto -> gasto.getValor())
                .sum();

        // Ganancia / utilidad
        double ganancia = totalVentas - totalGastos;

        datos.put(
                "ganancias",
                totalVentas
        );

        datos.put(
                "gastos",
                totalGastos
        );

        datos.put(
                "utilidad",
                ganancia
        );

        // Productos con stock bajo
        List<Producto> productosStockBajo = productoRepository.findAll()
                .stream()
                .filter(producto -> producto.getStock() != null)
                .filter(producto -> producto.getStock() <= 5)
                .collect(Collectors.toList());

        datos.put(
                "productosStockBajo",
                productosStockBajo
        );

        return datos;
    }
}