import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";

const CadaveresContexto = createContext();

export function CadaveresProvider({ children }) {
  const [abiertos, setAbiertos] = useState([]);
  const [finalizados, setFinalizados] = useState([]);   // ← añadido
  const [seleccionado, setSeleccionado] = useState(null);

  async function cargarAbiertos() {
    const data = await apiGet("/cadaver/abiertos");
    setAbiertos(data);
  }

  async function cargarFinalizados() {                   // ← añadido
    const data = await apiGet("/cadaveres");
    setFinalizados(data);
  }

  async function cargarCadaver(id) {
    const data = await apiGet(`/cadaver/${id}`);
    setSeleccionado(data);
  }

  async function crearNuevo(creado_por) {
    const res = await apiPost("/cadaver/nuevo", { creado_por });
    await cargarAbiertos();
    return res.id;
  }

  async function agregarVerso(id, texto, autor) {
    await apiPost(`/cadaver/${id}/agregar`, { texto, autor });
    await cargarCadaver(id);
  }

  async function finalizar(id) {
    await apiPost(`/cadaver/${id}/finalizar`, {});
    await cargarAbiertos();
    await cargarFinalizados();                          // ← añadido
    setSeleccionado(null);
  }

  useEffect(() => {
    cargarAbiertos();
    cargarFinalizados();                               // ← añadido
  }, []);

  return (
    <CadaveresContexto.Provider value={{
      abiertos,
      finalizados,                                     // ← añadido
      seleccionado,
      cargarCadaver,
      crearNuevo,
      agregarVerso,
      finalizar
    }}>
      {children}
    </CadaveresContexto.Provider>
  );
}

export function useCadaveres() {
  return useContext(CadaveresContexto);
}
