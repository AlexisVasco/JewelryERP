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

    if (!productoSeleccionado) return;

    const producto = productos.find(
        p => p.id === parseInt(productoSeleccionado)
    );

    if (!producto) return;

    const existe = detalleVenta.find(
        item => item.id === producto.id
    );

    const cantidadActual = existe ? existe.cantidad : 0;

    if (cantidad + cantidadActual > producto.stock) {

        alert(
            `Solo hay ${producto.stock} unidades disponibles en inventario.`
        );

        return;

    }

    if (existe) {

        const nuevaLista = detalleVenta.map(item => {

            if (item.id === producto.id) {

                const nuevaCantidad = item.cantidad + cantidad;

                return {
                    ...item,
                    cantidad: nuevaCantidad,
                    subtotal: nuevaCantidad * item.precio
                };

            }

            return item;

        });

        setDetalleVenta(nuevaLista);

    } else {

        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad,
            subtotal: producto.precio * cantidad
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
        (suma, item) => suma + item.subtotal,
        0
    );

    const guardarVenta = async () => {

    if (!clienteSeleccionado) {
        alert("Seleccione un cliente");
        return;
    }

    if (detalleVenta.length === 0) {
        alert("Agregue al menos un producto");
        return;
    }

    const venta = {
        clienteId: parseInt(clienteSeleccionado),
        productos: detalleVenta.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad
        }))
    };

    try {

        await registrarVenta(venta);

        alert("Venta registrada correctamente");

        setDetalleVenta([]);
        setClienteSeleccionado("");
        setProductoSeleccionado("");
        setCantidad(1);
        cargarVentas();

        cargarProductos();

    } catch (error) {

        console.error(error);

        alert("Error al registrar la venta");

    }

};

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
                     <th>Acción</th>
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
                                        <td>

                                        <button
                                            onClick={() => eliminarProducto(index)}
                                            >
                                            🗑️
                                        </button>

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

                <button
                    className="form-button"
                    onClick={guardarVenta}
                >
                    Registrar Venta
                    
                </button>

            </div>

            <div className="table-card">

    <h3 className="table-title">
        Historial de Ventas
    </h3>

    <table className="products-table">

        <thead>

            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
            </tr>

        </thead>

        <tbody>

            {
                ventas.length === 0 ?

                (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                            No hay ventas registradas
                        </td>
                    </tr>
                )

                :

                ventas.map((venta) => (

                    <tr key={venta.id}>

                        <td>{venta.id}</td>

                        <td>{venta.cliente.nombre}</td>

                        <td>
                            {new Date(venta.fecha).toLocaleString("es-CO")}
                        </td>

                        <td>
                            {new Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0
                            }).format(venta.total)}
                        </td>

                    </tr>

                ))
            }

        </tbody>

    </table>

</div>

        </div>
    );
}

export default Ventas;