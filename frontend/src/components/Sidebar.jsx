import { NavLink } from "react-router-dom";

function Sidebar() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const esAdmin = usuario?.rol === "ADMIN";

    return (

        <aside className="sidebar">

            <h2>LuxorShop</h2>

            <nav>

                <ul>

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            🏠 Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/productos"
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            📦 Productos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/ventas"
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            🛒 Ventas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/clientes"
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            👥 Clientes
                        </NavLink>
                    </li>

                    {esAdmin && (
                        <li>
                            <NavLink
                                to="/usuarios"
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                👤 Usuarios
                            </NavLink>
                        </li>
                    )}

                    {esAdmin && (
                        <li>
                            <NavLink
                                to="/proveedores"
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                🚚 Proveedores
                            </NavLink>
                        </li>
                    )}

                    {esAdmin && (
                        <li>
                            <NavLink
                                to="/gastos"
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                💰 Gastos
                            </NavLink>
                        </li>
                    )}

                    {esAdmin && (
                        <li>
                            <NavLink
                                to="/reportes"
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                📊 Reportes
                            </NavLink>
                        </li>
                    )}

                </ul>

            </nav>

            {esAdmin && (
                <div>

                    <ul>

                        <li>
                            <NavLink
                                to="/configuracion"
                                className={({ isActive }) =>
                                    isActive ? "menu-link active" : "menu-link"
                                }
                            >
                                ⚙️ Configuración
                            </NavLink>
                        </li>

                    </ul>

                </div>
            )}

        </aside>

    );

}

export default Sidebar;