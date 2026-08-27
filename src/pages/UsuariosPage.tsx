import { useEffect, useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { usuarioService } from '../services/usuarioService';
import type { Usuario, UsuarioRequest } from '../types';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioList from '../components/UsuarioList';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargarUsuarios = () => {
    usuarioService.listar().then(setUsuarios).catch(() => setError('No se pudieron cargar los usuarios'));
  };

  useEffect(cargarUsuarios, []);

  const abrirNuevo = () => {
    setUsuarioEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const handleCrearOActualizar = async (dto: UsuarioRequest) => {
    setError('');
    try {
      if (usuarioEditando) {
        await usuarioService.actualizar(usuarioEditando.id, dto);
        setExito('Usuario actualizado correctamente');
      } else {
        await usuarioService.crear(dto);
        setExito('Usuario creado correctamente');
      }
      setModalAbierto(false);
      setUsuarioEditando(null);
      cargarUsuarios();
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al guardar el usuario');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await usuarioService.eliminar(id);
      setExito('Usuario eliminado');
      cargarUsuarios();
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al eliminar el usuario (puede tener préstamos asociados)');
    }
  };

  return (
    <div>
      <div className="page-header page-header--con-accion">
        <div className="page-header-title">
          <Users size={24} strokeWidth={1.8} />
          <h2>Usuarios</h2>
        </div>
        <button onClick={abrirNuevo}><Plus size={16} /> Nuevo usuario</button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {exito && <Alert type="success" message={exito} onClose={() => setExito('')} />}

      <UsuarioList
        usuarios={usuarios}
        onEditar={abrirEditar}
        onEliminar={handleEliminar}
      />

      {modalAbierto && (
        <Modal titulo={usuarioEditando ? 'Editar usuario' : 'Nuevo usuario'} onClose={() => setModalAbierto(false)}>
          <UsuarioForm
            valoresIniciales={usuarioEditando}
            onSubmit={handleCrearOActualizar}
            onCancelar={() => setModalAbierto(false)}
          />
        </Modal>
      )}
    </div>
  );
}