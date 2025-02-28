import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { generateClient } from "aws-amplify/api";
import type { GraphQLQuery } from "@aws-amplify/api";
import { SHA256 } from "crypto-js";
import "@/config/aws-config";

// Tipos e Interfaces
interface MaestroUsuario {
  dni: string;
  email: string;
  nombre_completo: string;
  numero_contacto: string;
  contrasena: string;
  verificacion_correo?: boolean;
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
    } & DefaultSession["user"];
  }

  interface User extends NextAuthUser {
    id: string;
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

// GraphQL Query
const GET_USER_QUERY = `
  query ObtnerUsuarioPorEmail($email: AWSEmail!) {
    getMaestroUsuariosByEmail(email: $email) {
      dni
      email
      nombre_completo
      numero_contacto
      contrasena
      verificacion_correo
      fecha_nacimiento
      genero
      foto_perfil
      fecha_creacion
      fecha_actualizacion
      estado
      id_zona_ventas
      canal
      cargo
      gerencia
      sitio
      codigo_cedi
    }
  }
`;

// Función para obtener usuario
async function getUser(email: string): Promise<MaestroUsuario | null> {
  const client = generateClient();
  try {
    const response = await client.graphql<
      GraphQLQuery<{ getMaestroUsuariosByEmail: MaestroUsuario }>
    >({
      query: GET_USER_QUERY,
      variables: { email: email.toLowerCase() },
      authMode: "apiKey",
    });

    return response.data?.getMaestroUsuariosByEmail || null;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // En la función authorize del provider Credentials
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await getUser(credentials.email);

          if (!user) {
            return null;
          }

          const hashedPassword = SHA256(credentials.password).toString();
          if (user.contrasena !== hashedPassword) {
            return null;
          }

          // En lugar de lanzar un error, retornamos un objeto especial
          if (!user.estado) {
            return {
              ...user,
              id: user.dni,
              redirect: "/account-pending",
            };
          }

          return {
            id: user.dni,
            email: user.email,
            dni: user.dni,
            nombre_completo: user.nombre_completo,
            numero_contacto: user.numero_contacto,
            fecha_nacimiento: user.fecha_nacimiento,
            genero: user.genero,
            foto_perfil: user.foto_perfil,
            fecha_creacion: user.fecha_creacion,
            fecha_actualizacion: user.fecha_actualizacion,
            estado: user.estado,
            id_zona_ventas: user.id_zona_ventas,
            canal: user.canal,
            cargo: user.cargo,
            gerencia: user.gerencia,
            sitio: user.sitio,
            codigo_cedi: user.codigo_cedi,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Asegurarse de que todos los campos necesarios estén en el token
        token.id = user.id;
        token.email = user.email;
        token.dni = user.dni;
        token.nombre_completo = user.nombre_completo;
        token.numero_contacto = user.numero_contacto;
        token.fecha_nacimiento = user.fecha_nacimiento;
        token.genero = user.genero;
        token.foto_perfil = user.foto_perfil;
        token.fecha_creacion = user.fecha_creacion;
        token.fecha_actualizacion = user.fecha_actualizacion;
        token.estado = user.estado;
        token.id_zona_ventas = user.id_zona_ventas;
        token.canal = user.canal;
        token.cargo = user.cargo;
        token.gerencia = user.gerencia;
        token.sitio = user.sitio;
        token.codigo_cedi = user.codigo_cedi;
      }
      return token;
    },
    async session({ session, token }) {
      // Asegurarse de que todos los campos del token estén en la sesión
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          dni: token.dni as string,
          nombre_completo: token.nombre_completo as string,
          numero_contacto: token.numero_contacto as string,
          fecha_nacimiento: token.fecha_nacimiento as string,
          genero: token.genero as string,
          foto_perfil: token.foto_perfil as string,
          fecha_creacion: token.fecha_creacion as string,
          fecha_actualizacion: token.fecha_actualizacion as string,
          estado: token.estado as boolean,
          id_zona_ventas: token.id_zona_ventas as string,
          canal: token.canal as string,
          cargo: token.cargo as string,
          gerencia: token.gerencia as string,
          sitio: token.sitio as string,
          codigo_cedi: token.codigo_cedi as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
