export interface Usuario {
    id?: number;
    //imagen: string,
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    pais: string;
    ciudad: string;
    codigo_postal: number; 
    edad: number; 
    roles_id: string;
}
