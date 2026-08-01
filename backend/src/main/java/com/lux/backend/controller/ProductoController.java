package com.lux.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.entity.Producto;
import com.lux.backend.service.ProductoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductoController { 
    
    private final ProductoService productoService;
    
    public ProductoController(ProductoService productoService){
        this.productoService = productoService;
    }

    @GetMapping("/productos")
    public List <Producto> listarProductos(){
        return productoService.listarProductos();
    }
    @PostMapping("/productos")
    public Producto guardarProducto(@RequestBody Producto producto){
        return productoService.guardarProducto(producto);
    }
    @GetMapping("/productos/{id}")
    public Producto obtenerProductoPorId(@PathVariable Long id){
        return productoService.obtenerProductoPorId(id);
    }

    @PutMapping("/productos/{id}")
    public Producto actualizarProducto(@PathVariable Long id,
                                        @RequestBody Producto producto){
                    return productoService.actualizarProducto(id, producto);
    }

    @DeleteMapping("/productos/{id}")
    
    public void eliminarProducto(@PathVariable Long id){
        productoService.eliminarProducto(id);
    }
    
}
