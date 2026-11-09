export interface Inscripcion {
  id: number;
  estado: "ACTIVA" | "RETIRADA" | "FINALIZADA";
  fecha: string;
  curso: {
    id: number;
    codigo: string;
    nombre: string;
    creditos: number;
  };
}
