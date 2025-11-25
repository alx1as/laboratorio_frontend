import { Link } from "react-router-dom";
import { useAuth } from "../contexto/AuthContexto";
import { useState } from "react";
import "./BarraNavegacion.css";

export default function BarraNavegacion() {
  const { usuario, logout } = useAuth();
  const [abierto, setAbierto] = useState(false);

  function toggleMenu() {
    setAbierto(!abierto);
  }

  return (
    <nav className="nav">
      <div className="nav-izquierda">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-linea1">Laboratorio</span>
          <span className="nav-logo-linea2">de poemas</span>
        </Link>
      </div>

      {/* MENÚ DESKTOP */}
      <div className="nav-derecha">
        {!usuario && (
          <>
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/login" className="nav-link">Entrar</Link>
          </>
        )}

        {usuario && (
          <>
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/crear" className="nav-link">Escribir</Link>
            <Link to="/intervenir" className="nav-link">Intervenir</Link>
            <Link to="/cadaver" className="nav-link">Cadáver</Link>
            <span className="nav-logout" onClick={logout}>Salir</span>
          </>
        )}
      </div>

      {/* BOTÓN HAMBURGUESA */}
      <div className="nav-hamburguesa" onClick={toggleMenu}>
        <div className={`bar ${abierto ? "open" : ""}`}></div>
        <div className={`bar ${abierto ? "open" : ""}`}></div>
        <div className={`bar ${abierto ? "open" : ""}`}></div>
      </div>

      {/* MENÚ MOBILE */}
      <div className={`nav-mobile ${abierto ? "mostrar" : ""}`}>
        {!usuario && (
          <>
            <Link to="/" onClick={toggleMenu}>Inicio</Link>
            <Link to="/login" onClick={toggleMenu}>Entrar</Link>
          </>
        )}

        {usuario && (
          <>
            <Link to="/" onClick={toggleMenu}>Inicio</Link>
            <Link to="/crear" onClick={toggleMenu}>Escribir</Link>
            <Link to="/intervenir" onClick={toggleMenu}>Intervenir</Link>
            <Link to="/cadaver" onClick={toggleMenu}>Cadáver</Link>
            <span onClick={() => { logout(); toggleMenu(); }}>Salir</span>
          </>
        )}
      </div>
    </nav>
  );
}
