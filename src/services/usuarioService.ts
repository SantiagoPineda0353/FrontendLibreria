import api from './api';
import type { Usuario, UsuarioRequest } from '../types';

export const usuarioService = {
  listar: () => api.get<Usuario[]>('/api/usuarios').then(r => r.data),
  buscarPorId: (id: number) => api.get<Usuario>(`/api/usuarios/${id}`).then(r => r.data),
  crear: (dto: UsuarioRequest) => api.post<Usuario>('/api/usuarios', dto).then(r => r.data),
  actualizar: (id: number, dto: UsuarioRequest) => api.put<Usuario>(`/api/usuarios/${id}`, dto).then(r => r.data),
  eliminar: (id: number) => api.delete(`/api/usuarios/${id}`),
};