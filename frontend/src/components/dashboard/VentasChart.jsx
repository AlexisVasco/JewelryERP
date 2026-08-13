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

            console.error(
                "Error cargando ventas:",
                error
            );

        }

    };


    /*
     * Nombres de los meses.
     */
    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];


    /*
     * Obtenemos los últimos 6 meses.
     */
    const obtenerUltimosSeisMeses = () => {

        const resultado = [];

        const fechaActual = new Date();

        for (let i = 5; i >= 0; i--) {

            const fecha = new Date(
                fechaActual.getFullYear(),
                fechaActual.getMonth() - i,
                1
            );

            resultado.push({

                numero: fecha.getMonth(),

                anio: fecha.getFullYear(),

                nombre: meses[fecha.getMonth()]

            });

        }

        return resultado;

    };


    const ultimosSeisMeses =
        obtenerUltimosSeisMeses();


    /*
     * Convierte el nombre del mes que viene
     * desde el backend a número.
     */
    const obtenerNumeroMes = (mes) => {

        if (!mes) {
            return -1;
        }

        const nombre = mes
            .toString()
            .toLowerCase()
            .trim();

        const mesesNumeros = {

            enero: 0,
            january: 0,

            febrero: 1,
            february: 1,

            marzo: 2,
            march: 2,

            abril: 3,
            april: 3,

            mayo: 4,
            may: 4,

            junio: 5,
            june: 5,

            julio: 6,
            july: 6,

            agosto: 7,
            august: 7,

            septiembre: 8,
            september: 8,

            octubre: 9,
            october: 9,

            noviembre: 10,
            november: 10,

            diciembre: 11,
            december: 11

        };

        return mesesNumeros[nombre] ?? -1;

    };


    /*
     * Construimos los valores de la gráfica.
     *
     * Ahora comparamos:
     *
     * mes + año
     *
     * para evitar mezclar años diferentes.
     */
    const valoresVentas =
        ultimosSeisMeses.map((mes) => {

            const ventaEncontrada =
                ventas.find((venta) => {

                    const numeroMes =
                        obtenerNumeroMes(
                            venta.mes
                        );

                    const anio =
                        Number(venta.anio);

                    return (
                        numeroMes === mes.numero &&
                        anio === mes.anio
                    );

                });

            return ventaEncontrada
                ? Number(ventaEncontrada.total)
                : 0;

        });


    /*
     * Nombres que aparecerán debajo
     * de cada punto de la gráfica.
     */
    const nombresMeses =
        ultimosSeisMeses.map((mes) => {

            return `${mes.nombre} ${mes.anio}`;

        });


    const data = {

        labels: nombresMeses,

        datasets: [

            {

                label: "Ventas",

                data: valoresVentas,

                borderColor: "#2563eb",

                backgroundColor:
                    "rgba(37, 99, 235, 0.15)",

                borderWidth: 3,

                pointRadius: 5,

                pointHoverRadius: 7,

                pointBackgroundColor:
                    "#2563eb",

                pointBorderColor:
                    "#ffffff",

                pointBorderWidth: 2,

                tension: 0.4,

                fill: true

            }

        ]

    };


    const options = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {

                position: "top"

            },

            tooltip: {

                callbacks: {

                    label: function (context) {

                        return new Intl.NumberFormat(
                            "es-CO",
                            {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0
                            }
                        ).format(context.raw);

                    }

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    callback: function (value) {

                        return new Intl.NumberFormat(
                            "es-CO",
                            {
                                notation: "compact",
                                compactDisplay: "short"
                            }
                        ).format(value);

                    }

                }

            }

        }

    };


    return (

        <Line
            data={data}
            options={options}
        />

    );

}

export default VentasChart;