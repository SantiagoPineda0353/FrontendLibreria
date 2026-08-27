import { useState } from 'react';
import type { Usuario, Libro } from '../types';

interface PrestamoFormProps {
  usuarios: Usuario[];
  libros: Libro[];
  onRegistrar: (usuarioId: number, isbn: string) => void;
}

export default function PrestamoForm({ usuarios, libros, onRegistrar }: PrestamoFormProps) {
  const [usuarioId, setUsuarioId] = useState<number | ''>('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioId || !isbn) return;
    onRegistrar(Number(usuarioId), isbn);
    setUsuarioId('');
    setIsbn('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Registrar préstamo</h3>
      <select value={usuarioId} onChange={e => setUsuarioId(Number(e.target.value))} required>
        <option value="">Selecciona un usuario</option>
        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>)}
      </select>
      <select value={isbn} onChange={e => setIsbn(e.target.value)} required>
        <option value="">Selecciona un libro</option>
        {libros.map(l => <option key={l.id} value={l.isbn}>{l.titulo} ({l.isbn})</option>)}
      </select>
      <button type="submit">Registrar préstamo</button>
    </form>
  );
}