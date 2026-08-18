import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/configuracion";

export const obtenerConfiguracion = () => {
    return axios.get(API_URL);
};

export const guardarConfiguracion = (configuracion) => {
    return axios.put(API_URL, configuracion);
};