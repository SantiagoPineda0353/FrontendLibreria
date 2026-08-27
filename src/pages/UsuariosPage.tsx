import { useEffect, useState } from 'react';
import { usuarioService } from '../services/usuarioService';
import type { Usuario, UsuarioRequest } from '../types';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioList from '../components/UsuarioList';
import Alert from '../components/Alert';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargarUsuarios = () => {
    usuarioService.listar().then(setUsuarios).catch(() => setError('No se pudieron cargar los usuarios'));
  };

  useEffect(cargarUsuarios, []);

  const handleCrearOActualizar = async (dto: UsuarioRequest) => {
    setError('');
    try {
      if (usuarioEditando) {
        await usuarioService.actualizar(usuarioEditando.id, dto);
        setExito('Usuario actualizado correctamente');
        setUsuarioEditando(null);
      } else {
        await usuarioService.crear(dto);
        setExito('Usuario creado correctamente');
      }
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
      <h2>Usuarios</h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {exito && <Alert type="success" message={exito} onClose={() => setExito('')} />}

      <UsuarioForm
        valoresIniciales={usuarioEditando}
        onSubmit={handleCrearOActualizar}
        onCancelar={() => setUsuarioEditando(null)}
      />

      <UsuarioList
        usuarios={usuarios}
        onEditar={setUsuarioEditando}
        onEliminar={handleEliminar}
      />
    </div>
  );
}