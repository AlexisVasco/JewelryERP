import { useState, useEffect } from "react";
import {
    guardarProducto,
    actualizarProducto
} from "../services/productoService";

function FormularioProducto({
    productoGuardado,
    productoEditar
}) {

    const [nombre, setNombre] = useState("");
    const [medida, setMedida] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [costo, setCosto] = useState("");

    const [imagen, setImagen] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState("");

    useEffect(() => {

        if (productoEditar) {

            setNombre(productoEditar.nombre || "");
            setMedida(productoEditar.medida || "");
            setStock(productoEditar.stock ?? "");
            setPrecio(productoEditar.precio ?? "");
            setCosto(productoEditar.costo ?? "");

            setImagen(null);

            if (productoEditar.imagen) {

                setVistaPrevia(
                    `http://localhost:8080${productoEditar.imagen}`
                );

            } else {

                setVistaPrevia("");

            }

        } else {

            limpiarFormulario();

        }

    }, [productoEditar]);

    const seleccionarImagen = (e) => {

        const archivo = e.target.files[0];

        if (!archivo) {
            return;
        }

        setImagen(archivo);

        setVistaPrevia(
            URL.createObjectURL(archivo)
        );

    };

    const limpiarFormulario = () => {

        setNombre("");
        setMedida("");
        setStock("");
        setPrecio("");
        setCosto("");

        setImagen(null);
        setVistaPrevia("");

    };

    const guardar = async () => {

        if (!nombre || !medida || !stock || !precio || !costo) {

            alert("Complete todos los campos");

            return;
        }

        try {

            const producto = {
                nombre,
                medida,
                stock: parseInt(stock),
                precio: parseInt(precio),
                costo: parseInt(costo)
            };

            const formData = new FormData();

            formData.append(
                "producto",
                new Blob(
                    [JSON.stringify(producto)],
                    {
                        type: "application/json"
                    }
                )
            );

            if (imagen) {

                formData.append(
                    "imagen",
                    imagen
                );

            }

            if (productoEditar) {

                await actualizarProducto(
                    productoEditar.id,
                    formData
                );

            } else {

                await guardarProducto(
                    formData
                );

            }

            limpiarFormulario();

            productoGuardado();

        } catch (error) {

            console.error(
                "Error guardando producto:",
                error
            );

            alert(
                "No se pudo guardar el producto."
            );

        }

    };

    return (

        <div className="form-card">

            <h3 className="form-title">

                {
                    productoEditar
                        ? "Editar Producto"
                        : "Nuevo Producto"
                }

            </h3>

            <div className="form-fields">

                <input
                    className="form-input"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                />

                <input
                    className="form-input"
                    type="text"
                    placeholder="Medida"
                    value={medida}
                    onChange={(e) =>
                        setMedida(e.target.value)
                    }
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) =>
                        setPrecio(e.target.value)
                    }
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Costo"
                    value={costo}
                    onChange={(e) =>
                        setCosto(e.target.value)
                    }
                />

                <input
                    className="form-input"
                    type="file"
                    accept="image/*"
                    onChange={seleccionarImagen}
                />

                {
                    vistaPrevia && (

                        <div
                            style={{
                                marginTop: "15px",
                                textAlign: "center"
                            }}
                        >

                            <p
                                style={{
                                    marginBottom: "10px",
                                    color: "#666"
                                }}
                            >
                                Vista previa
                            </p>

                            <img
                                src={vistaPrevia}
                                alt="Vista previa del producto"
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd"
                                }}
                            />

                        </div>

                    )
                }

            </div>

            <button
                className="form-button"
                onClick={guardar}
            >
                {
                    productoEditar
                        ? "Actualizar Producto"
                        : "Guardar Producto"
                }
            </button>

        </div>

    );

}

export default FormularioProducto;