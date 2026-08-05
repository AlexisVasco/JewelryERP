package com.lux.backend.dto;

import java.util.List;

public class VentaRequest {

    private Long clienteId;

    private List<DetalleVentaRequest> productos;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public List<DetalleVentaRequest> getProductos() {
        return productos;
    }

    public void setProductos(List<DetalleVentaRequest> productos) {
        this.productos = productos;
    }
}
