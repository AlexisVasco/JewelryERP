import { useEffect, useState } from "react";
import { obtenerDashboard } from "../services/dashboardService";
import VentasChart from "../components/dashboard/VentasChart";

function Inicio() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const [dashboard, setDashboard] = useState({
        productos: 0,
        clientes: 0,
        ventas: 0,
        ganancias: 0,
        gastos: 0,
        utilidad: 0,
        productosStockBajo: []
    });

    useEffect(() => {
        cargarDashboard();
    }, []);

    const cargarDashboard = async () => {

        try {

            const respuesta = await obtenerDashboard();

            setDashboard(respuesta.data);

        } catch (error) {

            console.error(
                "Error cargando dashboard:",
                error
            );

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
        ).format(valor || 0);

    };

    return (

        <div>

            {/* BIENVENIDA */}

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


            {/* TARJETAS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px"
                }}
            >

                <div className="table-card">

                    <h3>🛒 Ventas realizadas</h3>

                    <h1>
                        {dashboard.ventas}
                    </h1>

                </div>


                <div className="table-card">

                    <h3>💰 Total vendido</h3>

                    <h1>
                        {formatoMoneda(
                            dashboard.ganancias
                        )}
                    </h1>

                </div>


                <div className="table-card">

                    <h3>💸 Total gastos</h3>

                    <h1>
                        {formatoMoneda(
                            dashboard.gastos
                        )}
                    </h1>

                </div>


                <div className="table-card">

                    <h3>📈 Ganancia</h3>

                    <h1>
                        {formatoMoneda(
                            dashboard.utilidad
                        )}
                    </h1>

                </div>


                <div className="table-card">

                    <h3>👥 Clientes</h3>

                    <h1>
                        {dashboard.clientes}
                    </h1>

                </div>


                <div className="table-card">

                    <h3>📦 Productos</h3>

                    <h1>
                        {dashboard.productos}
                    </h1>

                </div>

            </div>


            <br />


            {/* STOCK BAJO */}

            <div className="table-card">

                <h2>
                    ⚠️ Productos con stock bajo
                </h2>

                <br />

                {
                    dashboard.productosStockBajo.length === 0 ? (

                        <p
                            style={{
                                color: "#666",
                                fontSize: "16px"
                            }}
                        >
                            ✅ No hay productos con stock bajo.
                        </p>

                    ) : (

                        <table className="products-table">

                            <thead>

                                <tr>

                                    <th>Producto</th>

                                    <th>Stock disponible</th>

                                    <th>Estado</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    dashboard.productosStockBajo.map(
                                        (producto) => (

                                            <tr
                                                key={producto.id}
                                            >

                                                <td>
                                                    {producto.nombre}
                                                </td>

                                                <td>
                                                    {producto.stock}
                                                </td>

                                                <td>

                                                    {
                                                        producto.stock === 0
                                                            ? "🔴 Agotado"
                                                            : "🟠 Stock bajo"
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    )
                }

            </div>


            <br />


            {/* GRÁFICA */}

            <div className="table-card">

                <h2>
                    📈 Ventas de los últimos 6 meses
                </h2>

                <br />

                <VentasChart />

            </div>

        </div>

    );

}

export default Inicio;