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

import com.lux.backend.entity.Gasto;
import com.lux.backend.service.GastoService;

@RestController
@RequestMapping("/gastos")
@CrossOrigin(origins = "http://localhost:5173")
public class GastoController {

    private final GastoService gastoService;

    public GastoController(GastoService gastoService) {
        this.gastoService = gastoService;
    }

    @GetMapping
    public List<Gasto> listarGastos() {
        return gastoService.listarGastos();
    }

    @PostMapping
    public Gasto guardarGasto(@RequestBody Gasto gasto) {
        return gastoService.guardarGasto(gasto);
    }

    @GetMapping("/{id}")
    public Gasto obtenerGasto(@PathVariable Long id) {
        return gastoService.obtenerGastoPorId(id);
    }

    @PutMapping("/{id}")
    public Gasto actualizarGasto(
            @PathVariable Long id,
            @RequestBody Gasto gasto) {

        return gastoService.actualizarGasto(id, gasto);
    }

    @DeleteMapping("/{id}")
    public void eliminarGasto(@PathVariable Long id) {
        gastoService.eliminarGasto(id);
    }

}