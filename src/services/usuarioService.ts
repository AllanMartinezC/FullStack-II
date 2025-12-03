import axios from "axios";
import type { Usuario } from "../types";

const API_URL = "http://localhost:8080/api/usuarios";

// Listar todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const res = await axios.get<Usuario[]>(API_URL);
    return res.data;
};

// Crear un nuevo usuario
export const crearUsuario = async (usuario: Usuario): Promise<Usuario> => {
    const res = await axios.post<Usuario>(API_URL, usuario);
    return res.data;
};

// Obtener usuario por ID
export const getUsuarioPorId = async (id: number): Promise<Usuario> => {
    const res = await axios.get<Usuario>(`${API_URL}/${id}`);
    return res.data;
};

// Eliminar usuario
export const eliminarUsuario = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

// Login de usuario
export const loginUsuario = async (email: string, password: string): Promise<Usuario> => {
    const res = await axios.post<Usuario>(`${API_URL}/login`, { email, password });
    return res.data;
};
