import { StockAlmacen } from "./stock-almacen";

export interface Almacen {
    almacenes_id?: number;
    nombre_almacen: string;
    calle: string;
    codigo_postal: string;
    localidad: string;
    pais: string;
    coordenadas: Point;
    capacidad_almacen: number;
    usuarios_id_encargado: number;
    stocks:[StockAlmacen]
  }
  
  interface Point {
    x: number;
    y: number;
  }