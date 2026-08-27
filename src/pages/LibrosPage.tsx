import { useEffect, useState } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { libroService, ejemplarService } from '../services/libroService';
import type { Libro, LibroRequest } from '../types';
import LibroForm from '../components/LibroForm';
import LibroList from '../components/LibroList';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [libroEditando, setLibroEditando] = useState<Libro | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargarLibros = () => {
    libroService.listar().then(setLibros).catch(() => setError('No se pudieron cargar los libros'));
  };

  useEffect(cargarLibros, []);

  const abrirNuevo = () => {
    setLibroEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (libro: Libro) => {
    setLibroEditando(libro);
    setModalAbierto(true);
  };

  const handleCrearOActualizar = async (dto: LibroRequest) => {
    setError('');
    try {
      if (libroEditando) {
        await libroService.actualizar(libroEditando.id, dto);
        setExito('Libro actualizado correctamente');
      } else {
        await libroService.crear(dto);
        setExito('Libro creado correctamente');
      }
      setModalAbierto(false);
      setLibroEditando(null);
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
      <div className="page-header page-header--con-accion">
        <div className="page-header-title">
          <BookOpen size={24} strokeWidth={1.8} />
          <h2>Libros</h2>
        </div>
        <button onClick={abrirNuevo}><Plus size={16} /> Nuevo libro</button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {exito && <Alert type="success" message={exito} onClose={() => setExito('')} />}

      <LibroList
        libros={libros}
        onEditar={abrirEditar}
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

      {modalAbierto && (
        <Modal titulo={libroEditando ? 'Editar libro' : 'Nuevo libro'} onClose={() => setModalAbierto(false)}>
          <LibroForm
            valoresIniciales={libroEditando}
            onSubmit={handleCrearOActualizar}
            onCancelar={() => setModalAbierto(false)}
          />
        </Modal>
      )}
    </div>
  );
}