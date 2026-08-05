import { useEffect, useState } from "react";
import { obtenerReporte } from "../services/reporteService";

function Reportes() {

    const [reporte, setReporte] = useState({
        totalVentas: 0,
        totalGastos: 0,
        ganancia: 0,
        totalProductos: 0,
        totalClientes: 0,
        totalVentasRealizadas: 0
    });

    useEffect(() => {
        cargarReporte();
    }, []);

    const cargarReporte = async () => {
        try {
            const respuesta = await obtenerReporte();
            setReporte(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatoMoneda = (valor) => {
        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
            }
        ).format(valor);
    };

    return (

        <div>

            <h1>Reportes</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px"
                }}
            >

                <div className="table-card">
                    <h3>Total Ventas</h3>
                    <h2>{formatoMoneda(reporte.totalVentas)}</h2>
                </div>

                <div className="table-card">
                    <h3>Total Gastos</h3>
                    <h2>{formatoMoneda(reporte.totalGastos)}</h2>
                </div>

                <div className="table-card">
                    <h3>Ganancia</h3>
                    <h2>{formatoMoneda(reporte.ganancia)}</h2>
                </div>

                <div className="table-card">
                    <h3>Productos</h3>
                    <h2>{reporte.totalProductos}</h2>
                </div>

                <div className="table-card">
                    <h3>Clientes</h3>
                    <h2>{reporte.totalClientes}</h2>
                </div>

                <div className="table-card">
                    <h3>Ventas Realizadas</h3>
                    <h2>{reporte.totalVentasRealizadas}</h2>
                </div>

            </div>

        </div>

    );

}

export default Reportes;