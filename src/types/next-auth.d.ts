import type { DefaultSession, DefaultUser } from "next-auth"
import type { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      dni: string;
      email: string;
      nombre_completo: string;
      numero_contacto: string;
      fecha_nacimiento?: string;
      genero?: string;
      foto_perfil?: string;
      fecha_creacion: string;
      fecha_actualizacion?: string;
      estado: boolean;
      id_zona_ventas?: string;
      canal?: string;
      cargo?: string;
      gerencia?: string;
      sitio?: string;
      codigo_cedi?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    dni: string;
    nombre_completo: string;
    numero_contacto: string;
    fecha_nacimiento?: string;
    genero?: string;
    foto_perfil?: string;
    fecha_creacion: string;
    fecha_actualizacion?: string;
    estado: boolean;
    id_zona_ventas?: string;
    canal?: string;
    cargo?: string;
    gerencia?: string;
    sitio?: string;
    codigo_cedi?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    dni: string;
    nombre_completo: string;
    numero_contacto: string;
    fecha_nacimiento?: string;
    genero?: string;
    foto_perfil?: string;
    fecha_creacion: string;
    fecha_actualizacion?: string;
    estado: boolean;
    id_zona_ventas?: string;
    canal?: string;
    cargo?: string;
    gerencia?: string;
    sitio?: string;
    codigo_cedi?: string;
  }
}