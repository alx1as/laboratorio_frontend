import { useState } from "react";
import { useCadaveres } from "../contexto/CadaveresContexto";
import { useAuth } from "../contexto/AuthContexto";
import "./CadaverExquisito.css";

export default function CadaverExquisito() {
  const { usuario } = useAuth();
  const {
    abiertos,
    seleccionado,
    cargarCadaver,
    crearNuevo,
    agregarVerso,
    finalizar
  } = useCadaveres();

  const [texto, setTexto] = useState("");

  if (!seleccionado && abiertos.length > 0) {
    cargarCadaver(abiertos[0].id);
    return <div className="cargando">Cargando…</div>;
  }

  if (!seleccionado && abiertos.length === 0) {
    return (
      <div className="cadaver-contenedor">
        <h1 className="titulo">CADÁVER EXQUISITO</h1>
        <button
          className="btn-iniciar"
          onClick={() => crearNuevo(usuario?.nombre || "Anónima")}
        >
          Iniciar nuevo cadáver
        </button>
      </div>
    );
  }

  const ronda = seleccionado;
  const versos = ronda.versos || [];
  const ultima = versos.at(-1);
  const pista = ultima ? ultima.texto.trim().split(/\s+/).at(-1) : null;

  // Última participante
const ultimaParticipante = ultima?.autor || "—";

// Lista de participantes únicos
const participantes = [...new Set(versos.map(v => v.autor))];


  const handleAgregar = () => {
    if (!texto.trim()) return;
    agregarVerso(ronda.id, texto.trim(), usuario?.nombre || "Anónima");
    setTexto("");
  };

  const handleFinalizar = () => finalizar(ronda.id);

  return (
    <div className="cadaver-contenedor">
      <h1 className="titulo">CADÁVER EXQUISITO</h1>

      <p className="pista-label">Última palabra:</p>
      <p className="pista">{pista}</p>
      <div className="cadaver-info">
  <p className="info-label">Última participante:</p>
  <p className="info-dato">{ultimaParticipante}</p>

  <p className="info-label" style={{ marginTop: "14px" }}>Participaron:</p>
  <p className="info-dato">
    {participantes.join(" · ")}
  </p>
</div>

      <div className="input-zona">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribí un verso…"
        />
        <button className="btn-agregar" onClick={handleAgregar}>Agregar</button>
      </div>

      <button className="btn-finalizar" onClick={handleFinalizar}>
        Finalizar cadáver
      </button>

     
    </div>
  );
}
