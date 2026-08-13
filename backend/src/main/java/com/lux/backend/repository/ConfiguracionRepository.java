package com.lux.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.Configuracion;

public interface ConfiguracionRepository
        extends JpaRepository<Configuracion, Long> {
}