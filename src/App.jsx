import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./App.css";

import Registrar from "./pages/Registrar";
import RegistrarNuevoMedicamento from "./pages/RegistrarNuevoMedicamento";
import ListaMedicamentosRegistrados from "./pages/ListaMedicamentosRegistrados";
import Entradamedicamentos from "./pages/Entradamedicamentos";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Registrar" element={<Registrar />} />
          <Route
            path="/RegistrarNuevoMedicamento"
            element={<RegistrarNuevoMedicamento />}
          />
          <Route
            path="/ListaMedicamentosRegistrados"
            element={<ListaMedicamentosRegistrados />}
          />
          <Route
            path="/Entradamedicamentos"
            element={<Entradamedicamentos />}
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
