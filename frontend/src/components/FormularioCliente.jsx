import { useState, useEffect } from "react";
import { guardarCliente, actualizarCliente } from "../services/clienteService";

function FormularioCliente({ clienteGuardado, clienteEditar }) {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        if (clienteEditar) {
            setNombre(clienteEditar.nombre);
            setTelefono(clienteEditar.telefono);
            setCorreo(clienteEditar.correo);
            setDireccion(clienteEditar.direccion);
        }
    }, [clienteEditar]);

    const guardar = async () => {

        const cliente = {
            nombre,
            telefono,
            correo,
            direccion
        };

        try {

            if (clienteEditar) {
                await actualizarCliente(clienteEditar.id, cliente);
            } else {
                await guardarCliente(cliente);
            }

            clienteGuardado();

            setNombre("");
            setTelefono("");
            setCorreo("");
            setDireccion("");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-card">

            <h3 className="form-title">
                {clienteEditar ? "Editar Cliente" : "Nuevo Cliente"}
            </h3>

            <div className="form-fields">

                <input
                    className="form-input"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    className="form-input"
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <input
                    className="form-input"
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <input
                    className="form-input"
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />

            </div>

            <button
                className="form-button"
                onClick={guardar}
            >
                {clienteEditar ? "Actualizar Cliente" : "Guardar Cliente"}
            </button>

        </div>
    );
}

export default FormularioCliente;