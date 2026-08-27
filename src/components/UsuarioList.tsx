import type { Usuario } from '../types';

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (id: number) => void;
}

export default function UsuarioList({ usuarios, onEditar, onEliminar }: UsuarioListProps) {
  return (
    <table>
      <thead>
        <tr><th>Nombre</th><th>Email</th><th>Fecha nacimiento</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.id}>
            <td>{u.nombre} {u.apellido}</td>
            <td>{u.email}</td>
            <td>{u.fechaNacimiento}</td>
            <td>
              <button onClick={() => onEditar(u)}>Editar</button>
              <button onClick={() => onEliminar(u.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}