package com.lux.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lux.backend.dto.VentaMesDTO;
import com.lux.backend.entity.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    @Query("""
        SELECT new com.lux.backend.dto.VentaMesDTO(
            function('to_char', v.fecha, 'TMMonth'),
            year(v.fecha),
            sum(v.total)
        )
        FROM Venta v
        GROUP BY
            year(v.fecha),
            month(v.fecha),
            function('to_char', v.fecha, 'TMMonth')
        ORDER BY
            year(v.fecha),
            month(v.fecha)
    """)
    List<VentaMesDTO> obtenerVentasPorMes();

    List<Venta> findAllByOrderByFechaDesc();
}