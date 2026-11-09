import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistroPage } from "./pages/RegistroPage";
import { LayoutApp } from "./components/LayoutApp";
import { RutaProtegida } from "./components/RutaProtegida";
import { CursosPage } from "./pages/CursosPage";
import { CursoDetallePage } from "./pages/CursoDetallePage";
import { MisInscripcionesPage } from "./pages/MisInscripcionesPage";
import { InicioPage } from "./pages/InicioPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route element={<RutaProtegida />}>
          <Route element={<LayoutApp />}>
            <Route path="/inicio" element={<InicioPage />} />

            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/cursos/:id" element={<CursoDetallePage />} />

            <Route element={<RutaProtegida roles={["ESTUDIANTE"]} />}>
              <Route path="/inscripciones" element={<MisInscripcionesPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
