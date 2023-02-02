import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Property from "./tablas/Property";


// Funcion principal donde se inyectan los componentes
function App() {
  return (
    <>
    {/* Componente donde se renderizan los datos de la Api Rest creada en .Net Framework */}
      <Property /><br />
    </>
  );
}

export default App;
