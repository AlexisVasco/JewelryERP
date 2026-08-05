import { useEffect, useState } from "react";
import {
    listarProveedores,
    guardarProveedor,
    actualizarProveedor,
    eliminarProveedor
} from "../services/proveedorService";

function Proveedores() {

    const [proveedores, setProveedores] = useState([]);

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    const [proveedorEditar, setProveedorEditar] = useState(null);

    useEffect(() => {
        cargarProveedores();
    }, []);

    const cargarProveedores = async () => {
        try {
            const respuesta = await listarProveedores();
            setProveedores(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setTelefono("");
        setCorreo("");
        setDireccion("");
        setProveedorEditar(null);
    };

    const guardar = async () => {

        const proveedor = {
            nombre,
            telefono,
            correo,
            direccion
        };

        try {

            if (proveedorEditar) {
                await actualizarProveedor(proveedorEditar.id, proveedor);
            } else {
                await guardarProveedor(proveedor);
            }

            limpiarFormulario();
            cargarProveedores();

        } catch (error) {
            console.error(error);
        }

    };

    const editar = (proveedor) => {

        setProveedorEditar(proveedor);

        setNombre(proveedor.nombre);
        setTelefono(proveedor.telefono);
        setCorreo(proveedor.correo);
        setDireccion(proveedor.direccion);

    };

    const eliminar = async (id) => {

        if (!window.confirm("¿Eliminar proveedor?")) return;

        try {
            await eliminarProveedor(id);
            cargarProveedores();
        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div>

            <h1>Proveedores</h1>

            <div className="table-card">

                <h3 className="table-title">

                    {proveedorEditar ? "Editar Proveedor" : "Nuevo Proveedor"}

                </h3>

                <div className="form-fields">

                    <input
                        className="form-input"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />

                    <button
                        className="form-button"
                        onClick={guardar}
                    >
                        {proveedorEditar ? "Actualizar" : "Guardar"}
                    </button>

                </div>

            </div>

            <br />

            <div className="table-card">

                <h3 className="table-title">

                    Lista de Proveedores

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

                        {

                            proveedores.map((proveedor) => (

                                <tr key={proveedor.id}>

                                    <td>{proveedor.id}</td>

                                    <td>{proveedor.nombre}</td>

                                    <td>{proveedor.telefono}</td>

                                    <td>{proveedor.correo}</td>

                                    <td>{proveedor.direccion}</td>

                                    <td>

                                        <button
                                            onClick={() => editar(proveedor)}
                                        >
                                            ✏️
                                        </button>

                                        {" "}

                                        <button
                                            onClick={() => eliminar(proveedor.id)}
                                        >
                                            🗑️
                                        </button>

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

export default Proveedores;