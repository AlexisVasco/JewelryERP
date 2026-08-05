package com.lux.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.Gasto;

public interface GastoRepository extends JpaRepository<Gasto, Long> {

}