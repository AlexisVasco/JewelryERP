package com.lux.backend.service;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Configuracion;
import com.lux.backend.repository.ConfiguracionRepository;

@Service
public class ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    public ConfiguracionService(
            ConfiguracionRepository configuracionRepository) {

        this.configuracionRepository = configuracionRepository;
    }

    public Configuracion obtenerConfiguracion() {

        return configuracionRepository
                .findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> {

                    Configuracion configuracion = new Configuracion();

                    configuracion.setNombreNegocio("LuxorShop ERP");
                    configuracion.setTelefono("");
                    configuracion.setCorreo("");
                    configuracion.setDireccion("");

                    return configuracionRepository.save(configuracion);
                });
    }

    public Configuracion guardarConfiguracion(
            Configuracion configuracionActualizada) {

        Configuracion configuracion = obtenerConfiguracion();

        configuracion.setNombreNegocio(
                configuracionActualizada.getNombreNegocio()
        );

        configuracion.setTelefono(
                configuracionActualizada.getTelefono()
        );

        configuracion.setCorreo(
                configuracionActualizada.getCorreo()
        );

        configuracion.setDireccion(
                configuracionActualizada.getDireccion()
        );

        return configuracionRepository.save(configuracion);
    }
}