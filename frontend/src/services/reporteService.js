import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/reportes";

export const obtenerReporte = () => {
    return axios.get(API_URL);
};