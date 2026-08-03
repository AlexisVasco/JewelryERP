import { eliminarProducto } from "../services/productoService";

function TablaProductos({
    productos,
    editarProducto,
    productoGuardado
}) {

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar este producto?"
        );

        if (!confirmar) return;

        try {

            await eliminarProducto(id);

            productoGuardado();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="table-card">

            <h3 className="table-title">
                Productos
            </h3>

            <table className="products-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Medida</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Costo</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {productos.map((producto) => (

                        <tr key={producto.id}>

                            <td>{producto.id}</td>

                            <td>{producto.nombre}</td>

                            <td>{producto.medida}</td>

                            <td className="number-column">
                                {producto.stock}
                            </td>

                            <td className="number-column">
                                {producto.precio}
                            </td>

                            <td className="number-column">
                                {producto.costo}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        editarProducto(producto)
                                    }
                                >
                                    ✏️
                                </button>

                                {" "}

                                <button
                                    onClick={() =>
                                        eliminar(producto.id)
                                    }
                                >
                                    🗑️
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default TablaProductos;