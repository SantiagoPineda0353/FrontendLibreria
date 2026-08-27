import { useState, useEffect } from 'react';
import type { UsuarioRequest } from '../types';

const formVacio: UsuarioRequest = { nombre: '', apellido: '', email: '', fechaNacimiento: '' };

interface UsuarioFormProps {
  valoresIniciales?: UsuarioRequest | null;
  onSubmit: (dto: UsuarioRequest) => void;
  onCancelar?: () => void;
}

export default function UsuarioForm({ valoresIniciales, onSubmit, onCancelar }: UsuarioFormProps) {
  const [form, setForm] = useState<UsuarioRequest>(valoresIniciales ?? formVacio);

  useEffect(() => {
    setForm(valoresIniciales ?? formVacio);
  }, [valoresIniciales]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    if (!valoresIniciales) setForm(formVacio);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>{valoresIniciales ? 'Editar usuario' : 'Nuevo usuario'}</h3>
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
      <input placeholder="Apellido" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="date" value={form.fechaNacimiento} onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })} required />
      <div className="form-actions">
        <button type="submit">{valoresIniciales ? 'Actualizar' : 'Crear'}</button>
        {valoresIniciales && onCancelar && (
          <button type="button" onClick={onCancelar}>Cancelar</button>
        )}
      </div>
    </form>
  );
}