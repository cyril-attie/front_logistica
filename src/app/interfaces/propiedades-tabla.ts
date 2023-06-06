export interface PropiedadesTabla {
    columnas: string[]; //Array de todas las labels(columnas) que vemos en la tabla
    response: any[]; //Aqui irá un array multidimensional [][] con la response acotada unicamente con los campos necesarios
    claves: string[]; //las claves de la response que queremos mostrar
    
    //IMPORTANTE: Las claves y las columnas deben seguir el mismo órden
}
