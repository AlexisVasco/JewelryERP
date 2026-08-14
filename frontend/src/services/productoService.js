import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/productos";

export const listarProductos = () => {
    return axios.get(API_URL);
};

export const guardarProducto = (producto) => {
    return axios.post(API_URL, producto);
};

export const actualizarProducto = (id, producto) => {
    return axios.put(`${API_URL}/${id}`, producto);
};

export const eliminarProducto = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const obtenerProductoPorId = (id) => {
    return axios.get(`${API_URL}/${id}`);
};