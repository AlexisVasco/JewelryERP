import axios from "axios";

const API_URL = "http://localhost:8080/productos";

export const listarProductos = () =>{
    return axios.get(API_URL);
};

export const guardarProducto = (producto)=>{
    return axios.post(API_URL,producto);
};