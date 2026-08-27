import type { Prestamo } from '../types';

interface PrestamoListProps {
  prestamos: Prestamo[];
  onDevolver: (id: number) => void;
}

export default function PrestamoList({ prestamos, onDevolver }: PrestamoListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Libro</th><th>Usuario</th><th>Fecha préstamo</th><th>Fecha esperada</th><th>Estado</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {prestamos.map(p => (
          <tr key={p.id}>
            <td>{p.tituloLibro} ({p.codigoInventario})</td>
            <td>{p.nombreUsuario}</td>
            <td>{p.fechaPrestamo}</td>
            <td>{p.fechaDevolucionEsperada}</td>
            <td><span className={`badge badge-${p.estado.toLowerCase()}`}>{p.estado}</span></td>
            <td>
              {p.estado !== 'DEVUELTO' && (
                <button onClick={() => onDevolver(p.id)}>Devolver</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}