import { useEffect, useState } from "react";
import axios from "axios";

function Carrito() {

    const [carrito, setCarrito] = useState([]);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("Medellín");
    const [procesando, setProcesando] = useState(false);

    useEffect(() => {
        cargarCarrito();
    }, []);

    const cargarCarrito = () => {

        const carritoGuardado =
            JSON.parse(
                localStorage.getItem("luxorshop_carrito")
            ) || [];

        setCarrito(carritoGuardado);

    };

    const actualizarCarrito = (nuevoCarrito) => {

        localStorage.setItem(
            "luxorshop_carrito",
            JSON.stringify(nuevoCarrito)
        );

        setCarrito(nuevoCarrito);

    };

    const cambiarCantidad = (id, cantidad) => {

        const nuevoCarrito = carrito.map((producto) => {

            if (producto.id === id) {

                const nuevaCantidad =
                    Math.max(
                        1,
                        Math.min(
                            cantidad,
                            producto.stock
                        )
                    );

                return {
                    ...producto,
                    cantidad: nuevaCantidad
                };

            }

            return producto;

        });

        actualizarCarrito(nuevoCarrito);

    };

    const eliminarProducto = (id) => {

        const nuevoCarrito =
            carrito.filter(
                producto => producto.id !== id
            );

        actualizarCarrito(nuevoCarrito);

    };

    const formatoMoneda = (valor) => {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
            }
        ).format(Number(valor) || 0);

    };

    const total = carrito.reduce(
        (suma, producto) =>
            suma +
            Number(producto.precio) *
            producto.cantidad,
        0
    );

    const confirmarPedido = async () => {

        if (!nombre.trim()) {
            alert("Ingrese su nombre completo.");
            return;
        }

        if (!telefono.trim()) {
            alert("Ingrese su teléfono.");
            return;
        }

        if (!direccion.trim()) {
            alert("Ingrese su dirección.");
            return;
        }

        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        setProcesando(true);

        try {

            // CREAR CLIENTE

            const clienteRespuesta =
                await axios.post(
                    "http://localhost:8080/clientes",
                    {
                        nombre,
                        telefono,
                        correo,
                        direccion:
                            `${direccion}, ${ciudad}`
                    }
                );

            const clienteId =
                clienteRespuesta.data.id;

            // CREAR VENTA

            await axios.post(
                "http://localhost:8080/ventas",
                {
                    clienteId,
                    productos:
                        carrito.map(producto => ({
                            productoId:
                                producto.id,
                            cantidad:
                                producto.cantidad
                        }))
                }
            );

            const mensajeProductos =
                carrito
                    .map(
                        producto =>
                            `• ${producto.nombre} x${producto.cantidad} - ${formatoMoneda(
                                producto.precio *
                                producto.cantidad
                            )}`
                    )
                    .join("\n");

            const mensaje =
                `Hola, soy ${nombre}. Acabo de realizar un pedido en LuxorShop.\n\n` +
                `${mensajeProductos}\n\n` +
                `Total: ${formatoMoneda(total)}\n` +
                `Teléfono: ${telefono}\n` +
                `Ciudad: ${ciudad}\n` +
                `Dirección: ${direccion}`;

            const numeroWhatsApp =
                "573044190015";

            const url =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                    mensaje
                )}`;

            localStorage.removeItem(
                "luxorshop_carrito"
            );

            setCarrito([]);

            alert(
                "¡Pedido registrado correctamente!"
            );

            window.open(
                url,
                "_blank"
            );

        } catch (error) {

            console.error(
                "Error registrando pedido:",
                error
            );

            if (
                error.response &&
                error.response.data
            ) {

                alert(
                    typeof error.response.data ===
                    "string"
                        ? error.response.data
                        : "No fue posible registrar el pedido."
                );

            } else {

                alert(
                    "No fue posible registrar el pedido."
                );

            }

        } finally {

            setProcesando(false);

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f8f8"
            }}
        >

            {/* HEADER */}

            <header
                style={{
                    backgroundColor: "#111",
                    color: "#fff",
                    padding: "20px 40px",
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        letterSpacing: "2px"
                    }}
                >
                    LUXORSHOP
                </h1>

                <a
                    href="/tienda"
                    style={{
                        color: "#fff",
                        textDecoration: "none"
                    }}
                >
                    ← Seguir comprando
                </a>

            </header>


            {/* CONTENIDO */}

            <main
                style={{
                    maxWidth: "1100px",
                    margin: "40px auto",
                    padding: "20px"
                }}
            >

                <h1
                    style={{
                        color: "#111"
                    }}
                >
                    🛒 Mi carrito
                </h1>


                {carrito.length === 0 ? (

                    <div
                        style={{
                            background: "#fff",
                            padding: "50px",
                            borderRadius: "12px",
                            textAlign: "center",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2>
                            Tu carrito está vacío
                        </h2>

                        <p
                            style={{
                                color: "#777"
                            }}
                        >
                            Agrega productos desde
                            nuestro catálogo.
                        </p>

                        <a
                            href="/tienda"
                            style={{
                                display:
                                    "inline-block",
                                marginTop: "20px",
                                padding:
                                    "14px 25px",
                                background:
                                    "#111",
                                color: "#fff",
                                borderRadius:
                                    "8px",
                                textDecoration:
                                    "none"
                            }}
                        >
                            Ver catálogo
                        </a>

                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1.4fr 1fr",
                            gap: "25px"
                        }}
                    >

                        {/* PRODUCTOS */}

                        <div>

                            {carrito.map(
                                (producto) => (

                                    <div
                                        key={
                                            producto.id
                                        }
                                        style={{
                                            background:
                                                "#fff",
                                            padding:
                                                "20px",
                                            borderRadius:
                                                "12px",
                                            marginBottom:
                                                "15px",
                                            display:
                                                "flex",
                                            gap:
                                                "20px",
                                            alignItems:
                                                "center",
                                            boxShadow:
                                                "0 4px 15px rgba(0,0,0,0.06)"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width:
                                                    "110px",
                                                height:
                                                    "110px",
                                                borderRadius:
                                                    "10px",
                                                overflow:
                                                    "hidden",
                                                background:
                                                    "#f1f1f1",
                                                flexShrink:
                                                    0
                                            }}
                                        >

                                            {producto.imagen ? (

                                                <img
                                                    src={
                                                        `http://localhost:8080${producto.imagen}`
                                                    }
                                                    alt={
                                                        producto.nombre
                                                    }
                                                    style={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        objectFit:
                                                            "cover"
                                                    }}
                                                />

                                            ) : (

                                                <div
                                                    style={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        fontSize:
                                                            "45px"
                                                    }}
                                                >
                                                    💎
                                                </div>

                                            )}

                                        </div>


                                        <div
                                            style={{
                                                flex: 1
                                            }}
                                        >

                                            <h3
                                                style={{
                                                    margin:
                                                        "0 0 8px"
                                                }}
                                            >
                                                {
                                                    producto.nombre
                                                }
                                            </h3>

                                            <p
                                                style={{
                                                    color:
                                                        "#777"
                                                }}
                                            >
                                                {formatoMoneda(
                                                    producto.precio
                                                )}
                                            </p>


                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap:
                                                        "10px"
                                                }}
                                            >

                                                <button
                                                    onClick={() =>
                                                        cambiarCantidad(
                                                            producto.id,
                                                            producto.cantidad -
                                                                1
                                                        )
                                                    }
                                                    style={{
                                                        width:
                                                            "32px",
                                                        height:
                                                            "32px",
                                                        border:
                                                            "1px solid #ddd",
                                                        background:
                                                            "#fff",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                >
                                                    −
                                                </button>

                                                <strong>
                                                    {
                                                        producto.cantidad
                                                    }
                                                </strong>

                                                <button
                                                    onClick={() =>
                                                        cambiarCantidad(
                                                            producto.id,
                                                            producto.cantidad +
                                                                1
                                                        )
                                                    }
                                                    disabled={
                                                        producto.cantidad >=
                                                        producto.stock
                                                    }
                                                    style={{
                                                        width:
                                                            "32px",
                                                        height:
                                                            "32px",
                                                        border:
                                                            "1px solid #ddd",
                                                        background:
                                                            "#fff",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>


                                        <div
                                            style={{
                                                textAlign:
                                                    "right"
                                            }}
                                        >

                                            <strong
                                                style={{
                                                    fontSize:
                                                        "18px"
                                                }}
                                            >
                                                {formatoMoneda(
                                                    producto.precio *
                                                    producto.cantidad
                                                )}
                                            </strong>

                                            <br />

                                            <button
                                                onClick={() =>
                                                    eliminarProducto(
                                                        producto.id
                                                    )
                                                }
                                                style={{
                                                    marginTop:
                                                        "15px",
                                                    border:
                                                        "none",
                                                    background:
                                                        "#fee2e2",
                                                    padding:
                                                        "7px 10px",
                                                    borderRadius:
                                                        "6px",
                                                    cursor:
                                                        "pointer"
                                                }}
                                            >
                                                🗑️
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        {/* FORMULARIO */}

                        <div
                            style={{
                                background:
                                    "#fff",
                                padding:
                                    "25px",
                                borderRadius:
                                    "12px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.08)",
                                height:
                                    "fit-content"
                            }}
                        >

                            <h2>
                                Realizar pedido
                            </h2>

                            <p
                                style={{
                                    color:
                                        "#777"
                                }}
                            >
                                Completa tus datos
                                para realizar tu
                                pedido.
                            </p>


                            <input
                                placeholder="Nombre completo"
                                value={nombre}
                                onChange={e =>
                                    setNombre(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "12px",
                                    marginTop:
                                        "15px",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <input
                                placeholder="Teléfono"
                                value={telefono}
                                onChange={e =>
                                    setTelefono(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "12px",
                                    marginTop:
                                        "10px",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <input
                                placeholder="Correo electrónico (opcional)"
                                value={correo}
                                onChange={e =>
                                    setCorreo(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "12px",
                                    marginTop:
                                        "10px",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <input
                                placeholder="Ciudad"
                                value={ciudad}
                                onChange={e =>
                                    setCiudad(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "12px",
                                    marginTop:
                                        "10px",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <input
                                placeholder="Dirección de entrega"
                                value={direccion}
                                onChange={e =>
                                    setDireccion(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "12px",
                                    marginTop:
                                        "10px",
                                    boxSizing:
                                        "border-box"
                                }}
                            />


                            <hr
                                style={{
                                    margin:
                                        "25px 0"
                                }}
                            />

                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    fontSize:
                                        "20px"
                                }}
                            >

                                <strong>
                                    Total
                                </strong>

                                <strong>
                                    {formatoMoneda(
                                        total
                                    )}
                                </strong>

                            </div>


                            <button
                                onClick={
                                    confirmarPedido
                                }
                                disabled={
                                    procesando
                                }
                                style={{
                                    width:
                                        "100%",
                                    padding:
                                        "15px",
                                    marginTop:
                                        "25px",
                                    border:
                                        "none",
                                    borderRadius:
                                        "8px",
                                    background:
                                        procesando
                                            ? "#999"
                                            : "#111",
                                    color:
                                        "#fff",
                                    fontSize:
                                        "16px",
                                    fontWeight:
                                        "bold",
                                    cursor:
                                        procesando
                                            ? "not-allowed"
                                            : "pointer"
                                }}
                            >
                                {procesando
                                    ? "Procesando..."
                                    : "✅ Confirmar pedido"}
                            </button>

                        </div>

                    </div>

                )}

            </main>


            {/* FOOTER */}

            <footer
                style={{
                    marginTop: "50px",
                    padding: "30px",
                    background:
                        "#111",
                    color:
                        "#fff",
                    textAlign:
                        "center"
                }}
            >
                © 2026 LuxorShop
                <br />
                Joyas que nunca pasan de moda.
            </footer>

        </div>

    );

}

export default Carrito;