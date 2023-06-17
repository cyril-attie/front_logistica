export interface StockAlmacen {
    stocks_id: number;
    unidades: number | null;
    posicion?: number | null;
    materiales_id: number;
    nombre_material:string;
    descripcion_material?:string;
    categorias_materiales_id: number;
    descripcion_categoria: string;
    comentario_categoria?: string;
}
