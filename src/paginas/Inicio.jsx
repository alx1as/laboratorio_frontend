import "./Inicio.css";
import TarjetaPoema from "../componentes/TarjetaPoema";
import { usePoemas } from "../contexto/PoemasContexto";
import { useCadaveres } from "../contexto/CadaveresContexto";

export default function Inicio() {
  const { poemas } = usePoemas();
  const { finalizados } = useCadaveres();   // ← usamos los finalizados

  // Unir poemas y cadáveres finalizados en una sola lista homogénea
  const todos = [
    ...poemas,
    ...finalizados.map((c) => ({
      id: "cadaver-" + c.id,
      texto: c.versos.map(v => v.texto).join("\n"),
      ultimaActividad: c.fecha_creacion,
      autor: c.creado_por,
      tipo: "cadaver"
    }))
  ];

  // Ordenar por fecha descendente
  const ordenados = todos.sort(
    (a, b) => new Date(b.ultimaActividad) - new Date(a.ultimaActividad)
  );

  const recientes = ordenados.slice(0, 3);

  return (
    <div className="inicio-lista">
      <h2 className="inicio-titulo">Última actividad</h2>

      {recientes.length === 0 && (
        <p>No hay actividad reciente todavía.</p>
      )}

      {recientes.map((poema) => (
        <TarjetaPoema key={poema.id} poema={poema} />
      ))}

      <h2 className="inicio-titulo" style={{ marginTop: "40px" }}>
        Todos los textos
      </h2>

      {ordenados.length === 0 && (
        <p>Aún no se creó ningún texto.</p>
      )}

      {ordenados.map((poema) => (
        <TarjetaPoema key={poema.id} poema={poema} />
      ))}
    </div>
  );
}
