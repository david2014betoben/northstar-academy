export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  creditos: number;
  cupo: number;
  inscritos: number;
  disponibles: number;
  docente: {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    fotoUrl: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}
