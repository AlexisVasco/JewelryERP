function Sidebar(){
    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-title">LuxorShop</h2>
            </div>

            <nav>
                <ul>
                    <li>🏠 Inicio</li>
                    <li>📦 Productos</li>
                    <li>🛒 Ventas</li>
                    <li>👥 Clientes</li>
                    <li>🚚 Proveedores</li>
                    <li>💰 Gastos</li>
                    <li>📊 Reportes</li>
                </ul>
            </nav>

            <div>
                <ul>
                    <li>⚙️ Configuracion</li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;