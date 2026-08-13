package com.lux.backend.dto;

public class VentaMesDTO {

    private String mes;
    private Integer anio;
    private Double total;

    public VentaMesDTO(
            String mes,
            Integer anio,
            Double total) {

        this.mes = mes;
        this.anio = anio;
        this.total = total;
    }

    public String getMes() {
        return mes;
    }

    public Integer getAnio() {
        return anio;
    }

    public Double getTotal() {
        return total;
    }
}