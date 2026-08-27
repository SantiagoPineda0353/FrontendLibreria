import { useState } from 'react';
import type { Libro, Ejemplar } from '../types';

interface LibroListProps {
  libros: Libro[];
  onEditar: (libro: Libro) => void;
  onEliminar: (id: number) => void;
  onCargarEjemplares: (libroId: number) => Promise<Ejemplar[]>;
  onAgregarEjemplar: (libroId: number, codigoInventario: string) => Promise<void>;
}

export default function LibroList({ libros, onEditar, onEliminar, onCargarEjemplares, onAgregarEjemplar }: LibroListProps) {
  const [libroExpandido, setLibroExpandido] = useState<number | null>(null);
  const [ejemplares, setEjemplares] = useState<Ejemplar[]>([]);
  const [codigoNuevo, setCodigoNuevo] = useState('');

  const handleVerEjemplares = async (libroId: number) => {
    if (libroExpandido === libroId) {
      setLibroExpandido(null);
      return;
    }
    const data = await onCargarEjemplares(libroId);
    setEjemplares(data);
    setLibroExpandido(libroId);
  };

  const handleAgregar = async (libroId: number) => {
    if (!codigoNuevo.trim()) return;
    await onAgregarEjemplar(libroId, codigoNuevo);
    setCodigoNuevo('');
    const data = await onCargarEjemplares(libroId);
    setEjemplares(data);
  };

  return (
    <table>
      <thead>
        <tr><th>Título</th><th>ISBN</th><th>Autor</th><th>Ejemplares</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        {libros.map(libro => (
          <>
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.isbn}</td>
              <td>{libro.autor}</td>
              <td>{libro.totalEjemplares}</td>
              <td>
                <button onClick={() => onEditar(libro)}>Editar</button>
                <button onClick={() => onEliminar(libro.id)}>Eliminar</button>
                <button onClick={() => handleVerEjemplares(libro.id)}>
                  {libroExpandido === libro.id ? 'Ocultar' : 'Ejemplares'}
                </button>
              </td>
            </tr>
            {libroExpandido === libro.id && (
              <tr>
                <td colSpan={5}>
                  <ul>
                    {ejemplares.map(ej => (
                      <li key={ej.id}>{ej.codigoInventario} — {ej.estado}</li>
                    ))}
                  </ul>
                  <div className="form-actions">
                    <input
                      placeholder="Código de inventario"
                      value={codigoNuevo}
                      onChange={e => setCodigoNuevo(e.target.value)}
                    />
                    <button onClick={() => handleAgregar(libro.id)}>Agregar ejemplar</button>
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}