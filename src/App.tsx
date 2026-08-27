import { useState } from 'react';
import Navbar from './components/Navbar';
import LibrosPage from './pages/LibrosPage';
import UsuariosPage from './pages/UsuariosPage';
import PrestamosPage from './pages/PrestamosPage';
import './App.css';

type Tab = 'libros' | 'usuarios' | 'prestamos';

function App() {
  const [tab, setTab] = useState<Tab>('libros');

  return (
    <div className="app">
      <Navbar tabActivo={tab} onCambiarTab={setTab} />
      <main className="main-content">
        {tab === 'libros' && <LibrosPage />}
        {tab === 'usuarios' && <UsuariosPage />}
        {tab === 'prestamos' && <PrestamosPage />}
      </main>
    </div>
  );
}

export default App;