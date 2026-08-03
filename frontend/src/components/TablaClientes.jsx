import { eliminarCliente } from "../services/clienteService";

function TablaClientes({
    clientes,
    editarCliente,
    clienteGuardado
}) {

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar este cliente?"
        );

        if (!confirmar) return;

        try {

            await eliminarCliente(id);

            clienteGuardado();

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="table-card">

            <h3 className="table-title">
                Clientes
            </h3>

            <table className="products-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {clientes.map((cliente) => (

                        <tr key={cliente.id}>

                            <td>{cliente.id}</td>

                            <td>{cliente.nombre}</td>

                            <td>{cliente.telefono}</td>

                            <td>{cliente.correo}</td>

                            <td>{cliente.direccion}</td>

                            <td>

                                <button
                                    onClick={() => editarCliente(cliente)}
                                >
                                    ✏️
                                </button>

                                {" "}

                                <button
                                    onClick={() => eliminar(cliente.id)}
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

export default TablaClientes;