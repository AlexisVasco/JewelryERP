import FormularioProducto from "../components/FormularioProducto";
import TablaProductos from "../components/TablaProductos";


function Productos({ productos, productoGuardado}){
    return (
        <>
        <FormularioProducto 
            productoGuardado={productoGuardado}
            />
        <TablaProductos 
            productos={productos}
            />
        </>
    )
}

export default Productos;