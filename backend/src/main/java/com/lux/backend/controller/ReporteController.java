package com.lux.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.dto.ReporteDTO;
import com.lux.backend.service.ReporteService;

@RestController
@RequestMapping("/reportes")
@CrossOrigin(origins = "http://localhost:5173")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping
    public ReporteDTO obtenerReporte() {
        return reporteService.obtenerReporte();
    }

}