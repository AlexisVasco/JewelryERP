package com.lux.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}