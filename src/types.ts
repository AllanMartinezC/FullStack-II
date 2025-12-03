// src/types.ts

// Categoría
export interface Categoria {
    id: number;       // viene del backend
    nombre: string;
}

// Producto
export interface Producto {
    id?: number;       // opcional porque al crear un producto nuevo aún no tiene id
    nombre: string;
    precio: number;
    unidad:string;
    imagen:string;
    categoria: Categoria;
    imageUrl: string;

}

// Usuario
export interface Usuario {
    id?: number;       // opcional al crear un usuario
    nombre: string;
    email: string;
    password: string;
}
