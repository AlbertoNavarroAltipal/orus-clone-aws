// src/types/UserData.ts
/**
 * Interfaz que define la estructura de datos de un usuario
 * con los campos que vienen de la API GraphQL
 */
export interface ApiUserData {
  verificacion_correo: string | null;
  sitio: string | null;
  numero_contacto: string | null;
  nombre_completo: string | null;
  id_zona_ventas: string | null;
  gerencia: string | null;
  genero: string | null;
  foto_perfil: string | null;
  fecha_nacimiento: string | null;
  fecha_creacion: string | null;
  fecha_actualizacion: string | null;
  estado: boolean | null;
  email: string | null;
  dni: string | null;
  contrasena: string | null;
  codigo_cedi: string | null;
  cargo: string | null;
  canal: string | null;
}

/**
 * Interfaz que define la estructura de datos de un usuario ajustada a los campos del API
 */
export interface UserData {
  // Información personal
  nombreCompleto: string;
  dni?: string;
  fechaNacimiento?: string;
  genero?: string;
  fotoPerfil?: string;

  // Información de contacto
  email: string;
  numeroContacto?: string;

  // Información laboral
  cargo?: string;
  gerencia?: string;

  // Información comercial
  idZonaVentas?: string;
  canal?: string;

  // Ubicación e información del sitio
  sitio?: string;
  codigoCedi?: string;

  // Información de la cuenta
  fechaCreacion?: string;
  fechaActualizacion?: string;
  estado?: boolean;
  verificacionCorreo?: string;
}
