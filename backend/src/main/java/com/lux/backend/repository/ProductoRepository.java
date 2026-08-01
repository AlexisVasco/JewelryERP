package com.lux.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lux.backend.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{
    
}
