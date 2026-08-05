package com.lux.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Proveedor;
import com.lux.backend.repository.ProveedorRepository;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAll();
    }

    public Proveedor guardarProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public Proveedor obtenerProveedorPorId(Long id) {
        return proveedorRepository.findById(id).orElse(null);
    }

    public Proveedor actualizarProveedor(Long id, Proveedor proveedorActualizado) {

        Proveedor proveedor = proveedorRepository.findById(id).orElse(null);

        if (proveedor != null) {

            proveedor.setNombre(proveedorActualizado.getNombre());
            proveedor.setTelefono(proveedorActualizado.getTelefono());
            proveedor.setCorreo(proveedorActualizado.getCorreo());
            proveedor.setDireccion(proveedorActualizado.getDireccion());

            return proveedorRepository.save(proveedor);

        }

        return null;
    }

    public void eliminarProveedor(Long id) {
        proveedorRepository.deleteById(id);
    }

}