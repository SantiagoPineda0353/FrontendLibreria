import { useState, useEffect } from 'react';
import { BookPlus, Save, X } from 'lucide-react';
import type { LibroRequest } from '../types';

const formVacio: LibroRequest = { titulo: '', isbn: '', edicion: '', fechaPublicacion: '', autor: '' };

interface LibroFormProps {
  valoresIniciales?: LibroRequest | null;
  onSubmit: (dto: LibroRequest) => void;
  onCancelar?: () => void;
}

export default function LibroForm({ valoresIniciales, onSubmit, onCancelar }: LibroFormProps) {
  const [form, setForm] = useState<LibroRequest>(valoresIniciales ?? formVacio);

  useEffect(() => {
    setForm(valoresIniciales ?? formVacio);
  }, [valoresIniciales]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <input placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
      <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} required />
      <input placeholder="Edición" value={form.edicion} onChange={e => setForm({ ...form, edicion: e.target.value })} />
      <input type="date" value={form.fechaPublicacion} onChange={e => setForm({ ...form, fechaPublicacion: e.target.value })} />
      <input placeholder="Autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} required />
      <div className="form-actions">
        <button type="submit">
          {valoresIniciales ? <Save size={16} /> : <BookPlus size={16} />}
          {valoresIniciales ? 'Actualizar' : 'Crear libro'}
        </button>
        {onCancelar && (
          <button type="button" className="secondary" onClick={onCancelar}><X size={16} /> Cancelar</button>
        )}
      </div>
    </form>
  );
}