package com.lux.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lux.backend.entity.Producto;
import com.lux.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    private final Path carpetaImagenes =
            Paths.get("uploads/productos");

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    public Producto guardarProducto(
            Producto producto,
            MultipartFile imagen) {

        if (imagen != null && !imagen.isEmpty()) {

            String nombreArchivo = guardarImagen(imagen);

            producto.setImagen(
                    "/uploads/productos/" + nombreArchivo
            );
        }

        return productoRepository.save(producto);
    }

    public Producto obtenerProductoPorId(Long id) {

        return productoRepository
                .findById(id)
                .orElse(null);
    }

    public Producto actualizarProducto(
            Long id,
            Producto productoActualizado,
            MultipartFile imagen) {

        Producto producto =
                productoRepository
                        .findById(id)
                        .orElse(null);

        if (producto != null) {

            producto.setNombre(
                    productoActualizado.getNombre()
            );

            producto.setMedida(
                    productoActualizado.getMedida()
            );

            producto.setStock(
                    productoActualizado.getStock()
            );

            producto.setPrecio(
                    productoActualizado.getPrecio()
            );

            producto.setCosto(
                    productoActualizado.getCosto()
            );

            if (imagen != null && !imagen.isEmpty()) {

                String nombreArchivo =
                        guardarImagen(imagen);

                producto.setImagen(
                        "/uploads/productos/"
                                + nombreArchivo
                );
            }

            return productoRepository.save(producto);
        }

        return null;
    }

    public void eliminarProducto(Long id) {

        productoRepository.deleteById(id);
    }

    private String guardarImagen(MultipartFile imagen) {

        try {

            Files.createDirectories(carpetaImagenes);

            String nombreOriginal =
                    imagen.getOriginalFilename();

            String extension = "";

            if (nombreOriginal != null
                    && nombreOriginal.contains(".")) {

                extension =
                        nombreOriginal.substring(
                                nombreOriginal.lastIndexOf(".")
                        );
            }

            String nombreArchivo =
                    UUID.randomUUID().toString()
                            + extension;

            Path destino =
                    carpetaImagenes.resolve(nombreArchivo);

            Files.copy(
                    imagen.getInputStream(),
                    destino,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return nombreArchivo;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Error al guardar la imagen",
                    e
            );
        }
    }
}