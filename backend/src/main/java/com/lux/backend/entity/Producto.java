package com.lux.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String medida;
    private Integer stock;
    private Integer costo;
    private Integer precio;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getNombre(){
        return nombre;
    }
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getMedida(){
        return medida;
    }
    public void setMedida(String medida){
        this.medida = medida;
    }

    public Integer getStock(){
        return stock;
    }
    public void setStock(Integer stock){
        this.stock = stock;
    }

    public Integer getCosto(){
        return costo;
    }
    public void setCosto(Integer costo){
        this.costo = costo;
    }

    public Integer getPrecio(){
        return precio;
    }
    public void setPrecio(Integer precio){
        this.precio = precio;
    }

}

