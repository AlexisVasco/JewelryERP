import { useState } from "react";
import FormularioProducto from "../components/FormularioProducto";
import TablaProductos from "../components/TablaProductos";

function Productos({ productos, productoGuardado }) {

    const [productoEditar, setProductoEditar] = useState(null);
    
    const [busqueda, setBusqueda] = useState("");
    
    const productoActualizado = () => {
        setProductoEditar(null);
        productoGuardado();

};

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <FormularioProducto
                productoGuardado={productoActualizado}
                productoEditar={productoEditar}
        />

            <input
                className="form-input"
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ marginBottom: "20px", maxWidth: "400px" }}
        />

            <TablaProductos
                productos={productosFiltrados}
                editarProducto={setProductoEditar}
                productoGuardado={productoGuardado}
        />
        </>
    );
}

export default Productos;