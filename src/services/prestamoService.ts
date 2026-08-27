import api from './api';
import type { Prestamo, PrestamoRequest } from '../types';

export const prestamoService = {
  registrar: (dto: PrestamoRequest) => api.post<Prestamo>('/api/prestamos', dto).then(r => r.data),
  devolver: (id: number) => api.put<Prestamo>(`/api/prestamos/${id}/devolver`).then(r => r.data),
  porUsuario: (usuarioId: number) => api.get<Prestamo[]>(`/api/prestamos/usuario/${usuarioId}`).then(r => r.data),
  porLibro: (libroId: number) => api.get<Prestamo[]>(`/api/prestamos/libro/${libroId}`).then(r => r.data),
};