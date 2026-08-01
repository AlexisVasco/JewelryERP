import {useEffect, useState} from "react";
import { listarProductos} from "./services/productoService";
import "./styles/App.css";
import TablaProductos from "./components/TablaProductos";
import FormularioProducto from "./components/FormularioProducto";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Productos from "./pages/Productos";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Proveedores from "./pages/Proveedores";
import Gastos from "./pages/Gastos";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

function App(){
  const [productos, setProductos]= useState([]);

  useEffect(() =>{
    cargarProductos();
  }, []);
  
  const cargarProductos = async () =>{
    try {
      const respuesta = await listarProductos();
      setProductos(respuesta.data);
    } catch (error){
      console.error(error);
    }
  };

  const productoGuardado = () => {
    cargarProductos();
  };

  return (
  <div className="app">
    <Header />

    <div className="layout">
      <Sidebar />

      <main className="main-content">

        <Routes>

          <Route
          path="/"
          element={<Inicio />}
            />
          
          <Route
          path="productos"
          element={
            <Productos 
              productos={productos}
              productoGuardado={productoGuardado}
        />
          }
          />

          <Route path="/ventas" element={<Ventas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/configuracion" element={<Configuracion />} />

        </Routes>
    
</main>
    </div>
  </div>
);
}

export default App;