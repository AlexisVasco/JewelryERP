package com.lux.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lux.backend.entity.Cliente;
import com.lux.backend.repository.ClienteRepository;
import com.lux.backend.repository.VentaRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;

    public ClienteService(
            ClienteRepository clienteRepository,
            VentaRepository ventaRepository) {

        this.clienteRepository = clienteRepository;
        this.ventaRepository = ventaRepository;
    }

    public List<Cliente> listarClientes() {

        return clienteRepository.findAll();

    }

    public Cliente guardarCliente(Cliente cliente) {

        return clienteRepository.save(cliente);

    }

    public Cliente obtenerClientePorId(Long id) {

        return clienteRepository.findById(id)
                .orElseThrow();

    }

    public Cliente actualizarCliente(
            Long id,
            Cliente clienteActualizado) {

        Cliente cliente = obtenerClientePorId(id);

        cliente.setNombre(clienteActualizado.getNombre());
        cliente.setTelefono(clienteActualizado.getTelefono());
        cliente.setCorreo(clienteActualizado.getCorreo());
        cliente.setDireccion(clienteActualizado.getDireccion());

        return clienteRepository.save(cliente);

    }

    public void eliminarCliente(Long id) {

        Cliente cliente = obtenerClientePorId(id);

        boolean tieneVentas = ventaRepository.findAll()
                .stream()
                .anyMatch(venta ->
                        venta.getCliente() != null
                        && venta.getCliente().getId().equals(id)
                );

        if (tieneVentas) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "No se puede eliminar el cliente porque tiene ventas registradas."
            );

        }

        clienteRepository.delete(cliente);

    }

}