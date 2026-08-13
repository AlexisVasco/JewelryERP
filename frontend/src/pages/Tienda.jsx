import { useEffect, useState } from "react";
import axios from "axios";
import { listarProductos } from "../services/productoService";

function Tienda() {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarCompra, setMostrarCompra] = useState(false);

    const [nombreCliente, setNombreCliente] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const respuesta = await listarProductos();
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    const formatoMoneda = (valor) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(Number(valor) || 0);
    };

    const obtenerUrlImagen = (imagen) => {
        if (!imagen) return null;

        if (
            imagen.startsWith("http://") ||
            imagen.startsWith("https://")
        ) {
            return imagen;
        }

        return `http://localhost:8080${imagen}`;
    };

    const productoDestacado =
        productos.length > 0 ? productos[0] : null;

    const totalCompra = productoSeleccionado
        ? Number(productoSeleccionado.precio || 0) * cantidad
        : 0;

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto);
        setCantidad(1);
        setMostrarCompra(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const volverCatalogo = () => {
        setProductoSeleccionado(null);
        setMostrarCompra(false);
        setCantidad(1);

        setTimeout(() => {
            const coleccion =
                document.getElementById("coleccion");

            if (coleccion) {
                coleccion.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }, 50);
    };

    /*
     * ==========================================
     * CHECKOUT
     * ==========================================
     */

    if (productoSeleccionado && mostrarCompra) {
        return (
            <div style={styles.page}>
                <style>{responsiveStyles}</style>

                <header
                    style={styles.header}
                    className="luxor-header"
                >
                    <button
                        onClick={() => setMostrarCompra(false)}
                        style={styles.mobileBackButton}
                    >
                        ←
                    </button>

                    <div style={styles.logo}>
                        LUXORSHOP
                    </div>

                    <button
                        onClick={() => setMostrarCompra(false)}
                        style={styles.headerButton}
                    >
                        ← VOLVER
                    </button>
                </header>

                <main style={styles.checkoutMain}>
                    <div
                        style={styles.checkoutCard}
                        className="luxor-checkout-card"
                    >
                        <div style={styles.checkoutTitle}>
                            <span style={styles.eyebrow}>
                                LUXORSHOP
                            </span>

                            <h1 style={styles.checkoutHeading}>
                                Finaliza tu pedido
                            </h1>

                            <p style={styles.muted}>
                                Completa tus datos para solicitar
                                tu pieza.
                            </p>
                        </div>

                        <div
                            style={styles.checkoutGrid}
                            className="luxor-checkout-grid"
                        >
                            <div>
                                <label style={styles.label}>
                                    Nombre completo
                                </label>

                                <input
                                    type="text"
                                    value={nombreCliente}
                                    onChange={(e) =>
                                        setNombreCliente(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Tu nombre completo"
                                    style={styles.input}
                                />
                            </div>

                            <div>
                                <label style={styles.label}>
                                    Teléfono
                                </label>

                                <input
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) =>
                                        setTelefono(
                                            e.target.value
                                        )
                                    }
                                    placeholder="300 000 0000"
                                    style={styles.input}
                                />
                            </div>

                            <div>
                                <label style={styles.label}>
                                    Ciudad
                                </label>

                                <input
                                    type="text"
                                    value={ciudad}
                                    onChange={(e) =>
                                        setCiudad(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Medellín"
                                    style={styles.input}
                                />
                            </div>

                            <div>
                                <label style={styles.label}>
                                    Dirección
                                </label>

                                <input
                                    type="text"
                                    value={direccion}
                                    onChange={(e) =>
                                        setDireccion(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Dirección de entrega"
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        <div
                            style={styles.orderSummary}
                            className="luxor-order-summary"
                        >
                            <div
                                style={styles.orderImage}
                                className="luxor-order-image"
                            >
                                {obtenerUrlImagen(
                                    productoSeleccionado.imagen
                                ) ? (
                                    <img
                                        src={obtenerUrlImagen(
                                            productoSeleccionado.imagen
                                        )}
                                        alt={
                                            productoSeleccionado.nombre
                                        }
                                        style={styles.fullImage}
                                    />
                                ) : (
                                    <span
                                        style={
                                            styles.placeholderIcon
                                        }
                                    >
                                        💎
                                    </span>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <span
                                    style={styles.smallBrand}
                                >
                                    LUXORSHOP
                                </span>

                                <h2 style={styles.orderName}>
                                    {
                                        productoSeleccionado.nombre
                                    }
                                </h2>

                                <p style={styles.muted}>
                                    {
                                        productoSeleccionado.medida
                                    }
                                </p>

                                <div
                                    style={
                                        styles.quantityRow
                                    }
                                >
                                    <span style={styles.label}>
                                        Cantidad
                                    </span>

                                    <div
                                        style={
                                            styles.quantityBox
                                        }
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
                                            style={
                                                styles.quantityButton
                                            }
                                        >
                                            −
                                        </button>

                                        <strong>
                                            {cantidad}
                                        </strong>

                                        <button
                                            onClick={() =>
                                                setCantidad(
                                                    Math.min(
                                                        productoSeleccionado.stock,
                                                        cantidad +
                                                            1
                                                    )
                                                )
                                            }
                                            disabled={
                                                cantidad >=
                                                productoSeleccionado.stock
                                            }
                                            style={{
                                                ...styles.quantityButton,
                                                opacity:
                                                    cantidad >=
                                                    productoSeleccionado.stock
                                                        ? 0.4
                                                        : 1
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <strong style={styles.orderPrice}>
                                {formatoMoneda(totalCompra)}
                            </strong>
                        </div>

                        <div style={styles.totalRow}>
                            <span>Total del pedido</span>

                            <strong>
                                {formatoMoneda(totalCompra)}
                            </strong>
                        </div>

                        <button
                            onClick={async () => {
                                if (!nombreCliente.trim()) {
                                    alert(
                                        "Por favor ingresa tu nombre."
                                    );
                                    return;
                                }

                                if (!telefono.trim()) {
                                    alert(
                                        "Por favor ingresa tu teléfono."
                                    );
                                    return;
                                }

                                if (!ciudad.trim()) {
                                    alert(
                                        "Por favor ingresa tu ciudad."
                                    );
                                    return;
                                }

                                if (!direccion.trim()) {
                                    alert(
                                        "Por favor ingresa tu dirección."
                                    );
                                    return;
                                }

                                if (
                                    cantidad >
                                    productoSeleccionado.stock
                                ) {
                                    alert(
                                        "La cantidad seleccionada supera el stock disponible."
                                    );
                                    return;
                                }

                                try {
                                    const clienteRespuesta =
                                        await axios.post(
                                            "http://localhost:8080/clientes",
                                            {
                                                nombre:
                                                    nombreCliente.trim(),
                                                telefono:
                                                    telefono.trim(),
                                                correo: "",
                                                direccion: `${ciudad.trim()} - ${direccion.trim()}`
                                            }
                                        );

                                    const clienteId =
                                        clienteRespuesta.data.id;

                                    await axios.post(
                                        "http://localhost:8080/ventas",
                                        {
                                            clienteId,
                                            productos: [
                                                {
                                                    productoId:
                                                        productoSeleccionado.id,
                                                    cantidad
                                                }
                                            ]
                                        }
                                    );

                                    alert(
                                        "¡Pedido registrado correctamente! Gracias por tu compra."
                                    );

                                    setProductos(
                                        (
                                            productosActuales
                                        ) =>
                                            productosActuales.map(
                                                (
                                                    producto
                                                ) =>
                                                    producto.id ===
                                                    productoSeleccionado.id
                                                        ? {
                                                            ...producto,
                                                            stock:
                                                                producto.stock -
                                                                cantidad
                                                        }
                                                        : producto
                                            )
                                    );

                                    setProductoSeleccionado(
                                        null
                                    );
                                    setMostrarCompra(false);
                                    setNombreCliente("");
                                    setTelefono("");
                                    setCiudad("");
                                    setDireccion("");
                                    setCantidad(1);

                                    window.scrollTo({
                                        top: 0,
                                        behavior:
                                            "smooth"
                                    });
                                } catch (error) {
                                    console.error(
                                        "Error registrando pedido:",
                                        error
                                    );

                                    const mensaje =
                                        error.response
                                            ?.data
                                            ?.message ||
                                        "No fue posible registrar el pedido. Intenta nuevamente.";

                                    alert(mensaje);
                                }
                            }}
                            style={styles.primaryButton}
                        >
                            CONFIRMAR PEDIDO
                        </button>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    /*
     * ==========================================
     * DETALLE DEL PRODUCTO
     * ==========================================
     */

    if (productoSeleccionado) {
        const imagenProducto =
            obtenerUrlImagen(
                productoSeleccionado.imagen
            );

        return (
            <div style={styles.page}>
                <style>{responsiveStyles}</style>

                <header
                    style={styles.header}
                    className="luxor-header"
                >
                    <div style={styles.logo}>
                        LUXORSHOP
                    </div>

                    <nav style={styles.nav}>
                        <button
                            onClick={volverCatalogo}
                            style={styles.headerButton}
                        >
                            CATÁLOGO
                        </button>
                    </nav>
                </header>

                <main
                    style={styles.productMain}
                    className="luxor-product-main"
                >
                    <button
                        onClick={volverCatalogo}
                        style={styles.backButton}
                    >
                        ← Volver al catálogo
                    </button>

                    <div
                        style={styles.productDetail}
                        className="luxor-product-detail"
                    >
                        <div
                            style={styles.productDetailImage}
                            className="luxor-product-image"
                        >
                            {imagenProducto ? (
                                <img
                                    src={imagenProducto}
                                    alt={
                                        productoSeleccionado.nombre
                                    }
                                    style={styles.fullImage}
                                />
                            ) : (
                                <div
                                    style={
                                        styles.noImageLarge
                                    }
                                >
                                    💎
                                </div>
                            )}
                        </div>

                        <div style={styles.productInformation}>
                            <span style={styles.eyebrow}>
                                LUXORSHOP JEWELRY
                            </span>

                            <h1
                                style={styles.productTitle}
                                className="luxor-product-title"
                            >
                                {
                                    productoSeleccionado.nombre
                                }
                            </h1>

                            <p style={styles.productMeasure}>
                                Medida:
                                <strong>
                                    {" "}
                                    {
                                        productoSeleccionado.medida
                                    }
                                </strong>
                            </p>

                            <div style={styles.productPrice}>
                                {formatoMoneda(
                                    productoSeleccionado.precio
                                )}
                            </div>

                            <div
                                style={styles.separator}
                            />

                            <h3
                                style={
                                    styles.descriptionTitle
                                }
                            >
                                DESCRIPCIÓN
                            </h3>

                            <p
                                style={styles.description}
                            >
                                Descubre esta hermosa pieza
                                de nuestra colección
                                LuxorShop, seleccionada
                                para acompañar momentos
                                únicos y especiales.
                            </p>

                            <div
                                style={styles.stockLine}
                            >
                                <span>
                                    Disponibilidad
                                </span>

                                <strong
                                    style={{
                                        color:
                                            productoSeleccionado.stock >
                                            0
                                                ? "#26734d"
                                                : "#b42318"
                                    }}
                                >
                                    {productoSeleccionado.stock >
                                    0
                                        ? `Disponible · ${productoSeleccionado.stock} unidad(es)`
                                        : "Agotado"}
                                </strong>
                            </div>

                            {productoSeleccionado.stock >
                                0 && (
                                <div
                                    style={
                                        styles.buyBox
                                    }
                                >
                                    <div>
                                        <span
                                            style={
                                                styles.label
                                            }
                                        >
                                            CANTIDAD
                                        </span>

                                        <div
                                            style={
                                                styles.quantityBox
                                            }
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
                                                style={
                                                    styles.quantityButton
                                                }
                                            >
                                                −
                                            </button>

                                            <strong>
                                                {
                                                    cantidad
                                                }
                                            </strong>

                                            <button
                                                onClick={() =>
                                                    setCantidad(
                                                        Math.min(
                                                            productoSeleccionado.stock,
                                                            cantidad +
                                                                1
                                                        )
                                                    )
                                                }
                                                disabled={
                                                    cantidad >=
                                                    productoSeleccionado.stock
                                                }
                                                style={{
                                                    ...styles.quantityButton,
                                                    opacity:
                                                        cantidad >=
                                                        productoSeleccionado.stock
                                                            ? 0.4
                                                            : 1
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setMostrarCompra(
                                                true
                                            );

                                            window.scrollTo(
                                                {
                                                    top: 0,
                                                    behavior:
                                                        "smooth"
                                                }
                                            );
                                        }}
                                        style={
                                            styles.primaryButton
                                        }
                                    >
                                        COMPRAR AHORA
                                    </button>
                                </div>
                            )}

                            <div
                                style={
                                    styles.advisorBox
                                }
                            >
                                <span
                                    style={{
                                        fontSize: "22px"
                                    }}
                                >
                                    💬
                                </span>

                                <div>
                                    <strong>
                                        ¿Tienes alguna
                                        pregunta?
                                    </strong>

                                    <p
                                        style={
                                            styles.muted
                                        }
                                    >
                                        Habla con un
                                        asesor de
                                        LuxorShop.
                                    </p>
                                </div>

                                <a
                                    href="https://wa.me/573044190015"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={
                                        styles.whatsappLink
                                    }
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </main>

                <section
                    style={styles.legacySection}
                    className="luxor-legacy"
                >
                    <div
                        style={
                            styles.legacyContent
                        }
                    >
                        <span style={styles.eyebrow}>
                            NUESTRO LEGADO
                        </span>

                        <h2
                            style={
                                styles.legacyTitle
                            }
                        >
                            Joyas que nunca pasan
                            de moda.
                        </h2>

                        <p
                            style={
                                styles.legacyText
                            }
                        >
                            En LuxorShop creemos que
                            una joya es mucho más que
                            un accesorio. Es una pieza
                            que acompaña momentos,
                            historias y recuerdos que
                            permanecen.
                        </p>
                    </div>

                    <div
                        style={{
                            minHeight: "400px",
                            overflow: "hidden"
                        }}
                    >
                        {imagenProducto ? (
                            <img
                                src={imagenProducto}
                                alt=""
                                style={styles.fullImage}
                            />
                        ) : (
                            <div
                                style={
                                    styles.noImageLarge
                                }
                            >
                                💎
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

    /*
     * ==========================================
     * CATÁLOGO
     * ==========================================
     */

    return (
        <div style={styles.page}>
            <style>{responsiveStyles}</style>

            <header
                style={styles.header}
                className="luxor-header"
            >
                <div style={styles.logo}>
                    LUXORSHOP
                </div>

                <nav style={styles.nav}>
                    <a
                        href="/tienda"
                        style={styles.navLink}
                    >
                        INICIO
                    </a>

                    <a
                        href="#coleccion"
                        style={styles.navLink}
                    >
                        COLECCIÓN
                    </a>

                    <a
                        href="#nosotros"
                        style={styles.navLink}
                    >
                        NOSOTROS
                    </a>

                    <a
                        href="#contacto"
                        style={styles.navLink}
                    >
                        CONTACTO
                    </a>
                </nav>
            </header>

            {/* HERO */}

            <section
                style={{
                    ...styles.hero,
                    backgroundImage:
                        "url('/hero.jpg')"
                }}
                className="luxor-hero"
            >
                <div style={styles.heroOverlay} />

                <div
                    style={styles.heroContent}
                    className="luxor-hero-content"
                >
                    <span style={styles.heroEyebrow}>
                        LUXORSHOP · JOYERÍA
                    </span>

                    <h1
                        style={styles.heroTitle}
                        className="luxor-hero-title"
                    >
                        Una joya.
                        <br />
                        Una historia.
                        <br />
                        Un momento.
                    </h1>

                    <p style={styles.heroText}>
                        Piezas seleccionadas para
                        acompañar los momentos que
                        quieres recordar para siempre.
                    </p>

                    <a
                        href="#coleccion"
                        style={styles.heroButton}
                    >
                        DESCUBRIR COLECCIÓN
                    </a>
                </div>
            </section>

            {/* BENEFICIOS */}

            <section
                style={styles.benefits}
                className="luxor-benefits"
            >
                <Benefit
                    icon="✦"
                    title="ATENCIÓN PERSONALIZADA"
                    text="Estamos para ayudarte."
                />

                <Benefit
                    icon="◇"
                    title="CALIDAD"
                    text="Piezas seleccionadas."
                />

                <Benefit
                    icon="♢"
                    title="ENVÍOS"
                    text="Envíos a toda Colombia."
                />

                <Benefit
                    icon="♡"
                    title="COMPRA SEGURA"
                    text="Tu pedido está en buenas manos."
                />
            </section>

            {/* PRESENTACIÓN */}

            <section style={styles.introduction}>
                <span style={styles.eyebrow}>
                    NUESTRA COLECCIÓN
                </span>

                <h2
                    style={styles.sectionTitle}
                    className="luxor-section-title"
                >
                    Encuentra esa pieza especial
                </h2>

                <p style={styles.sectionText}>
                    Una selección cuidadosamente
                    elegida para quienes buscan
                    elegancia, calidad y piezas que
                    puedan convertirse en parte de su
                    historia.
                </p>
            </section>

            {/* COLECCIÓN */}

            <section
                id="coleccion"
                style={styles.collection}
                className="luxor-collection"
            >
                <div
                    style={styles.collectionHeader}
                    className="luxor-collection-header"
                >
                    <div>
                        <span style={styles.eyebrow}>
                            LUXORSHOP
                        </span>

                        <h2
                            style={
                                styles.collectionTitle
                            }
                        >
                            Nuestra selección
                        </h2>
                    </div>

                    <span
                        style={styles.productCount}
                    >
                        {productos.length} pieza
                        {productos.length !== 1
                            ? "s"
                            : ""}
                    </span>
                </div>

                {productos.length === 0 ? (
                    <div style={styles.empty}>
                        No hay productos disponibles.
                    </div>
                ) : (
                    <div
                        style={{
                            ...styles.productGrid,
                            gridTemplateColumns:
                                productos.length === 1
                                    ? "minmax(280px,520px)"
                                    : "repeat(2,minmax(280px,520px))"
                        }}
                        className="luxor-product-grid"
                    >
                        {productos.map((producto) => {
                            const imagen =
                                obtenerUrlImagen(
                                    producto.imagen
                                );

                            return (
                                <article
                                    key={producto.id}
                                    style={styles.card}
                                    className="luxor-card"
                                >
                                    <div
                                        style={
                                            styles.cardImage
                                        }
                                        className="luxor-card-image"
                                    >
                                        {imagen ? (
                                            <img
                                                src={
                                                    imagen
                                                }
                                                alt={
                                                    producto.nombre
                                                }
                                                style={
                                                    styles.fullImage
                                                }
                                            />
                                        ) : (
                                            <div
                                                style={
                                                    styles.noImage
                                                }
                                            >
                                                💎
                                            </div>
                                        )}

                                        {producto.stock <=
                                            3 &&
                                            producto.stock >
                                                0 && (
                                                <span
                                                    style={
                                                        styles.lastUnit
                                                    }
                                                >
                                                    ÚLTIMAS
                                                    UNIDADES
                                                </span>
                                            )}

                                        {producto.stock ===
                                            0 && (
                                            <span
                                                style={
                                                    styles.soldOut
                                                }
                                            >
                                                AGOTADO
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        style={
                                            styles.cardContent
                                        }
                                    >
                                        <span
                                            style={
                                                styles.cardBrand
                                            }
                                        >
                                            LUXORSHOP
                                        </span>

                                        <h3
                                            style={
                                                styles.cardTitle
                                            }
                                        >
                                            {
                                                producto.nombre
                                            }
                                        </h3>

                                        <p
                                            style={
                                                styles.cardMeasure
                                            }
                                        >
                                            {
                                                producto.medida
                                            }
                                        </p>

                                        <div
                                            style={
                                                styles.cardBottom
                                            }
                                        >
                                            <strong
                                                style={
                                                    styles.cardPrice
                                                }
                                            >
                                                {formatoMoneda(
                                                    producto.precio
                                                )}
                                            </strong>

                                            <span
                                                style={{
                                                    color:
                                                        producto.stock >
                                                        0
                                                            ? "#26734d"
                                                            : "#b42318",
                                                    fontSize:
                                                        "12px",
                                                    fontWeight:
                                                        "500"
                                                }}
                                            >
                                                {producto.stock >
                                                0
                                                    ? "Disponible"
                                                    : "Agotado"}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                seleccionarProducto(
                                                    producto
                                                )
                                            }
                                            style={
                                                styles.cardButton
                                            }
                                        >
                                            VER PRODUCTO
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* BANNER */}

            <section style={styles.banner}>
                <div style={styles.bannerOverlay} />

                <div
                    style={styles.bannerContent}
                >
                    <span
                        style={styles.heroEyebrow}
                    >
                        LUXORSHOP
                    </span>

                    <h2>
                        El detalle perfecto
                        <br />
                        para un momento especial.
                    </h2>

                    <p>
                        Regala una pieza que pueda
                        conservarse para siempre.
                    </p>

                    <a
                        href="#coleccion"
                        style={styles.heroButton}
                    >
                        VER COLECCIÓN
                    </a>
                </div>
            </section>

            {/* NOSOTROS */}

            <section
                id="nosotros"
                style={styles.about}
                className="luxor-about"
            >
                <div style={styles.aboutText}>
                    <span style={styles.eyebrow}>
                        SOBRE LUXORSHOP
                    </span>

                    <h2
                        style={styles.aboutTitle}
                    >
                        El brillo de una
                        <br />
                        historia única.
                    </h2>

                    <p
                        style={
                            styles.aboutParagraph
                        }
                    >
                        Cada pieza representa algo
                        diferente: amor, celebración,
                        compromiso o simplemente el
                        deseo de regalar algo especial.
                    </p>

                    <p
                        style={
                            styles.aboutParagraph
                        }
                    >
                        En LuxorShop buscamos que la
                        experiencia de elegir una joya
                        sea tan especial como el momento
                        para el que fue elegida.
                    </p>
                </div>

                <div
                    style={styles.aboutImage}
                >
                    {productoDestacado &&
                    obtenerUrlImagen(
                        productoDestacado.imagen
                    ) ? (
                        <img
                            src={obtenerUrlImagen(
                                productoDestacado.imagen
                            )}
                            alt=""
                            style={styles.fullImage}
                        />
                    ) : (
                        <div
                            style={
                                styles.noImageLarge
                            }
                        >
                            💎
                        </div>
                    )}
                </div>
            </section>

            {/* CONTACTO */}

            <section
                id="contacto"
                style={styles.contact}
            >
                <span style={styles.eyebrow}>
                    ¿TIENES ALGUNA PREGUNTA?
                </span>

                <h2
                    style={styles.contactTitle}
                >
                    Estamos para ayudarte.
                </h2>

                <p style={styles.sectionText}>
                    Habla directamente con nosotros
                    y recibe atención personalizada
                    para elegir tu pieza.
                </p>

                <a
                    href="https://wa.me/573044190015"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.whatsappButton}
                >
                    💬 HABLAR CON UN ASESOR
                </a>
            </section>

            <Footer />
        </div>
    );
}

/*
 * ==========================================
 * COMPONENTES
 * ==========================================
 */

function Benefit({ icon, title, text }) {
    return (
        <div style={styles.benefit}>
            <div style={styles.benefitIcon}>
                {icon}
            </div>

            <strong
                style={styles.benefitTitle}
            >
                {title}
            </strong>

            <span style={styles.benefitText}>
                {text}
            </span>
        </div>
    );
}

function Footer() {
    return (
        <footer
            id="footer"
            style={styles.footer}
        >
            <div
                style={styles.footerGrid}
                className="luxor-footer-grid"
            >
                <div>
                    <div
                        style={
                            styles.footerLogo
                        }
                    >
                        LUXORSHOP
                    </div>

                    <p
                        style={
                            styles.footerDescription
                        }
                    >
                        Joyas que representan momentos
                        únicos. Piezas elegidas para
                        permanecer en el tiempo.
                    </p>
                </div>

                <div>
                    <h4
                        style={
                            styles.footerHeading
                        }
                    >
                        EXPLORA
                    </h4>

                    <a
                        href="#coleccion"
                        style={styles.footerLink}
                    >
                        Colección
                    </a>

                    <a
                        href="#nosotros"
                        style={styles.footerLink}
                    >
                        Nosotros
                    </a>

                    <a
                        href="#contacto"
                        style={styles.footerLink}
                    >
                        Contacto
                    </a>
                </div>

                <div>
                    <h4
                        style={
                            styles.footerHeading
                        }
                    >
                        CONTACTO
                    </h4>

                    <p
                        style={
                            styles.footerContact
                        }
                    >
                        Medellín, Colombia
                        <br />
                        WhatsApp
                        <br />
                        +57 304 419 0015
                    </p>
                </div>
            </div>

            <div
                style={styles.footerBottom}
            >
                © 2026 LuxorShop · Joyas que nunca
                pasan de moda.
            </div>
        </footer>
    );
}

/*
 * ==========================================
 * ESTILOS
 * ==========================================
 */

const styles = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#111",
        fontFamily:
            "'Helvetica Neue', Arial, sans-serif"
    },

    header: {
        height: "82px",
        padding: "0 55px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e8e8e8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 20
    },

    mobileBackButton: {
        display: "none",
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer"
    },

    logo: {
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "5px"
    },

    nav: {
        display: "flex",
        alignItems: "center",
        gap: "32px"
    },

    navLink: {
        color: "#111",
        textDecoration: "none",
        fontSize: "12px",
        letterSpacing: "2px",
        transition: "opacity .2s ease"
    },

    headerButton: {
        background: "none",
        border: "none",
        color: "#111",
        cursor: "pointer",
        fontSize: "12px",
        letterSpacing: "2px"
    },

    hero: {
        minHeight: "700px",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
    },

    heroOverlay: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(90deg,rgba(0,0,0,.76),rgba(0,0,0,.34),rgba(0,0,0,.08))"
    },

    heroContent: {
        position: "relative",
        zIndex: 2,
        color: "#fff",
        maxWidth: "650px",
        padding: "60px"
    },

    heroEyebrow: {
        display: "block",
        fontSize: "11px",
        letterSpacing: "4px",
        marginBottom: "25px"
    },

    heroTitle: {
        margin: 0,
        fontSize: "68px",
        lineHeight: "1.02",
        fontWeight: "400",
        letterSpacing: "-2px"
    },

    heroText: {
        maxWidth: "500px",
        marginTop: "25px",
        fontSize: "17px",
        lineHeight: "1.8",
        color: "#eee"
    },

    heroButton: {
        display: "inline-block",
        marginTop: "25px",
        padding: "16px 30px",
        backgroundColor: "#fff",
        color: "#111",
        textDecoration: "none",
        fontSize: "11px",
        letterSpacing: "2px",
        fontWeight: "600",
        transition:
            "transform .2s ease, background .2s ease"
    },

    benefits: {
        display: "grid",
        gridTemplateColumns:
            "repeat(4,1fr)",
        borderBottom: "1px solid #eee"
    },

    benefit: {
        padding: "42px 20px",
        textAlign: "center",
        borderRight: "1px solid #eee"
    },

    benefitIcon: {
        fontSize: "25px",
        marginBottom: "12px"
    },

    benefitTitle: {
        display: "block",
        fontSize: "11px",
        letterSpacing: "1.5px",
        marginBottom: "8px"
    },

    benefitText: {
        color: "#777",
        fontSize: "12px"
    },

    introduction: {
        padding: "105px 25px 75px",
        textAlign: "center",
        backgroundColor: "#fafafa"
    },

    eyebrow: {
        display: "block",
        fontSize: "11px",
        letterSpacing: "4px",
        color: "#777",
        marginBottom: "20px"
    },

    sectionTitle: {
        fontSize: "43px",
        fontWeight: "400",
        margin: "0 auto 20px"
    },

    sectionText: {
        maxWidth: "650px",
        margin: "0 auto",
        color: "#777",
        fontSize: "15px",
        lineHeight: "1.8"
    },

    collection: {
        padding: "20px 45px 110px",
        backgroundColor: "#fafafa"
    },

    collectionHeader: {
        maxWidth: "1100px",
        margin: "0 auto 35px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end"
    },

    collectionTitle: {
        margin: 0,
        fontSize: "38px",
        fontWeight: "400"
    },

    productCount: {
        color: "#777",
        fontSize: "12px"
    },

    productGrid: {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        justifyContent: "center",
        gap: "35px"
    },

    card: {
        backgroundColor: "#fff",
        overflow: "hidden",
        boxShadow:
            "0 4px 25px rgba(0,0,0,.06)",
        border: "1px solid #f0f0f0"
    },

    cardImage: {
        height: "500px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f1f1f1"
    },

    fullImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    },

    noImage: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "90px",
        color: "#aaa"
    },

    noImageLarge: {
        width: "100%",
        height: "100%",
        minHeight: "400px",
        backgroundColor: "#f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "100px"
    },

    lastUnit: {
        position: "absolute",
        top: "18px",
        left: "18px",
        backgroundColor: "#111",
        color: "#fff",
        padding: "8px 12px",
        fontSize: "9px",
        letterSpacing: "1.5px"
    },

    soldOut: {
        position: "absolute",
        top: "18px",
        left: "18px",
        backgroundColor: "#b42318",
        color: "#fff",
        padding: "8px 12px",
        fontSize: "9px",
        letterSpacing: "1.5px"
    },

    cardContent: {
        padding: "28px"
    },

    cardBrand: {
        display: "block",
        color: "#999",
        fontSize: "10px",
        letterSpacing: "3px",
        marginBottom: "10px"
    },

    cardTitle: {
        margin: "0 0 8px",
        fontSize: "23px",
        fontWeight: "400"
    },

    cardMeasure: {
        color: "#777",
        fontSize: "13px",
        margin: 0
    },

    cardBottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "25px"
    },

    cardPrice: {
        fontSize: "21px",
        fontWeight: "500"
    },

    cardButton: {
        width: "100%",
        marginTop: "25px",
        padding: "15px",
        border: "1px solid #111",
        backgroundColor: "#111",
        color: "#fff",
        cursor: "pointer",
        fontSize: "11px",
        letterSpacing: "2px",
        transition:
            "background .2s ease, color .2s ease"
    },

    banner: {
        minHeight: "520px",
        position: "relative",
        backgroundImage:
            "linear-gradient(120deg,#171717,#555)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff"
    },

    bannerOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,.38)"
    },

    bannerContent: {
        position: "relative",
        zIndex: 2,
        padding: "40px"
    },

    about: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "550px"
    },

    aboutText: {
        padding: "80px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },

    aboutTitle: {
        fontSize: "48px",
        lineHeight: "1.1",
        fontWeight: "400",
        margin: "0 0 25px"
    },

    aboutParagraph: {
        maxWidth: "520px",
        color: "#666",
        lineHeight: "1.9",
        fontSize: "15px"
    },

    aboutImage: {
        minHeight: "550px",
        overflow: "hidden",
        backgroundColor: "#eee"
    },

    contact: {
        padding: "100px 25px",
        textAlign: "center",
        backgroundColor: "#fafafa"
    },

    contactTitle: {
        fontSize: "43px",
        fontWeight: "400",
        margin: "0 0 20px"
    },

    whatsappButton: {
        display: "inline-block",
        marginTop: "30px",
        padding: "16px 30px",
        backgroundColor: "#111",
        color: "#fff",
        textDecoration: "none",
        fontSize: "11px",
        letterSpacing: "2px"
    },

    footer: {
        backgroundColor: "#111",
        color: "#fff",
        padding: "70px 50px 25px"
    },

    footerGrid: {
        maxWidth: "1100px",
        margin: "0 auto 60px",
        display: "grid",
        gridTemplateColumns:
            "2fr 1fr 1fr",
        gap: "50px"
    },

    footerLogo: {
        fontSize: "24px",
        letterSpacing: "5px",
        fontWeight: "600",
        marginBottom: "20px"
    },

    footerDescription: {
        color: "#999",
        maxWidth: "380px",
        lineHeight: "1.8",
        fontSize: "14px"
    },

    footerHeading: {
        fontSize: "11px",
        letterSpacing: "2px",
        marginBottom: "20px"
    },

    footerLink: {
        display: "block",
        color: "#999",
        textDecoration: "none",
        fontSize: "14px",
        marginBottom: "12px"
    },

    footerContact: {
        color: "#999",
        lineHeight: "1.9",
        fontSize: "14px"
    },

    footerBottom: {
        borderTop: "1px solid #333",
        paddingTop: "25px",
        textAlign: "center",
        color: "#666",
        fontSize: "12px"
    },

    checkoutMain: {
        minHeight:
            "calc(100vh - 82px)",
        padding: "70px 25px",
        backgroundColor: "#f7f7f5"
    },

    checkoutCard: {
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "50px",
        boxShadow:
            "0 5px 30px rgba(0,0,0,.06)"
    },

    checkoutTitle: {
        marginBottom: "35px"
    },

    checkoutHeading: {
        fontSize: "42px",
        fontWeight: "400",
        margin: 0
    },

    muted: {
        color: "#777",
        lineHeight: "1.7"
    },

    checkoutGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
        gap: "20px"
    },

    label: {
        display: "block",
        fontSize: "11px",
        letterSpacing: "1.5px",
        marginBottom: "8px",
        color: "#444"
    },

    input: {
        width: "100%",
        padding: "14px",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: "14px",
        boxSizing: "border-box",
        transition:
            "border .2s ease, box-shadow .2s ease"
    },

    orderSummary: {
        marginTop: "35px",
        padding: "25px",
        backgroundColor: "#f8f8f6",
        display: "flex",
        alignItems: "center",
        gap: "20px"
    },

    orderImage: {
        width: "100px",
        height: "100px",
        backgroundColor: "#eee",
        flexShrink: 0,
        overflow: "hidden"
    },

    placeholderIcon: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px"
    },

    smallBrand: {
        fontSize: "9px",
        letterSpacing: "2px",
        color: "#999"
    },

    orderName: {
        margin: "6px 0",
        fontWeight: "400",
        fontSize: "19px"
    },

    quantityRow: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginTop: "15px"
    },

    quantityBox: {
        display: "flex",
        alignItems: "center",
        gap: "14px"
    },

    quantityButton: {
        width: "34px",
        height: "34px",
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        cursor: "pointer",
        fontSize: "18px"
    },

    orderPrice: {
        fontSize: "18px",
        marginLeft: "auto"
    },

    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 0",
        marginTop: "20px",
        borderTop: "1px solid #ddd",
        fontSize: "21px"
    },

    primaryButton: {
        width: "100%",
        padding: "17px",
        marginTop: "20px",
        border: "none",
        backgroundColor: "#111",
        color: "#fff",
        cursor: "pointer",
        fontSize: "11px",
        letterSpacing: "2px",
        fontWeight: "600"
    },

    productMain: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "50px 35px 100px"
    },

    backButton: {
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: 0,
        marginBottom: "30px",
        fontSize: "12px",
        letterSpacing: "1px"
    },

    productDetail: {
        display: "grid",
        gridTemplateColumns:
            "minmax(300px,1fr) minmax(300px,1fr)",
        gap: "70px",
        alignItems: "start"
    },

    productDetailImage: {
        height: "650px",
        overflow: "hidden",
        backgroundColor: "#f1f1f1"
    },

    productInformation: {
        paddingTop: "30px"
    },

    productTitle: {
        fontSize: "48px",
        lineHeight: "1.1",
        fontWeight: "400",
        margin: "0 0 20px"
    },

    productMeasure: {
        color: "#666",
        fontSize: "15px"
    },

    productPrice: {
        fontSize: "30px",
        marginTop: "25px",
        fontWeight: "500"
    },

    separator: {
        height: "1px",
        backgroundColor: "#ddd",
        margin: "30px 0"
    },

    descriptionTitle: {
        fontSize: "11px",
        letterSpacing: "2px"
    },

    description: {
        color: "#666",
        lineHeight: "1.8",
        fontSize: "15px"
    },

    stockLine: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
        padding: "18px 0",
        marginTop: "25px",
        fontSize: "13px"
    },

    buyBox: {
        marginTop: "25px"
    },

    advisorBox: {
        marginTop: "25px",
        padding: "18px",
        border: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        gap: "15px"
    },

    whatsappLink: {
        marginLeft: "auto",
        color: "#111",
        fontSize: "12px",
        fontWeight: "600"
    },

    legacySection: {
        display: "grid",
        gridTemplateColumns:
            "1fr 1fr",
        backgroundColor: "#111",
        color: "#fff"
    },

    legacyContent: {
        padding: "80px"
    },

    legacyTitle: {
        fontSize: "45px",
        lineHeight: "1.1",
        fontWeight: "400"
    },

    legacyText: {
        maxWidth: "520px",
        color: "#aaa",
        lineHeight: "1.9"
    },

    empty: {
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "60px",
        textAlign: "center",
        color: "#777",
        backgroundColor: "#fff",
        border: "1px solid #eee"
    }
};

const responsiveStyles = `
* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    overflow-x: hidden;
}

button,
a,
input {
    -webkit-tap-highlight-color: transparent;
}

.luxor-card {
    transition:
        transform .3s ease,
        box-shadow .3s ease;
}

.luxor-card:hover {
    transform: translateY(-6px);
    box-shadow:
        0 18px 45px rgba(0,0,0,.12) !important;
}

.luxor-card img {
    transition: transform .5s ease;
}

.luxor-card:hover img {
    transform: scale(1.04);
}

.luxor-card button:hover {
    background: #fff !important;
    color: #111 !important;
}

.luxor-header a:hover {
    opacity: .55;
}

.luxor-header button:hover {
    opacity: .55;
}

.luxor-hero a:hover {
    transform: translateY(-2px);
}

input:focus {
    border-color: #111 !important;
    box-shadow: 0 0 0 2px rgba(0,0,0,.05);
}

@media (max-width: 850px) {

    .luxor-card {
        max-width: 520px;
        width: 100%;
        margin: 0 auto;
    }

}

@media (max-width: 768px) {

    .luxor-header {
        height: auto !important;
        min-height: 72px;
        padding: 18px 20px !important;
        flex-direction: column;
        gap: 18px;
    }

    .luxor-header nav {
        gap: 14px !important;
        flex-wrap: wrap;
        justify-content: center;
    }

    .luxor-header a,
    .luxor-header button {
        font-size: 10px !important;
    }

    .luxor-hero {
        min-height: 620px !important;
        background-position: center !important;
    }

    .luxor-hero-content {
        padding: 35px 25px !important;
    }

    .luxor-hero-title {
        font-size: 47px !important;
    }

    .luxor-hero p {
        font-size: 15px !important;
    }

    .luxor-benefits {
        grid-template-columns: 1fr 1fr !important;
    }

    .luxor-benefits > div {
        border-bottom: 1px solid #eee;
    }

    .luxor-collection-header {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 15px;
    }

    .luxor-about {
        grid-template-columns: 1fr !important;
    }

    .luxor-about > div:first-child {
        padding: 60px 25px !important;
    }

    .luxor-product-detail {
        grid-template-columns: 1fr !important;
        gap: 35px !important;
    }

    .luxor-product-image {
        height: 550px !important;
    }

    .luxor-legacy {
        grid-template-columns: 1fr !important;
    }

    .luxor-legacy > div:first-child {
        padding: 60px 25px !important;
    }

}

@media (max-width: 600px) {

    .luxor-header {
        flex-direction: column;
    }

    .luxor-benefits {
        grid-template-columns: 1fr !important;
    }

    .luxor-benefits > div {
        border-right: none !important;
    }

    .luxor-product-grid {
        grid-template-columns: 1fr !important;
    }

    .luxor-card-image {
        height: 400px !important;
    }

    .luxor-checkout-grid {
        grid-template-columns: 1fr !important;
    }

    .luxor-checkout-card {
        padding: 28px 20px !important;
    }

    .luxor-checkout-card h1 {
        font-size: 34px !important;
    }

    .luxor-order-summary {
        flex-direction: column !important;
        align-items: flex-start !important;
    }

    .luxor-order-image {
        width: 100% !important;
        height: 250px !important;
    }

    .luxor-order-summary > div:last-child {
        margin-left: 0 !important;
    }

    .luxor-footer-grid {
        grid-template-columns: 1fr !important;
        gap: 35px !important;
    }

    .luxor-product-main {
        padding: 35px 20px 70px !important;
    }

    .luxor-product-image {
        height: 430px !important;
    }

    .luxor-product-title {
        font-size: 38px !important;
    }

    .luxor-section-title {
        font-size: 34px !important;
    }

    .luxor-collection {
        padding-left: 20px !important;
        padding-right: 20px !important;
    }

    .luxor-about h2 {
        font-size: 39px !important;
    }

    .luxor-about p {
        font-size: 14px !important;
    }

    .luxor-legacy > div:first-child {
        padding: 55px 25px !important;
    }

    .luxor-legacy h2 {
        font-size: 38px !important;
    }

    .luxor-hero-title {
        font-size: 39px !important;
    }

    .luxor-hero {
        min-height: 580px !important;
    }

}

@media (max-width: 480px) {

    .luxor-header {
        padding: 16px 15px !important;
    }

    .luxor-header .logo {
        font-size: 20px !important;
    }

    .luxor-hero-title {
        font-size: 34px !important;
        letter-spacing: -1px !important;
    }

    .luxor-hero-content {
        padding: 30px 20px !important;
    }

    .luxor-hero p {
        font-size: 14px !important;
        line-height: 1.7 !important;
    }

    .luxor-hero a {
        width: 100%;
        text-align: center;
    }

    .luxor-card-image {
        height: 350px !important;
    }

    .luxor-card-content {
        padding: 22px !important;
    }

    .luxor-product-image {
        height: 370px !important;
    }

    .luxor-product-title {
        font-size: 34px !important;
    }

    .luxor-product-detail {
        gap: 25px !important;
    }

    .luxor-advisor {
        flex-wrap: wrap !important;
    }

    .luxor-advisor a {
        width: 100%;
        margin-left: 0 !important;
        text-align: center;
        padding: 12px;
        border: 1px solid #ddd;
    }

    .luxor-checkout-card {
        padding: 25px 18px !important;
    }

    .luxor-checkout-card h1 {
        font-size: 30px !important;
    }

    .luxor-order-summary {
        padding: 18px !important;
    }

    .luxor-order-image {
        height: 220px !important;
    }

    .luxor-collection {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }

    .luxor-collection h2 {
        font-size: 31px !important;
    }

    .luxor-about h2 {
        font-size: 34px !important;
    }

    .luxor-legacy h2 {
        font-size: 34px !important;
    }

    .luxor-contact {
        padding: 70px 20px !important;
    }

}
`;

export default Tienda;