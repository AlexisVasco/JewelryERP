package com.lux.backend.service;

import org.springframework.stereotype.Service;

import com.lux.backend.dto.ReporteDTO;
import com.lux.backend.repository.ClienteRepository;
import com.lux.backend.repository.GastoRepository;
import com.lux.backend.repository.ProductoRepository;
import com.lux.backend.repository.VentaRepository;

@Service
public class ReporteService {

    private final VentaRepository ventaRepository;
    private final GastoRepository gastoRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;

    public ReporteService(
            VentaRepository ventaRepository,
            GastoRepository gastoRepository,
            ProductoRepository productoRepository,
            ClienteRepository clienteRepository) {

        this.ventaRepository = ventaRepository;
        this.gastoRepository = gastoRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
    }

    public ReporteDTO obtenerReporte() {

        ReporteDTO reporte = new ReporteDTO();

        double totalVentas = ventaRepository.findAll()
                .stream()
                .filter(venta -> venta.getTotal() != null)
                .mapToDouble(venta -> venta.getTotal())
                .sum();

        double totalGastos = gastoRepository.findAll()
                .stream()
                .filter(gasto -> gasto.getValor() != null)
                .mapToDouble(gasto -> gasto.getValor())
                .sum();

        double utilidad = totalVentas - totalGastos;

        reporte.setTotalVentas(totalVentas);

        reporte.setTotalGastos(totalGastos);

        reporte.setGanancia(utilidad);

        reporte.setTotalProductos(
                productoRepository.count()
        );

        reporte.setTotalClientes(
                clienteRepository.count()
        );

        reporte.setTotalVentasRealizadas(
                ventaRepository.count()
        );

        return reporte;
    }
}