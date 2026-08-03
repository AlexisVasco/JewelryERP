import { NavLink } from "react-router-dom";

function Sidebar(){
    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-title">LuxorShop</h2>
            </div>

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
                        className={({ isActive}) =>
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
                </ul>
            </nav>

            <div>
                <ul>
                    <li>
                        <NavLink 
                        to="/configuracion"
                        className={({ isActive }) =>
                            isActive ? "menu-link active" : "menu-link"
                    }
                    >
                        ⚙️ Configuracion
                        </NavLink>
                        </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;