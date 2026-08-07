import { useEffect, useState } from "react";
import { obtenerDashboard } from "../services/dashboardService";
import VentasChart from "../components/dashboard/VentasChart";

function Inicio() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [dashboard, setDashboard] = useState({
        productos: 0,
        clientes: 0,
        ventas: 0,
        ganancias: 0
    });

    useEffect(() => {
        cargarDashboard();
    }, []);

    const cargarDashboard = async () => {

        try {

            const respuesta = await obtenerDashboard();
            setDashboard(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <div
                className="table-card"
                style={{
                    marginBottom: "25px"
                }}
            >

                <h1
                    style={{
                        color: "#111",
                        marginBottom: "10px"
                    }}
                >
                    👋 Bienvenido, {usuario?.nombre}
                </h1>

                <p
                    style={{
                        color: "#666",
                        fontSize: "18px"
                    }}
                >
                    Administra tu negocio desde un solo lugar.
                </p>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                    gap: "20px"
                }}
            >

                <div className="table-card">

                    <h3>🛒 Ventas</h3>

                    <h1>{dashboard.ventas}</h1>

                </div>

                <div className="table-card">

                    <h3>👥 Clientes</h3>

                    <h1>{dashboard.clientes}</h1>

                </div>

                <div className="table-card">

                    <h3>📦 Productos</h3>

                    <h1>{dashboard.productos}</h1>

                </div>

                <div className="table-card">

                    <h3>💰 Total Vendido</h3>

                    <h1>
                        {
                            new Intl.NumberFormat(
                                "es-CO",
                                {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0
                                }
                            ).format(dashboard.ganancias)
                        }
                    </h1>

                </div>

            </div>

            <br />

            <div className="table-card">

                    <h2>📈 Ventas de los últimos meses</h2>

                <br />

                    <VentasChart />

                </div>

            </div>

    );

}

export default Inicio;