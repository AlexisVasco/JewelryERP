import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/ventas";

export const registrarVenta = (venta) => {
    return axios.post(API_URL, venta);
};

export const listarVentas = () => {
    return axios.get(API_URL);
};