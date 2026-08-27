import { useEffect, useState } from 'react';
import { Repeat, Search } from 'lucide-react';
import { prestamoService } from '../services/prestamoService';
import { usuarioService } from '../services/usuarioService';
import { libroService, ejemplarService } from '../services/libroService';
import type { Prestamo, Usuario, Libro, Ejemplar } from '../types';
import PrestamoForm from '../components/PrestamoForm';
import PrestamoList from '../components/PrestamoList';
import Alert from '../components/Alert';

export default function PrestamosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [libros, setLibros] = useState<Libro[]>([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const [filtroTipo, setFiltroTipo] = useState<'usuario' | 'libro'>('usuario');
  const [filtroId, setFiltroId] = useState<number | ''>('');
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  const [isbnConsulta, setIsbnConsulta] = useState('');
  const [ejemplaresDisponibles, setEjemplaresDisponibles] = useState<Ejemplar[] | null>(null);

  useEffect(() => {
    usuarioService.listar().then(setUsuarios);
    libroService.listar().then(setLibros);
  }, []);

  const handleRegistrar = async (usuarioId: number, isbn: string) => {
    setError('');
    try {
      await prestamoService.registrar({ usuarioId, isbn });
      setExito('Préstamo registrado correctamente');
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al registrar el préstamo');
    }
  };

  const handleDevolver = async (id: number) => {
    try {
      await prestamoService.devolver(id);
      setExito('Préstamo devuelto correctamente');
      handleConsultar();
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al devolver el préstamo');
    }
  };

  const handleConsultar = async () => {
    if (!filtroId) return;
    setError('');
    try {
      const data = filtroTipo === 'usuario'
        ? await prestamoService.porUsuario(Number(filtroId))
        : await prestamoService.porLibro(Number(filtroId));
      setPrestamos(data);
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al consultar préstamos');
    }
  };

  const handleConsultarDisponibles = async () => {
    if (!isbnConsulta.trim()) return;
    try {
      const data = await ejemplarService.disponiblesPorIsbn(isbnConsulta);
      setEjemplaresDisponibles(data);
    } catch {
      setError('Error al consultar ejemplares disponibles');
    }
  };

  return (
    <div>
      <div className="page-header">
        <Repeat size={24} strokeWidth={1.8} />
        <h2>Préstamos</h2>
      </div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {exito && <Alert type="success" message={exito} onClose={() => setExito('')} />}

      <PrestamoForm usuarios={usuarios} libros={libros} onRegistrar={handleRegistrar} />

      <div className="form-card">
        <h3>Ejemplares disponibles por ISBN</h3>
        <div className="form-actions">
          <input placeholder="ISBN" value={isbnConsulta} onChange={e => setIsbnConsulta(e.target.value)} />
          <button onClick={handleConsultarDisponibles}><Search size={15} /> Consultar</button>
        </div>
        {ejemplaresDisponibles && (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ejemplaresDisponibles.length === 0
              ? <li style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No hay ejemplares disponibles</li>
              : ejemplaresDisponibles.map(ej => (
                <li key={ej.id} className="badge badge-devuelto">{ej.codigoInventario}</li>
              ))}
          </ul>
        )}
      </div>

      <div className="form-card">
        <h3>Consultar préstamos</h3>
        <div className="form-actions">
          <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value as 'usuario' | 'libro')}>
            <option value="usuario">Por usuario</option>
            <option value="libro">Por libro</option>
          </select>
          <select value={filtroId} onChange={e => setFiltroId(Number(e.target.value))}>
            <option value="">Selecciona...</option>
            {filtroTipo === 'usuario'
              ? usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)
              : libros.map(l => <option key={l.id} value={l.id}>{l.titulo}</option>)}
          </select>
          <button onClick={handleConsultar}><Search size={15} /> Buscar</button>
        </div>
      </div>

      <PrestamoList prestamos={prestamos} onDevolver={handleDevolver} />
    </div>
  );
}