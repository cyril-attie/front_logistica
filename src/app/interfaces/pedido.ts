export interface Pedido {
    pedidos_id?: number;
    fecha_salida: Date | null;
    fecha_llegada: Date | null;
    estado_pedido: 'En revisión' | 'En preparación' | 'En tránsito' | 'Entregado' | 'Cancelado' | 'Aprobado' | 'Rechazado';
    medida: number;
    fecha_creacion: Date;
    usuarios_id_creador: number;
    usuarios_id_revisador: number;
    almacenes_id_origen: number;
    almacenes_id_destion: number;
    camiones_id: number;
    usuario_id_aprobador: number;
    observaciones?: string;
  }
