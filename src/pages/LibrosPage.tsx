import { useEffect, useState } from 'react';
import { libroService, ejemplarService } from '../services/libroService';
import type { Libro, LibroRequest } from '../types';
import LibroForm from '../components/LibroForm';
import LibroList from '../components/LibroList';
import Alert from '../components/Alert';

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [libroEditando, setLibroEditando] = useState<Libro | null>(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargarLibros = () => {
    libroService.listar().then(setLibros).catch(() => setError('No se pudieron cargar los libros'));
  };

  useEffect(cargarLibros, []);

  const handleCrearOActualizar = async (dto: LibroRequest) => {
    setError('');
    try {
      if (libroEditando) {
        await libroService.actualizar(libroEditando.id, dto);
        setExito('Libro actualizado correctamente');
        setLibroEditando(null);
      } else {
        await libroService.crear(dto);
        setExito('Libro creado correctamente');
      }
      cargarLibros();
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al guardar el libro');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Eliminar este libro y todos sus ejemplares?')) return;
    try {
      await libroService.eliminar(id);
      setExito('Libro eliminado');
      cargarLibros();
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al eliminar el libro');
    }
  };

  return (
    <div>
      <h2>Libros</h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {exito && <Alert type="success" message={exito} onClose={() => setExito('')} />}

      <LibroForm
        valoresIniciales={libroEditando}
        onSubmit={handleCrearOActualizar}
        onCancelar={() => setLibroEditando(null)}
      />

      <LibroList
        libros={libros}
        onEditar={setLibroEditando}
        onEliminar={handleEliminar}
        onCargarEjemplares={ejemplarService.porLibro}
        onAgregarEjemplar={async (libroId, codigoInventario) => {
          try {
            await ejemplarService.crear({ codigoInventario, libroId });
            cargarLibros();
          } catch (err: any) {
            setError(err.response?.data?.mensaje || 'Error al crear el ejemplar');
          }
        }}
      />
    </div>
  );
}