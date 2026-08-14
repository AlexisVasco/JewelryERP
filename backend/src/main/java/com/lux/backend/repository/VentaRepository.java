package com.lux.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lux.backend.dto.VentaMesDTO;
import com.lux.backend.entity.Venta;

public interface VentaRepository
        extends JpaRepository<Venta, Long> {

    @Query("""
        SELECT new com.lux.backend.dto.VentaMesDTO(
            CASE MONTH(v.fecha)
                WHEN 1 THEN 'Enero'
                WHEN 2 THEN 'Febrero'
                WHEN 3 THEN 'Marzo'
                WHEN 4 THEN 'Abril'
                WHEN 5 THEN 'Mayo'
                WHEN 6 THEN 'Junio'
                WHEN 7 THEN 'Julio'
                WHEN 8 THEN 'Agosto'
                WHEN 9 THEN 'Septiembre'
                WHEN 10 THEN 'Octubre'
                WHEN 11 THEN 'Noviembre'
                WHEN 12 THEN 'Diciembre'
            END,
            YEAR(v.fecha),
            SUM(v.total)
        )
        FROM Venta v
        GROUP BY
            YEAR(v.fecha),
            MONTH(v.fecha)
        ORDER BY
            YEAR(v.fecha),
            MONTH(v.fecha)
    """)
    List<VentaMesDTO> obtenerVentasPorMes();

    List<Venta> findAllByOrderByFechaDesc();
}