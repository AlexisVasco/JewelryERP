import { useEffect, useState } from "react";
import { listarClientes } from "../services/clienteService";
import { listarProductos } from "../services/productoService";
import { registrarVenta, listarVentas } from "../services/ventaService";

function Ventas() {

    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");

    const [cantidad, setCantidad] = useState(1);
    const [detalleVenta, setDetalleVenta] = useState([]);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        cargarClientes();
        cargarProductos();
        cargarVentas();
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

    const cargarVentas = async () => {

        try {

            const respuesta = await listarVentas();

            setVentas(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const agregarProducto = () => {

        if (!productoSeleccionado) {

            alert("Seleccione un producto.");

            return;

        }

        const producto = productos.find(
            p => p.id === parseInt(productoSeleccionado)
        );

        if (!producto) {

            return;

        }

        const cantidadNumerica = parseInt(cantidad);

        if (!cantidadNumerica || cantidadNumerica < 1) {

            alert("Ingrese una cantidad válida.");

            return;

        }

        if (producto.stock <= 0) {

            alert("Este producto no tiene stock disponible.");

            return;

        }

        const existe = detalleVenta.find(
            item => item.id === producto.id
        );

        const cantidadActual = existe
            ? existe.cantidad
            : 0;

        if (
            cantidadNumerica + cantidadActual >
            producto.stock
        ) {

            alert(
                `Solo hay ${producto.stock} unidades disponibles en inventario.`
            );

            return;

        }

        if (existe) {

            const nuevaLista = detalleVenta.map(item => {

                if (item.id === producto.id) {

                    const nuevaCantidad =
                        item.cantidad + cantidadNumerica;

                    return {

                        ...item,

                        cantidad: nuevaCantidad,

                        subtotal:
                            nuevaCantidad *
                            Number(item.precio)

                    };

                }

                return item;

            });

            setDetalleVenta(nuevaLista);

        } else {

            const nuevoProducto = {

                id: producto.id,

                nombre: producto.nombre,

                precio: Number(producto.precio),

                stock: producto.stock,

                cantidad: cantidadNumerica,

                subtotal:
                    Number(producto.precio) *
                    cantidadNumerica

            };

            setDetalleVenta([

                ...detalleVenta,

                nuevoProducto

            ]);

        }

        setProductoSeleccionado("");

        setCantidad(1);

    };

    const eliminarProducto = (index) => {

        const nuevaLista = detalleVenta.filter(
            (_, i) => i !== index
        );

        setDetalleVenta(nuevaLista);

    };

    const total = detalleVenta.reduce(
        (suma, item) =>
            suma + Number(item.subtotal),
        0
    );

    const guardarVenta = async () => {

        if (!clienteSeleccionado) {

            alert("Seleccione un cliente.");

            return;

        }

        if (detalleVenta.length === 0) {

            alert("Agregue al menos un producto.");

            return;

        }

        const venta = {

            clienteId:
                parseInt(clienteSeleccionado),

            productos:
                detalleVenta.map(item => ({

                    productoId: item.id,

                    cantidad: item.cantidad

                }))

        };

        try {

            await registrarVenta(venta);

            alert("Venta registrada correctamente.");

            setDetalleVenta([]);

            setClienteSeleccionado("");

            setProductoSeleccionado("");

            setCantidad(1);

            await cargarVentas();

            await cargarProductos();

        } catch (error) {

            console.error(error);

            if (
                error.response &&
                error.response.data
            ) {

                alert(error.response.data);

            } else {

                alert(
                    "Error al registrar la venta."
                );

            }

        }

    };

    const productoActual = productos.find(
        p => p.id === parseInt(productoSeleccionado)
    );

    const formatoMoneda = (valor) => {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
            }
        ).format(Number(valor) || 0);

    };

    return (

        <div>

            <h1
                style={{
                    color: "#111111",
                    marginBottom: "20px"
                }}
            >
                🛒 Ventas
            </h1>

            <div
                className="table-card"
                style={{
                    marginBottom: "20px"
                }}
            >

                <h3 className="table-title">
                    🧾 Nueva Venta
                </h3>

                <br />

                <div className="form-fields">

                    <div style={{ width: "100%" }}>

                        <label
                            style={{
                                display: "block",
                                marginBottom: "6px",
                                fontWeight: "600",
                                color: "#333"
                            }}
                        >
                            Cliente
                        </label>

                        <select
                            className="form-input"
                            value={clienteSeleccionado}
                            onChange={(e) =>
                                setClienteSeleccionado(
                                    e.target.value
                                )
                            }
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

                    </div>

                    <div style={{ width: "100%" }}>

                        <label
                            style={{
                                display: "block",
                                marginBottom: "6px",
                                fontWeight: "600",
                                color: "#333"
                            }}
                        >
                            Producto
                        </label>

                        <select
                            className="form-input"
                            value={productoSeleccionado}
                            onChange={(e) =>
                                setProductoSeleccionado(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Seleccione un producto
                            </option>

                            {productos.map((producto) => (

                                <option
                                    key={producto.id}
                                    value={producto.id}
                                    disabled={producto.stock <= 0}
                                >
                                    {producto.nombre} —{" "}
                                    {formatoMoneda(
                                        producto.precio
                                    )} — Stock:{" "}
                                    {producto.stock}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div style={{ width: "100%" }}>

                        <label
                            style={{
                                display: "block",
                                marginBottom: "6px",
                                fontWeight: "600",
                                color: "#333"
                            }}
                        >
                            Cantidad
                        </label>

                        <input
                            className="form-input"
                            type="number"
                            min="1"
                            max={
                                productoActual
                                    ? productoActual.stock
                                    : undefined
                            }
                            value={cantidad}
                            onChange={(e) =>
                                setCantidad(
                                    parseInt(
                                        e.target.value
                                    ) || 1
                                )
                            }
                        />

                    </div>

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "end"
                        }}
                    >

                        <button
                            className="form-button"
                            onClick={agregarProducto}
                            style={{
                                width: "100%"
                            }}
                        >
                            ➕ Agregar Producto
                        </button>

                    </div>

                </div>

                {productoActual && (

                    <div
                        style={{
                            marginTop: "20px",
                            padding: "15px",
                            borderRadius: "10px",
                            background: "#f5f7fb",
                            border: "1px solid #e5e7eb"
                        }}
                    >

                        <strong>
                            📦 {productoActual.nombre}
                        </strong>

                        <div
                            style={{
                                display: "flex",
                                gap: "30px",
                                marginTop: "8px",
                                flexWrap: "wrap"
                            }}
                        >

                            <span>
                                💰 Precio:{" "}
                                <strong>
                                    {formatoMoneda(
                                        productoActual.precio
                                    )}
                                </strong>
                            </span>

                            <span>
                                📦 Stock disponible:{" "}
                                <strong>
                                    {productoActual.stock}
                                </strong>
                            </span>

                        </div>

                    </div>

                )}

            </div>

            <div
                className="table-card"
                style={{
                    marginBottom: "20px"
                }}
            >

                <h3 className="table-title">
                    🛍️ Productos de la venta
                </h3>

                <br />

                <div
                    style={{
                        overflowX: "auto"
                    }}
                >

                    <table className="products-table">

                        <thead>

                            <tr>

                                <th>
                                    Producto
                                </th>

                                <th>
                                    Cantidad
                                </th>

                                <th>
                                    Precio
                                </th>

                                <th>
                                    Subtotal
                                </th>

                                <th>
                                    Acción
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {detalleVenta.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            style={{
                                                textAlign:
                                                    "center",
                                                padding:
                                                    "30px",
                                                color:
                                                    "#777"
                                            }}
                                        >
                                            🛒 Aún no hay productos
                                            agregados a esta venta.
                                        </td>

                                    </tr>

                                )

                                :

                                detalleVenta.map(
                                    (item, index) => (

                                        <tr
                                            key={index}
                                        >

                                            <td>

                                                <strong>
                                                    {item.nombre}
                                                </strong>

                                            </td>

                                            <td>
                                                {item.cantidad}
                                            </td>

                                            <td>
                                                {formatoMoneda(
                                                    item.precio
                                                )}
                                            </td>

                                            <td>
                                                <strong>
                                                    {formatoMoneda(
                                                        item.subtotal
                                                    )}
                                                </strong>
                                            </td>

                                            <td>

                                                <button
                                                    onClick={() =>
                                                        eliminarProducto(
                                                            index
                                                        )
                                                    }
                                                    style={{
                                                        border:
                                                            "none",
                                                        background:
                                                            "#fee2e2",
                                                        padding:
                                                            "8px 12px",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                    title="Eliminar producto"
                                                >
                                                    🗑️
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            }

                        </tbody>

                    </table>

                </div>

                <div
                    style={{
                        marginTop: "25px",
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <h2
                        style={{
                            margin: 0,
                            color: "#111"
                        }}
                    >
                        Total:{" "}
                        <span
                            style={{
                                color: "#2563eb"
                            }}
                        >
                            {formatoMoneda(total)}
                        </span>
                    </h2>

                    <button
                        className="form-button"
                        onClick={guardarVenta}
                        disabled={
                            detalleVenta.length === 0 ||
                            !clienteSeleccionado
                        }
                        style={{
                            minWidth: "180px",
                            opacity:
                                detalleVenta.length === 0 ||
                                !clienteSeleccionado
                                    ? 0.6
                                    : 1
                        }}
                    >
                        💾 Registrar Venta
                    </button>

                </div>

            </div>

            <div className="table-card">

                <h3 className="table-title">
                    📋 Historial de Ventas
                </h3>

                <br />

                <div
                    style={{
                        overflowX: "auto"
                    }}
                >

                    <table className="products-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Cliente
                                </th>

                                <th>
                                    Fecha
                                </th>

                                <th>
                                    Total
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {ventas.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            style={{
                                                textAlign:
                                                    "center",
                                                padding:
                                                    "30px",
                                                color:
                                                    "#777"
                                            }}
                                        >
                                            📋 No hay ventas
                                            registradas.
                                        </td>

                                    </tr>

                                )

                                :

                                ventas.map(
                                    (venta) => (

                                        <tr
                                            key={venta.id}
                                        >

                                            <td>
                                                #{venta.id}
                                            </td>

                                            <td>
                                                {venta.cliente
                                                    ? venta.cliente.nombre
                                                    : "Cliente no disponible"}
                                            </td>

                                            <td>

                                                {new Date(
                                                    venta.fecha
                                                ).toLocaleString(
                                                    "es-CO"
                                                )}

                                            </td>

                                            <td>

                                                <strong>
                                                    {formatoMoneda(
                                                        venta.total
                                                    )}
                                                </strong>

                                            </td>

                                        </tr>

                                    )
                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Ventas;