import { useEffect, useState } from "react";
import { listarClientes } from "../services/clienteService";
import { listarProductos } from "../services/productoService";

function Ventas() {

    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");

    const [cantidad, setCantidad] = useState(1);
    const [detalleVenta, setDetalleVenta] = useState([]);

    useEffect(() => {
        cargarClientes();
        cargarProductos();
    }, []);

    const cargarClientes = async () => {
        try {
            const respuesta = await listarClientes();
            setClientes(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarProductos = async () => {
        try {
            const respuesta = await listarProductos();
            setProductos(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const agregarProducto = () => {

        if (!productoSeleccionado) return;

        const producto = productos.find(
            p => p.id === parseInt(productoSeleccionado)
        );

        if (!producto) return;

        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad
        };

        setDetalleVenta([...detalleVenta, nuevoProducto]);

        setProductoSeleccionado("");
        setCantidad(1);

    };

    const total = detalleVenta.reduce(
        (suma, item) => suma + item.subtotal,
        0
    );

    return (
        <div>

            <h1>Ventas</h1>

            <div className="table-card">

                <h3 className="table-title">Nueva Venta</h3>

                <div className="form-fields">

                    <select
                        className="form-input"
                        value={clienteSeleccionado}
                        onChange={(e) => setClienteSeleccionado(e.target.value)}
                    >

                        <option value="">
                            Seleccione un cliente
                        </option>

                        {clientes.map((cliente) => (
                            <option
                                key={cliente.id}
                                value={cliente.id}
                            >
                                {cliente.nombre}
                            </option>
                        ))}

                    </select>

                    <select
                        className="form-input"
                        value={productoSeleccionado}
                        onChange={(e) => setProductoSeleccionado(e.target.value)}
                    >

                        <option value="">
                            Seleccione un producto
                        </option>

                        {productos.map((producto) => (
                            <option
                                key={producto.id}
                                value={producto.id}
                            >
                                {producto.nombre}
                            </option>
                        ))}

                    </select>

                    <input
                        className="form-input"
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) =>
                            setCantidad(parseInt(e.target.value) || 1)
                        }
                    />

                    <button
                        className="form-button"
                        onClick={agregarProducto}
                    >
                        Agregar Producto
                    </button>

                </div>

            </div>

            <br />

            <div className="table-card">

                <h3 className="table-title">
                    Productos de la venta
                </h3>

                <table className="products-table">

                    <thead>

                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            detalleVenta.length === 0 ?

                                (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            style={{ textAlign: "center" }}
                                        >
                                            Aún no hay productos agregados
                                        </td>
                                    </tr>
                                )

                                :

                                detalleVenta.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.nombre}</td>

                                        <td>{item.cantidad}</td>

                                        <td>
                                            {new Intl.NumberFormat(
                                                "es-CO",
                                                {
                                                    style: "currency",
                                                    currency: "COP",
                                                    minimumFractionDigits: 0
                                                }
                                            ).format(item.precio)}
                                        </td>

                                        <td>
                                            {new Intl.NumberFormat(
                                                "es-CO",
                                                {
                                                    style: "currency",
                                                    currency: "COP",
                                                    minimumFractionDigits: 0
                                                }
                                            ).format(item.subtotal)}
                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

                <br />

                <h2>

                    Total: {

                        new Intl.NumberFormat(
                            "es-CO",
                            {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0
                            }
                        ).format(total)

                    }

                </h2>

                <button className="form-button">
                    Registrar Venta
                </button>

            </div>

        </div>
    );
}

export default Ventas;