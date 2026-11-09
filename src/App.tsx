import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistroPage } from "./pages/RegistroPage";
import { LayoutApp } from "./components/LayoutApp";
import { RutaProtegida } from "./components/RutaProtegida";
import { useAuthStore } from "./store/useAuthStore";
import { CursosPage } from "./pages/CursosPage";
import { CursoDetallePage } from "./pages/CursoDetallePage";

function InicioTemporal() {
  const usuario = useAuthStore((state) => state.usuario);

  return (
    <>
      <h1 className="text-3xl font-semibold">Hola, {usuario?.nombre}</h1>
      <p className="mt-2 text-on-surface-variant">
        Bienvenido a NorthStar Academy.
      </p>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route element={<RutaProtegida />}>
          <Route element={<LayoutApp />}>
            <Route path="/inicio" element={<InicioTemporal />} />

            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/cursos/:id" element={<CursoDetallePage />} />

            <Route element={<RutaProtegida roles={["ESTUDIANTE"]} />}>
              <Route
                path="/inscripciones"
                element={
                  <h1 className="text-3xl font-semibold">Mis inscripciones</h1>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
