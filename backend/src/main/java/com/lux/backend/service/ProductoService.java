package com.lux.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Producto;
import com.lux.backend.repository.ProductoRepository;

@Service

public class ProductoService { 
    
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) { 
        this.productoRepository = productoRepository;
    }

    public List<Producto> listarProductos() { 
        return productoRepository.findAll();
    }

    public Producto guardarProducto(Producto producto){
        return productoRepository.save(producto);
    }

    public Producto obtenerProductoPorId(Long id){
        return productoRepository.findById(id).orElse(null);
    }

    public Producto actualizarProducto(Long id, Producto productoActualizado){
        Producto producto = productoRepository.findById(id).orElse(null);

        if (producto != null){
            producto.setNombre(productoActualizado.getNombre());
            producto.setMedida(productoActualizado.getMedida());
            producto.setStock(productoActualizado.getStock());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setCosto(productoActualizado.getCosto());

            return productoRepository.save(producto);
        }
        return null;
    }
    public void eliminarProducto(Long id){
        productoRepository.deleteById(id);
    }
}