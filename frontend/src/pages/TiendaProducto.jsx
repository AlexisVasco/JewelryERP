import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productoService";

function TiendaProducto() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        cargarProducto();
    }, [id]);

    const cargarProducto = async () => {

        try {

            const respuesta =
                await obtenerProductoPorId(id);

            setProducto(respuesta.data);

        } catch (error) {

            console.error(
                "Error cargando producto:",
                error
            );

        } finally {

            setCargando(false);

        }

    };

    const formatoMoneda = (valor) => {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0
            }
        ).format(valor || 0);

    };

    const obtenerUrlImagen = (imagen) => {

        if (!imagen) {
            return "";
        }

        if (
            imagen.startsWith("http://") ||
            imagen.startsWith("https://")
        ) {
            return imagen;
        }

        return `${import.meta.env.VITE_API_URL}${imagen}`;

    };

    const agregarAlCarrito = () => {

        if (!producto) {
            return;
        }

        if (producto.stock <= 0) {

            alert(
                "Este producto está agotado."
            );

            return;

        }

        const carritoActual =
            JSON.parse(
                localStorage.getItem(
                    "luxorshop_carrito"
                )
            ) || [];

        const productoExistente =
            carritoActual.find(
                item =>
                    item.id === producto.id
            );

        let nuevoCarrito;

        if (productoExistente) {

            const nuevaCantidad =
                productoExistente.cantidad +
                cantidad;

            if (
                nuevaCantidad >
                producto.stock
            ) {

                alert(
                    `Solo hay ${producto.stock} unidades disponibles.`
                );

                return;

            }

            nuevoCarrito =
                carritoActual.map(item => {

                    if (
                        item.id ===
                        producto.id
                    ) {

                        return {
                            ...item,
                            cantidad:
                                nuevaCantidad
                        };

                    }

                    return item;

                });

        } else {

            nuevoCarrito = [

                ...carritoActual,

                {
                    id: producto.id,
                    nombre: producto.nombre,
                    medida: producto.medida,
                    precio:
                        Number(
                            producto.precio
                        ),
                    stock: producto.stock,
                    imagen: producto.imagen,
                    cantidad: cantidad
                }

            ];

        }

        localStorage.setItem(
            "luxorshop_carrito",
            JSON.stringify(
                nuevoCarrito
            )
        );

        alert(
            "✅ Producto agregado al carrito."
        );

    };

    const comprarPorWhatsApp = () => {

        const numeroWhatsApp =
            "573044190015";

        const mensaje =
            `Hola, estoy interesado en comprar el producto ${producto.nombre}. ` +
            `Tiene un precio de ${formatoMoneda(producto.precio)}. ` +
            `¿Me pueden dar más información sobre la compra?`;

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                mensaje
            )}`;

        window.open(
            url,
            "_blank"
        );

    };

    if (cargando) {

        return (

            <div
                style={{
                    padding: "50px",
                    textAlign: "center"
                }}
            >
                Cargando producto...
            </div>

        );

    }

    if (!producto) {

        return (

            <div
                style={{
                    padding: "50px",
                    textAlign: "center"
                }}
            >
                Producto no encontrado.
            </div>

        );

    }

    const imagenProducto =
        obtenerUrlImagen(
            producto.imagen
        );

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

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center"
                    }}
                >

                    <a
                        href="/carrito"
                        style={{
                            color: "#fff",
                            textDecoration:
                                "none",
                            fontWeight: "bold"
                        }}
                    >
                        🛒 Carrito
                    </a>

                    <a
                        href="/tienda"
                        style={{
                            color: "#fff",
                            textDecoration:
                                "none"
                        }}
                    >
                        ← Volver al catálogo
                    </a>

                </div>

            </header>

            {/* PRODUCTO */}

            <section
                style={{
                    maxWidth: "1000px",
                    margin: "50px auto",
                    padding: "30px",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)",
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr",
                    gap: "40px"
                }}
            >

                {/* IMAGEN */}

                <div
                    style={{
                        height: "400px",
                        backgroundColor: "#f1f1f1",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "center",
                        overflow: "hidden"
                    }}
                >

                    {imagenProducto ? (

                        <img
                            src={imagenProducto}
                            alt={producto.nombre}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />

                    ) : (

                        <div
                            style={{
                                fontSize: "100px"
                            }}
                        >
                            💎
                        </div>

                    )}

                </div>

                {/* INFORMACIÓN */}

                <div>

                    <h1
                        style={{
                            color: "#111",
                            marginBottom: "20px"
                        }}
                    >
                        {producto.nombre}
                    </h1>

                    <p
                        style={{
                            color: "#777",
                            fontSize: "18px"
                        }}
                    >
                        Medida: {producto.medida}
                    </p>

                    <h2
                        style={{
                            color: "#111",
                            fontSize: "30px",
                            marginTop: "25px"
                        }}
                    >
                        {formatoMoneda(
                            producto.precio
                        )}
                    </h2>

                    <p
                        style={{
                            marginTop: "20px",
                            color:
                                producto.stock > 0
                                    ? "#16a34a"
                                    : "#dc2626",
                            fontWeight: "bold"
                        }}
                    >
                        {
                            producto.stock > 0
                                ? `✓ Disponible: ${producto.stock} unidad(es)`
                                : "✕ Producto agotado"
                        }
                    </p>

                    {/* CANTIDAD */}

                    {producto.stock > 0 && (

                        <div
                            style={{
                                marginTop: "25px"
                            }}
                        >

                            <label
                                style={{
                                    display: "block",
                                    marginBottom:
                                        "8px",
                                    fontWeight:
                                        "bold"
                                }}
                            >
                                Cantidad
                            </label>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: "10px"
                                }}
                            >

                                <button
                                    onClick={() =>
                                        setCantidad(
                                            Math.max(
                                                1,
                                                cantidad -
                                                    1
                                            )
                                        )
                                    }
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border:
                                            "1px solid #ddd",
                                        background:
                                            "#fff",
                                        borderRadius:
                                            "6px",
                                        cursor:
                                            "pointer",
                                        fontSize:
                                            "20px"
                                    }}
                                >
                                    −
                                </button>

                                <strong
                                    style={{
                                        minWidth:
                                            "30px",
                                        textAlign:
                                            "center",
                                        fontSize:
                                            "18px"
                                    }}
                                >
                                    {cantidad}
                                </strong>

                                <button
                                    onClick={() =>
                                        setCantidad(
                                            Math.min(
                                                producto.stock,
                                                cantidad +
                                                    1
                                            )
                                        )
                                    }
                                    disabled={
                                        cantidad >=
                                        producto.stock
                                    }
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border:
                                            "1px solid #ddd",
                                        background:
                                            "#fff",
                                        borderRadius:
                                            "6px",
                                        cursor:
                                            cantidad >=
                                            producto.stock
                                                ? "not-allowed"
                                                : "pointer",
                                        fontSize:
                                            "20px",
                                        opacity:
                                            cantidad >=
                                            producto.stock
                                                ? 0.5
                                                : 1
                                    }}
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    )}

                    {/* AGREGAR AL CARRITO */}

                    <button
                        onClick={
                            agregarAlCarrito
                        }
                        disabled={
                            producto.stock <= 0
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            marginTop: "25px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor:
                                producto.stock > 0
                                    ? "#111"
                                    : "#999",
                            color: "#fff",
                            cursor:
                                producto.stock > 0
                                    ? "pointer"
                                    : "not-allowed",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}
                    >
                        {producto.stock > 0
                            ? "🛒 Agregar al carrito"
                            : "Producto agotado"}
                    </button>

                    {/* WHATSAPP */}

                    <button
                        onClick={
                            comprarPorWhatsApp
                        }
                        disabled={
                            producto.stock <= 0
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            marginTop: "12px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor:
                                producto.stock > 0
                                    ? "#25D366"
                                    : "#999",
                            color: "#fff",
                            cursor:
                                producto.stock > 0
                                    ? "pointer"
                                    : "not-allowed",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}
                    >
                        {producto.stock > 0
                            ? "💬 Comprar directamente por WhatsApp"
                            : "Producto agotado"}
                    </button>

                    {/* IR AL CARRITO */}

                    <a
                        href="/carrito"
                        style={{
                            display: "block",
                            textAlign: "center",
                            marginTop: "15px",
                            color: "#111",
                            fontWeight: "bold",
                            textDecoration:
                                "none"
                        }}
                    >
                        🛒 Ver mi carrito
                    </a>

                </div>

            </section>

        </div>

    );

}

export default TiendaProducto;