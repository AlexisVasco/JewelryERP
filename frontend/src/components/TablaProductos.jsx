function TablaProductos({ productos}) {
    return (
        <div className="table-card">

            <h3 className="table-title">
                Productos Registrados
            </h3>
            
    <table className="products-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Medida</th>
                <th className="number-column">Stock</th>
                <th className="number-column">Precio</th>
                <th className="number-column">Costo</th>
            </tr>
        </thead>

        <tbody>
            {productos.map((producto) => (
             <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.medida}</td>
                <td className="number-column">{producto.stock}</td>
                <td className="number-column">{producto.precio}</td>
                <td className="number-column">{producto.costo}</td>
             </tr> 
            ))}
        </tbody>
    </table>
    </div>
    );
}

export default TablaProductos;