import {useEffect, useState} from "react";
import { listarProductos} from "./services/productoService";
import "./styles/App.css";
import TablaProductos from "./components/TablaProductos";
import FormularioProducto from "./components/FormularioProducto";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
        <FormularioProducto
          productoGuardado={productoGuardado}
        />

        <TablaProductos
          productos={productos}
        />
      </main>
    </div>
  </div>
);
}

export default App;