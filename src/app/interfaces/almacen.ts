export interface Almacen {
    almacenes_id?: number;
    nombre_almacen: string;
    calle: string;
    codigo_postal: string;
    localidad: string;
    pais: string;
    latitud: Point;
    longitud: Point;
    capacidad_almacen: number;
    usuarios_id_encargado: number;
  }
  
  interface Point {
    x: number;
    y: number;
  }