import axios from "axios";

const API_URL = "http://localhost:8080/reportes";

export const obtenerReporte = () => {
    return axios.get(API_URL);
};