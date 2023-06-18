export interface Material {
    materiales_id?: number;
    nombre: string;
    estado: string;
    categorias_materiales_id: number;
    peso: number;
    stock: number;
    descripcion_material: string;
    descripcion_categoria?: string;
}
