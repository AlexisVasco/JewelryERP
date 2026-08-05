package com.lux.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lux.backend.entity.Proveedor;
import com.lux.backend.service.ProveedorService;

@RestController
@RequestMapping("/proveedores")
@CrossOrigin(origins = "http://localhost:5173")
public class ProveedorController {

    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @GetMapping
    public List<Proveedor> listarProveedores() {
        return proveedorService.listarProveedores();
    }

    @PostMapping
    public Proveedor guardarProveedor(@RequestBody Proveedor proveedor) {
        return proveedorService.guardarProveedor(proveedor);
    }

    @GetMapping("/{id}")
    public Proveedor obtenerProveedor(@PathVariable Long id) {
        return proveedorService.obtenerProveedorPorId(id);
    }

    @PutMapping("/{id}")
    public Proveedor actualizarProveedor(
            @PathVariable Long id,
            @RequestBody Proveedor proveedor) {

        return proveedorService.actualizarProveedor(id, proveedor);
    }

    @DeleteMapping("/{id}")
    public void eliminarProveedor(@PathVariable Long id) {
        proveedorService.eliminarProveedor(id);
    }

}