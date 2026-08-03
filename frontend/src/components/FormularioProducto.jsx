import { useState, useEffect } from "react";
import { guardarProducto, actualizarProducto } from "../services/productoService";

function FormularioProducto({ productoGuardado, productoEditar }) {

    const [nombre, setNombre] = useState("");
    const [medida, setMedida] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [costo, setCosto] = useState("");

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre);
            setMedida(productoEditar.medida);
            setStock(productoEditar.stock);
            setPrecio(productoEditar.precio);
            setCosto(productoEditar.costo);
        }
    }, [productoEditar]);

    const guardar = async () => {

        const producto = {
            nombre,
            medida,
            stock: parseInt(stock),
            precio: parseInt(precio),
            costo: parseInt(costo)
        };

        try {

            if (productoEditar) {

                await actualizarProducto(productoEditar.id, producto);

            } else {

                await guardarProducto(producto);

            }

            productoGuardado();

            setNombre("");
            setMedida("");
            setStock("");
            setPrecio("");
            setCosto("");

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="form-card">

            <h3 className="form-title">
                {productoEditar ? "Editar Producto" : "Nuevo Producto"}
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
                    placeholder="Medida"
                    value={medida}
                    onChange={(e) => setMedida(e.target.value)}
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Costo"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                />

            </div>

            <button
                className="form-button"
                onClick={guardar}
            >
                {productoEditar ? "Actualizar Producto" : "Guardar Producto"}
            </button>

        </div>
    );
}

export default FormularioProducto;