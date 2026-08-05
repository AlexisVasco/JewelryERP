package com.lux.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.DetalleVenta;
import com.lux.backend.entity.Venta;

public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Long> {

    List<DetalleVenta> findByVenta(Venta venta);

}
