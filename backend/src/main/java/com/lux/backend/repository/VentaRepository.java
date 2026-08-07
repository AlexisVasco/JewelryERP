package com.lux.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lux.backend.dto.VentaMesDTO;
import com.lux.backend.entity.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    @Query("""
    SELECT new com.lux.backend.dto.VentaMesDTO(
    MONTHNAME(v.fecha),
    SUM(v.total)
    )
    FROM Venta v
    GROUP BY MONTH(v.fecha), MONTHNAME(v.fecha)
    ORDER BY MONTH(v.fecha)
    """)
    List<VentaMesDTO> obtenerVentasPorMes();

    List<Venta> findAllByOrderByFechaDesc();

}