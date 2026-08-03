package com.lux.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Cliente;
import com.lux.backend.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente obtenerClientePorId(Long id) {
        return clienteRepository.findById(id).orElseThrow();
    }

    public Cliente actualizarCliente(Long id, Cliente clienteActualizado) {

        Cliente cliente = obtenerClientePorId(id);

        cliente.setNombre(clienteActualizado.getNombre());
        cliente.setTelefono(clienteActualizado.getTelefono());
        cliente.setCorreo(clienteActualizado.getCorreo());
        cliente.setDireccion(clienteActualizado.getDireccion());

        return clienteRepository.save(cliente);
    }

    public void eliminarCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
