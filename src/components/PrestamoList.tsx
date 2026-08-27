import { CheckCircle, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import type { Prestamo } from '../types';

interface PrestamoListProps {
  prestamos: Prestamo[];
  onDevolver: (id: number) => void;
}

const iconoEstado = {
  ACTIVO: <Clock size={13} />,
  DEVUELTO: <CheckCircle size={13} />,
  VENCIDO: <AlertTriangle size={13} />,
};

export default function PrestamoList({ prestamos, onDevolver }: PrestamoListProps) {
  if (prestamos.length === 0) {
    return <div className="table-card"><div className="empty-state">No hay préstamos para mostrar. Selecciona un filtro y busca.</div></div>;
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Libro</th><th>Usuario</th><th>Fecha préstamo</th><th>Fecha esperada</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td><strong>{p.tituloLibro}</strong> <span style={{ color: 'var(--color-text-muted)' }}>({p.codigoInventario})</span></td>
              <td>{p.nombreUsuario}</td>
              <td>{p.fechaPrestamo}</td>
              <td>{p.fechaDevolucionEsperada}</td>
              <td>
                <span className={`badge badge-${p.estado.toLowerCase()}`}>
                  {iconoEstado[p.estado]} {p.estado}
                </span>
              </td>
              <td>
                {p.estado !== 'DEVUELTO' && (
                  <button className="icon-btn" title="Registrar devolución" onClick={() => onDevolver(p.id)}>
                    <RotateCcw size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}