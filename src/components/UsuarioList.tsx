import { Pencil, Trash2 } from 'lucide-react';
import type { Usuario } from '../types';

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
}

export default function UsuarioList({ usuarios, onEditar, onEliminar }: UsuarioListProps) {
  if (usuarios.length === 0) {
    return <div className="table-card"><div className="empty-state">Aún no hay usuarios registrados</div></div>;
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Fecha nacimiento</th><th></th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td><strong>{u.nombre} {u.apellido}</strong></td>
              <td>{u.email}</td>
              <td>{u.fechaNacimiento}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-btn" title="Editar" onClick={() => onEditar(u)}><Pencil size={16} /></button>
                  <button className="icon-btn danger" title="Eliminar" onClick={() => onEliminar(u.id)}><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}