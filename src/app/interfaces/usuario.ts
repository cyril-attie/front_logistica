export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    pais: string;
    ciudad: string;
    codigo_postal: number; 
    edad: number; 
    descripcion_rol: string;
    activo: boolean;

}
