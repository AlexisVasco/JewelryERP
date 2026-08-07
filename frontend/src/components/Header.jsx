function Header() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const cerrarSesion = () => {

        localStorage.removeItem("usuario");

        window.location.reload();

    };

    return (

        <header className="header">

            <div className="header-brand">

                <h1>LuxorShop</h1>
                <span>ERP</span>

            </div>

            <div
                className="header-user"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                }}
            >

                <span>🔔</span>

                <span>
                    👤 {usuario?.nombre || usuario?.usuario}
                </span>

                <button
                    onClick={cerrarSesion}
                    style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Cerrar sesión
                </button>

            </div>

        </header>

    );

}

export default Header;