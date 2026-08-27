export interface Libro {
    id: number;
    titulo: string;
    isbn: string;
    edicion: string;
    fechaPublicacion: string;
    autor: string;
    totalEjemplares: number;
  }
  
  export interface LibroRequest {
    titulo: string;
    isbn: string;
    edicion: string;
    fechaPublicacion: string;
    autor: string;
  }
  
  export interface Ejemplar {
    id: number;
    codigoInventario: string;
    estado: 'DISPONIBLE' | 'PRESTADO' | 'DANADO';
    libroId: number;
    tituloLibro: string;
    isbn: string;
  }
  
  export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
  }
  
  export interface UsuarioRequest {
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
  }
  
  export interface Prestamo {
    id: number;
    fechaPrestamo: string;
    fechaDevolucionEsperada: string;
    fechaDevolucionReal: string | null;
    estado: 'ACTIVO' | 'DEVUELTO' | 'VENCIDO';
    usuarioId: number;
    nombreUsuario: string;
    ejemplarId: number;
    codigoInventario: string;
    libroId: number;
    tituloLibro: string;
    isbn: string;
  }
  
  export interface PrestamoRequest {
    usuarioId: number;
    isbn: string;
    fechaDevolucionEsperada?: string;
  }