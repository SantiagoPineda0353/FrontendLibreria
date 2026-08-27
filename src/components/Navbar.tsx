import { Library, BookOpen, Users, Repeat } from 'lucide-react';

interface NavbarProps {
  tabActivo: 'libros' | 'usuarios' | 'prestamos';
  onCambiarTab: (tab: 'libros' | 'usuarios' | 'prestamos') => void;
}

export default function Navbar({ tabActivo, onCambiarTab }: NavbarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Library size={26} strokeWidth={1.8} />
        <div>
          <h1>Biblioteca</h1>
          <span>Sistema de gestión</span>
        </div>
      </div>
      <nav>
        <button className={tabActivo === 'libros' ? 'active' : ''} onClick={() => onCambiarTab('libros')}>
          <BookOpen size={18} strokeWidth={1.8} />
          Libros
        </button>
        <button className={tabActivo === 'usuarios' ? 'active' : ''} onClick={() => onCambiarTab('usuarios')}>
          <Users size={18} strokeWidth={1.8} />
          Usuarios
        </button>
        <button className={tabActivo === 'prestamos' ? 'active' : ''} onClick={() => onCambiarTab('prestamos')}>
          <Repeat size={18} strokeWidth={1.8} />
          Préstamos
        </button>
      </nav>
      <div className="sidebar-footer">BackendLibreria · v1.0</div>
    </aside>
  );
}