import { useEffect, useState } from "react";
import FormularioCliente from "../components/FormularioCliente";
import TablaClientes from "../components/TablaClientes";
import { listarClientes } from "../services/clienteService";

function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [clienteEditar, setClienteEditar] = useState(null);

    const cargarClientes = async () => {
        try {
            const respuesta = await listarClientes();
            setClientes(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const clienteGuardado = () => {
        setClienteEditar(null);
        cargarClientes();
    };

    return (
        <>
            <FormularioCliente
                clienteEditar={clienteEditar}
                clienteGuardado={clienteGuardado}
            />

            <TablaClientes
                clientes={clientes}
                editarCliente={setClienteEditar}
                clienteGuardado={clienteGuardado}
            />
        </>
    );
}

export default Clientes;