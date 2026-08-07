import { useEffect, useState } from "react";
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function VentasChart() {

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {

        try {

            const respuesta = await axios.get(
                "http://localhost:8080/ventas/por-mes"
            );

            setVentas(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const data = {

        labels: ventas.map(v => v.mes),

        datasets: [

            {

                label: "Ventas por mes",

                data: ventas.map(v => v.total),

                borderColor: "#2563eb",

                backgroundColor: "#60a5fa",

                borderWidth: 3,

                tension: 0.4,

                fill: true

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                position: "top"

            }

        }

    };

    return <Line data={data} options={options} />;

}

export default VentasChart;