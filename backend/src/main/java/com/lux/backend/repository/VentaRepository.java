package com.lux.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    List<Venta> findAllByOrderByFechaDesc();

}