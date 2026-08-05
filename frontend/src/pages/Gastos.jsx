import { useEffect, useState } from "react";
import {
    listarGastos,
    guardarGasto,
    actualizarGasto,
    eliminarGasto
} from "../services/gastoService";

function Gastos() {

    const [gastos, setGastos] = useState([]);

    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        cargarGastos();
    }, []);

    const cargarGastos = async () => {
        try {
            const respuesta = await listarGastos();
            setGastos(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const limpiarFormulario = () => {
        setDescripcion("");
        setCategoria("");
        setValor("");
        setFecha("");
        setEditandoId(null);
    };

    const guardar = async () => {

        if (
            !descripcion ||
            !categoria ||
            !valor ||
            !fecha
        ) {
            alert("Complete todos los campos");
            return;
        }

        const gasto = {
            descripcion,
            categoria,
            valor: parseFloat(valor),
            fecha
        };

        try {

            if (editandoId) {
                await actualizarGasto(editandoId, gasto);
            } else {
                await guardarGasto(gasto);
            }

            limpiarFormulario();
            cargarGastos();

        } catch (error) {
            console.error(error);
        }

    };

    const editar = (gasto) => {

        setDescripcion(gasto.descripcion);
        setCategoria(gasto.categoria);
        setValor(gasto.valor);
        setFecha(gasto.fecha);

        setEditandoId(gasto.id);

    };

    const eliminar = async (id) => {

        if (!window.confirm("¿Eliminar gasto?")) return;

        try {

            await eliminarGasto(id);
            cargarGastos();

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div>

            <h1>Gastos</h1>

            <div className="table-card">

                <h2 className="table-title">
                    Nuevo Gasto
                </h2>

                <div className="form-fields">

                    <input
                        className="form-input"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <input
                        className="form-input"
                        placeholder="Categoría"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />

                    <input
                        className="form-input"
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />

                    <input
                        className="form-input"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />

                    <button
                        className="form-button"
                        onClick={guardar}
                    >
                        {editandoId ? "Actualizar" : "Guardar"}
                    </button>

                </div>

            </div>

            <br />

            <div className="table-card">

                <h2 className="table-title">
                    Lista de Gastos
                </h2>

                <table className="products-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Valor</th>
                            <th>Fecha</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            gastos.map((gasto) => (

                                <tr key={gasto.id}>

                                    <td>{gasto.id}</td>

                                    <td>{gasto.descripcion}</td>

                                    <td>{gasto.categoria}</td>

                                    <td>

                                        {
                                            new Intl.NumberFormat(
                                                "es-CO",
                                                {
                                                    style: "currency",
                                                    currency: "COP",
                                                    minimumFractionDigits: 0
                                                }
                                            ).format(gasto.valor)
                                        }

                                    </td>

                                    <td>{gasto.fecha}</td>

                                    <td>

                                        <button
                                            onClick={() => editar(gasto)}
                                        >
                                            📝
                                        </button>

                                        <button
                                            onClick={() => eliminar(gasto.id)}
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

export default Gastos;