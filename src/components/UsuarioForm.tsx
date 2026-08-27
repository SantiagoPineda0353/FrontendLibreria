import { useState, useEffect } from 'react';
import { UserPlus, Save, X } from 'lucide-react';
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
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
      <input placeholder="Apellido" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="date" value={form.fechaNacimiento} onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })} required />
      <div className="form-actions">
        <button type="submit">
          {valoresIniciales ? <Save size={16} /> : <UserPlus size={16} />}
          {valoresIniciales ? 'Actualizar' : 'Crear usuario'}
        </button>
        {onCancelar && (
          <button type="button" className="secondary" onClick={onCancelar}><X size={16} /> Cancelar</button>
        )}
      </div>
    </form>
  );
}