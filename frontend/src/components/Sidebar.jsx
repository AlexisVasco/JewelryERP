import { Link } from "react-router-dom";

function Sidebar(){
    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-title">LuxorShop</h2>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to="/">
                        🏠 Inicio
                        </Link>
                        </li>
                    <li>
                        <Link to="/productos">
                        📦 Productos 
                        </Link>
                        </li>
                    <li>
                        <Link to="/ventas">
                        🛒 Ventas
                        </Link>
                        </li>
                    <li>
                        <Link to="/clientes">
                        👥 Clientes
                        </Link>
                        </li>
                    <li>
                        <Link to="/proveedores">
                        🚚 Proveedores
                        </Link>
                        </li>
                    <li>
                        <Link to="/gastos">
                        💰 Gastos
                        </Link>
                        </li>
                    <li>
                        <Link to="/reportes">
                        📊 Reportes
                        </Link>
                        </li>
                </ul>
            </nav>

            <div>
                <ul>
                    <li>
                        <Link to="/configuracion">
                        ⚙️ Configuracion
                        </Link>
                        </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;