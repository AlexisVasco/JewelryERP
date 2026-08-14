import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/usuarios";

export const login = (credenciales) => {
    return axios.post(`${API_URL}/login`, credenciales);
};

export const registrar = (usuario) => {
    return axios.post(`${API_URL}/registrar`, usuario);
};

export const listarUsuarios = () => {
    return axios.get(API_URL);
};

export const actualizarUsuario = (id, usuario) => {
    return axios.put(`${API_URL}/${id}`, usuario);
};