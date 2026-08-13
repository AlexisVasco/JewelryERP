package com.lux.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.entity.Configuracion;
import com.lux.backend.service.ConfiguracionService;

@RestController
@RequestMapping("/configuracion")
@CrossOrigin(origins = "http://localhost:5173")
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    public ConfiguracionController(
            ConfiguracionService configuracionService) {

        this.configuracionService = configuracionService;
    }

    @GetMapping
    public Configuracion obtenerConfiguracion() {

        return configuracionService.obtenerConfiguracion();
    }

    @PutMapping
    public Configuracion guardarConfiguracion(
            @RequestBody Configuracion configuracion) {

        return configuracionService.guardarConfiguracion(
                configuracion
        );
    }
}