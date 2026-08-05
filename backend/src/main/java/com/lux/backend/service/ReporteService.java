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

        Double totalVentas = ventaRepository.findAll()
                .stream()
                .mapToDouble(v -> v.getTotal())
                .sum();

        Double totalGastos = gastoRepository.findAll()
                .stream()
                .mapToDouble(g -> g.getValor())
                .sum();

        reporte.setTotalVentas(totalVentas);
        reporte.setTotalGastos(totalGastos);
        reporte.setGanancia(totalVentas - totalGastos);

        reporte.setTotalProductos(productoRepository.count());
        reporte.setTotalClientes(clienteRepository.count());
        reporte.setTotalVentasRealizadas(ventaRepository.count());

        return reporte;
    }

}