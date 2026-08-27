import api from './api';
import type { Libro, LibroRequest, Ejemplar } from '../types';

export const libroService = {
  listar: () => api.get<Libro[]>('/api/libros').then(r => r.data),
  buscarPorId: (id: number) => api.get<Libro>(`/api/libros/${id}`).then(r => r.data),
  crear: (dto: LibroRequest) => api.post<Libro>('/api/libros', dto).then(r => r.data),
  actualizar: (id: number, dto: LibroRequest) => api.put<Libro>(`/api/libros/${id}`, dto).then(r => r.data),
  eliminar: (id: number) => api.delete(`/api/libros/${id}`),
};

export const ejemplarService = {
  crear: (dto: { codigoInventario: string; libroId: number }) =>
    api.post<Ejemplar>('/api/ejemplares', dto).then(r => r.data),
  disponiblesPorIsbn: (isbn: string) =>
    api.get<Ejemplar[]>('/api/ejemplares', { params: { isbn } }).then(r => r.data),
  porLibro: (libroId: number) =>
    api.get<Ejemplar[]>(`/api/ejemplares/libro/${libroId}`).then(r => r.data),
};