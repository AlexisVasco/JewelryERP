import axios from "axios";

const API_URL = "http://localhost:8080/gastos";

export const listarGastos = () => {
    return axios.get(API_URL);
};

export const guardarGasto = (gasto) => {
    return axios.post(API_URL, gasto);
};

export const actualizarGasto = (id, gasto) => {
    return axios.put(`${API_URL}/${id}`, gasto);
};

export const eliminarGasto = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};