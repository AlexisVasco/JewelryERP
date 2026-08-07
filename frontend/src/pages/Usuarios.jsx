import { useEffect, useState } from "react";
import {
    listarUsuarios,
    actualizarUsuario
} from "../services/usuarioService";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {

        try {

            const respuesta = await listarUsuarios();
            setUsuarios(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarEstado = async (usuario) => {

        try {

            await actualizarUsuario(usuario.id, {
                ...usuario,
                activo: !usuario.activo
            });

            cargarUsuarios();

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarRol = async (usuario) => {

        try {

            await actualizarUsuario(usuario.id, {
                ...usuario,
                rol: usuario.rol === "ADMIN"
                    ? "EMPLEADO"
                    : "ADMIN"
            });

            cargarUsuarios();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <h1>Usuarios</h1>

            <div className="table-card">

                <table className="products-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            usuarios.map(usuario => (

                                <tr key={usuario.id}>

                                    <td>{usuario.id}</td>

                                    <td>{usuario.nombre}</td>

                                    <td>{usuario.usuario}</td>

                                    <td>{usuario.rol}</td>

                                    <td>
                                        {
                                            usuario.activo
                                                ? "🟢 Activo"
                                                : "🔴 Inactivo"
                                        }
                                    </td>

                                    <td>

                                        <button
                                            onClick={() => cambiarRol(usuario)}
                                        >
                                            Cambiar Rol
                                        </button>

                                        <button
                                            onClick={() => cambiarEstado(usuario)}
                                        >
                                            {
                                                usuario.activo
                                                    ? "Desactivar"
                                                    : "Activar"
                                            }
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

export default Usuarios;