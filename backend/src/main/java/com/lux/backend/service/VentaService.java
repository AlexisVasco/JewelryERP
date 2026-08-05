package com.lux.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lux.backend.dto.DetalleVentaRequest;
import com.lux.backend.dto.VentaRequest;
import com.lux.backend.entity.Cliente;
import com.lux.backend.entity.DetalleVenta;
import com.lux.backend.entity.Producto;
import com.lux.backend.entity.Venta;
import com.lux.backend.repository.ClienteRepository;
import com.lux.backend.repository.DetalleVentaRepository;
import com.lux.backend.repository.ProductoRepository;
import com.lux.backend.repository.VentaRepository;


@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final DetalleVentaRepository detalleVentaRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;

    public VentaService(
            VentaRepository ventaRepository,
            DetalleVentaRepository detalleVentaRepository,
            ProductoRepository productoRepository,
            ClienteRepository clienteRepository) {

        this.ventaRepository = ventaRepository;
        this.detalleVentaRepository = detalleVentaRepository;
        this.productoRepository = productoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public void registrarVenta(VentaRequest request) {

        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow();

        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setFecha(LocalDateTime.now());

        double total = 0;

        venta = ventaRepository.save(venta);

        for (DetalleVentaRequest item : request.getProductos()) {

            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow();

            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException(
                        "Stock insuficiente para " + producto.getNombre()
                );
            }

            producto.setStock(producto.getStock() - item.getCantidad());

            productoRepository.save(producto);

            DetalleVenta detalle = new DetalleVenta();

            detalle.setVenta(venta);
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecio(producto.getPrecio().doubleValue());
            detalle.setSubtotal(producto.getPrecio().doubleValue() * item.getCantidad());

            total += detalle.getSubtotal();

            detalleVentaRepository.save(detalle);
        }

        venta.setTotal(total);

        ventaRepository.save(venta);
    }
    public List<Venta> listarVentas() {
    return ventaRepository.findAllByOrderByFechaDesc();
}

}
