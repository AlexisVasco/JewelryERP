package com.lux.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lux.backend.entity.Gasto;
import com.lux.backend.repository.GastoRepository;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;

    public GastoService(GastoRepository gastoRepository) {
        this.gastoRepository = gastoRepository;
    }

    public List<Gasto> listarGastos() {
        return gastoRepository.findAll();
    }

    public Gasto guardarGasto(Gasto gasto) {
        return gastoRepository.save(gasto);
    }

    public Gasto obtenerGastoPorId(Long id) {
        return gastoRepository.findById(id).orElse(null);
    }

    public Gasto actualizarGasto(Long id, Gasto gastoActualizado) {

        Gasto gasto = gastoRepository.findById(id).orElse(null);

        if (gasto != null) {

            gasto.setDescripcion(gastoActualizado.getDescripcion());
            gasto.setCategoria(gastoActualizado.getCategoria());
            gasto.setValor(gastoActualizado.getValor());
            gasto.setFecha(gastoActualizado.getFecha());

            return gastoRepository.save(gasto);
        }

        return null;
    }

    public void eliminarGasto(Long id) {
        gastoRepository.deleteById(id);
    }

}