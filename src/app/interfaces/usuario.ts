export interface Usuario {
    usuarios_id?: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    activo: boolean;
    edad?: number;
    ciudad?: string;
    codigo_postal?: string;
    pais?: string;
    roles_id: number;
    usuarios_id_lider: number;
    imagen?: string;
    estado?: boolean;
  }