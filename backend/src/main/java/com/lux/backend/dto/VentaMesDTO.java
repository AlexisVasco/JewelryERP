package com.lux.backend.dto;

public class VentaMesDTO {

    private String mes;
    private Double total;

    public VentaMesDTO(String mes, Double total) {
        this.mes = mes;
        this.total = total;
    }

    public String getMes() {
        return mes;
    }

    public Double getTotal() {
        return total;
    }

}