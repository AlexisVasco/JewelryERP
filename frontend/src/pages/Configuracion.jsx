import { useEffect, useState } from "react";
import {
    obtenerConfiguracion,
    guardarConfiguracion
} from "../services/configuracionService";

function Configuracion() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const [configuracion, setConfiguracion] = useState({
        nombreNegocio: "LuxorShop ERP",
        telefono: "",
        correo: "",
        direccion: ""
    });

    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarConfiguracion();
    }, []);

    const cargarConfiguracion = async () => {

        try {

            const respuesta = await obtenerConfiguracion();

            setConfiguracion(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiarCampo = (campo, valor) => {

        setConfiguracion({
            ...configuracion,
            [campo]: valor
        });

    };

    const guardar = async () => {

        try {

            setGuardando(true);

            const respuesta = await guardarConfiguracion(
                configuracion
            );

            setConfiguracion(respuesta.data);

            alert(
                "Configuración guardada correctamente"
            );

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible guardar la configuración"
            );

        } finally {

            setGuardando(false);

        }

    };

    return (

        <div>

            <h1>Configuración</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "25px",
                    marginTop: "20px"
                }}
            >

                {/* INFORMACIÓN DEL NEGOCIO */}

                <div className="table-card">

                    <h2 className="table-title">
                        🏪 Información del negocio
                    </h2>

                    <div className="form-fields">

                        <input
                            className="form-input"
                            placeholder="Nombre del negocio"
                            value={
                                configuracion.nombreNegocio
                            }
                            onChange={(e) =>
                                cambiarCampo(
                                    "nombreNegocio",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="form-input"
                            placeholder="Teléfono"
                            value={
                                configuracion.telefono
                            }
                            onChange={(e) =>
                                cambiarCampo(
                                    "telefono",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="form-input"
                            type="email"
                            placeholder="Correo"
                            value={
                                configuracion.correo
                            }
                            onChange={(e) =>
                                cambiarCampo(
                                    "correo",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="form-input"
                            placeholder="Dirección"
                            value={
                                configuracion.direccion
                            }
                            onChange={(e) =>
                                cambiarCampo(
                                    "direccion",
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="form-button"
                            onClick={guardar}
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : "Guardar configuración"}
                        </button>

                    </div>

                </div>


                {/* MI CUENTA */}

                <div className="table-card">

                    <h2 className="table-title">
                        👤 Mi cuenta
                    </h2>

                    <div className="form-fields">

                        <div>

                            <strong>
                                Nombre
                            </strong>

                            <p>
                                {usuario?.nombre || "No disponible"}
                            </p>

                        </div>

                        <div>

                            <strong>
                                Usuario
                            </strong>

                            <p>
                                {usuario?.usuario || "No disponible"}
                            </p>

                        </div>

                        <div>

                            <strong>
                                Rol
                            </strong>

                            <p>
                                {usuario?.rol || "No disponible"}
                            </p>

                        </div>

                        <div>

                            <strong>
                                Estado
                            </strong>

                            <p>
                                {usuario?.activo
                                    ? "🟢 Activo"
                                    : "🔴 Inactivo"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Configuracion;