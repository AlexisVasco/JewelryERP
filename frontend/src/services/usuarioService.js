import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export const login = (credenciales) => {
    return axios.post(`${API_URL}/login`, credenciales);
};

export const registrar = (usuario) => {
    return axios.post(`${API_URL}/registrar`, usuario);
};