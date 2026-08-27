interface NavbarProps {
    tabActivo: 'libros' | 'usuarios' | 'prestamos';
    onCambiarTab: (tab: 'libros' | 'usuarios' | 'prestamos') => void;
  }
  
  export default function Navbar({ tabActivo, onCambiarTab }: NavbarProps) {
    return (
      <header className="navbar">
        <h1>Sistema de Biblioteca</h1>
        <nav>
          <button className={tabActivo === 'libros' ? 'active' : ''} onClick={() => onCambiarTab('libros')}>
            Libros
          </button>
          <button className={tabActivo === 'usuarios' ? 'active' : ''} onClick={() => onCambiarTab('usuarios')}>
            Usuarios
          </button>
          <button className={tabActivo === 'prestamos' ? 'active' : ''} onClick={() => onCambiarTab('prestamos')}>
            Préstamos
          </button>
        </nav>
      </header>
    );
  }