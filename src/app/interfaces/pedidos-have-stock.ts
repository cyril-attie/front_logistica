//Es
export interface PedidosHaveStock {
  posicion: number;
  stocks_id: number;
  descripcion_material?: string;
  descripcion_categoria?: string;
  unidades_utilizadas: number;
  unidades: number;
  materiales_id: number
}
