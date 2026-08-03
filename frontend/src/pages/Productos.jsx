import { useState } from "react";

import FormularioProducto from "../components/FormularioProducto";
import TablaProductos from "../components/TablaProductos";

function Productos({ productos, productoGuardado }) {

    const [productoEditar, setProductoEditar] = useState(null);

const productoActualizado = () => {
    setProductoEditar(null);
    productoGuardado();
};

    return (
        <>
            <FormularioProducto
                productoGuardado={productoActualizado}
                productoEditar={productoEditar}
        />

            <TablaProductos
                productos={productos}
                editarProducto={setProductoEditar}
                productoGuardado={productoGuardado}
/>
        </>
    );
}

export default Productos;