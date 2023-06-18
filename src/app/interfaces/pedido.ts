export interface Pedido {
    pedidos_id?: number;
    fecha_salida: Date;
    fecha_llegada: Date;
    estado_pedido: 'En revisión' | 'En preparación' | 'En tránsito' | 'Entregado' | 'Cancelado' | 'Aprobado' | 'Rechazado';
    medida: number;
    fecha_creacion: Date;
    usuarios_id_creador: number;
    usuarios_id_revisador: number;
    almacenes_id_origen: number;
    almacenes_id_destion: number;
    camiones_id: number;
    usuarios_id_aprobador: number;
    observaciones?: string;
    stocks?: any[];
  }
