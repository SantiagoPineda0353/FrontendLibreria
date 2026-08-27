import { useState } from 'react';
import { Pencil, Trash2, Layers, Plus, BookX } from 'lucide-react';
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

  if (libros.length === 0) {
    return <div className="table-card"><div className="empty-state">Aún no hay libros registrados</div></div>;
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr><th>Título</th><th>ISBN</th><th>Autor</th><th>Ejemplares</th><th></th></tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <>
              <tr key={libro.id}>
                <td><strong>{libro.titulo}</strong></td>
                <td>{libro.isbn}</td>
                <td>{libro.autor}</td>
                <td>{libro.totalEjemplares}</td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" title="Editar" onClick={() => onEditar(libro)}><Pencil size={16} /></button>
                    <button className="icon-btn danger" title="Eliminar" onClick={() => onEliminar(libro.id)}><Trash2 size={16} /></button>
                    <button className="icon-btn" title="Ver ejemplares" onClick={() => handleVerEjemplares(libro.id)}><Layers size={16} /></button>
                  </div>
                </td>
              </tr>
              {libroExpandido === libro.id && (
                <tr>
                  <td colSpan={5}>
                    <div className="ejemplares-panel">
                      <ul>
                        {ejemplares.length === 0 && (
                          <li><BookX size={14} /> Sin ejemplares registrados</li>
                        )}
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
                        <button onClick={() => handleAgregar(libro.id)}><Plus size={15} /> Agregar ejemplar</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}