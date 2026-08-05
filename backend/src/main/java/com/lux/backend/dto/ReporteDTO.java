package com.lux.backend.dto;

public class ReporteDTO {

    private Double totalVentas;
    private Double totalGastos;
    private Double ganancia;

    private Long totalProductos;
    private Long totalClientes;
    private Long totalVentasRealizadas;

    public ReporteDTO() {
    }

    public Double getTotalVentas() {
        return totalVentas;
    }

    public void setTotalVentas(Double totalVentas) {
        this.totalVentas = totalVentas;
    }

    public Double getTotalGastos() {
        return totalGastos;
    }

    public void setTotalGastos(Double totalGastos) {
        this.totalGastos = totalGastos;
    }

    public Double getGanancia() {
        return ganancia;
    }

    public void setGanancia(Double ganancia) {
        this.ganancia = ganancia;
    }

    public Long getTotalProductos() {
        return totalProductos;
    }

    public void setTotalProductos(Long totalProductos) {
        this.totalProductos = totalProductos;
    }

    public Long getTotalClientes() {
        return totalClientes;
    }

    public void setTotalClientes(Long totalClientes) {
        this.totalClientes = totalClientes;
    }

    public Long getTotalVentasRealizadas() {
        return totalVentasRealizadas;
    }

    public void setTotalVentasRealizadas(Long totalVentasRealizadas) {
        this.totalVentasRealizadas = totalVentasRealizadas;
    }

}