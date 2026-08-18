import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/proveedores";

export const listarProveedores = () => {
    return axios.get(API_URL);
};

export const guardarProveedor = (proveedor) => {
    return axios.post(API_URL, proveedor);
};

export const actualizarProveedor = (id, proveedor) => {
    return axios.put(`${API_URL}/${id}`, proveedor);
};

export const eliminarProveedor = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};