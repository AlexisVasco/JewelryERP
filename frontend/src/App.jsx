import { useEffect, useState } from "react";
import { listarProductos } from "./services/productoService";
import "./styles/App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Productos from "./pages/Productos";
import Inicio from "./pages/Inicio";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Usuarios from "./pages/Usuarios";
import Proveedores from "./pages/Proveedores";
import Gastos from "./pages/Gastos";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

function App() {

    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {

        cargarProductos();

        const usuarioGuardado = localStorage.getItem("usuario");

        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }

    }, []);

    const cargarProductos = async () => {

        try {

            const respuesta = await listarProductos();
            setProductos(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const productoGuardado = () => {
        cargarProductos();
    };

    if (!usuario) {
        return <Login onLogin={setUsuario} />;
    }

    return (

        <div className="app">

            <Header />

            <div className="layout">

                <Sidebar />

                <main className="main-content">

                    <Routes>

                        <Route path="/" element={<Inicio />} />

                        <Route
                            path="/productos"
                            element={
                                <Productos
                                    productos={productos}
                                    productoGuardado={productoGuardado}
                                />
                            }
                        />

                        <Route path="/ventas" element={<Ventas />} />

                        <Route path="/clientes" element={<Clientes />} />

                        <Route path="/usuarios"element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <Usuarios />
                                    </ProtectedRoute>
                                }
                            />

                        <Route path="/proveedores"element={
                        <ProtectedRoute roles={["ADMIN"]}>
                            <Proveedores />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/gastos"element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <Gastos />
                                    </ProtectedRoute>
                            }
                        />

                        <Route path="/reportes"element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <Reportes />
                                    </ProtectedRoute>
                            }
                        />

                        <Route path="/configuracion"element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <Configuracion />
                                    </ProtectedRoute>
                            }
                        />

                    </Routes>

                </main>

            </div>

        </div>

    );

}

export default App;