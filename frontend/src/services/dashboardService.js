import axios from "axios";

const API_URL = "https://jewelryerp-backend.onrender.com/dashboard";

export const obtenerDashboard = () => {
    return axios.get(API_URL);
};