// src/lib/auth.ts
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

// Consulta para verificar si existe un usuario por email
const CHECK_EMAIL_QUERY = `
  query GetByEmail($email: String) {
    listMaestroUsuarios(filter: {email: {eq: $email}}) {
      items {
        dni
        email
        numero_contacto
        nombre_completo
        estado
      }
    }
  }
`;

// Mutación para crear un nuevo usuario
// Mutación para crear un nuevo usuario
const REGISTER_USER_MUTATION = `
  mutation CreateMaestroUsuarios(
    $dni: String!,
    $email: AWSEmail!, 
    $nombre_completo: String!, 
    $numero_contacto: AWSPhone!, 
    $contrasena: String!, 
    $fecha_creacion: AWSDateTime!, 
    $estado: Boolean!,
    $foto_perfil: String
  ) {
    createMaestroUsuarios(input: {
      dni: $dni, 
      email: $email, 
      nombre_completo: $nombre_completo, 
      numero_contacto: $numero_contacto, 
      contrasena: $contrasena, 
      fecha_creacion: $fecha_creacion, 
      estado: $estado,
      foto_perfil: $foto_perfil
    }) {
      dni
      email
      nombre_completo
      numero_contacto
      estado
      fecha_creacion
      foto_perfil
    }
  }
`;

// Función para obtener usuario por email
async function getUser(email: string): Promise<MaestroUsuario | null> {
  const client = generateClient();
  try {
    console.log(`Buscando usuario con email: ${email}`);

    const response = await client.graphql<
      GraphQLQuery<{ getMaestroUsuariosByEmail: MaestroUsuario }>
    >({
      query: GET_USER_QUERY,
      variables: { email: email.toLowerCase() },
      authMode: "apiKey",
    });

    console.log("Respuesta de consulta de usuario:", response);

    if (response.data?.getMaestroUsuariosByEmail) {
      console.log(
        "Usuario encontrado:",
        response.data.getMaestroUsuariosByEmail.email
      );
      return response.data.getMaestroUsuariosByEmail;
    }

    console.log("Usuario no encontrado");
    return null;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

// Función para verificar si existe un usuario por email
async function checkUserExists(email: string): Promise<boolean> {
  const client = generateClient();
  try {
    console.log(`Verificando si existe usuario con email: ${email}`);

    const response = await client.graphql({
      query: CHECK_EMAIL_QUERY,
      variables: { email: email.toLowerCase() },
      authMode: "apiKey",
    });

    const exists = response.data?.listMaestroUsuarios?.items.length > 0;
    console.log(`Usuario ${email} existe: ${exists}`);
    return exists;
  } catch (error) {
    console.error("Error al verificar existencia de usuario:", error);
    return false;
  }
}

// Función para generar un DNI aleatorio único
async function generateUniqueId(): Promise<string> {
  // Genera un ID de 10 dígitos
  const generateId = () =>
    Math.floor(1000000000 + Math.random() * 9000000000).toString();

  let id = generateId();
  let isUnique = false;

  const client = generateClient();

  // Verificar que no exista este ID en la base de datos
  while (!isUnique) {
    try {
      const response = await client.graphql({
        query: `
          query GetByDni($dni: String) {
            listMaestroUsuarios(filter: {dni: {eq: $dni}}) {
              items {
                dni
              }
            }
          }
        `,
        variables: { dni: id },
        authMode: "apiKey",
      });

      if (response.data?.listMaestroUsuarios?.items.length === 0) {
        isUnique = true;
      } else {
        id = generateId();
      }
    } catch (error) {
      console.error("Error al verificar unicidad de ID:", error);
      // Si hay error, asumimos que es único para continuar
      isUnique = true;
    }
  }

  return id;
}

// Función para crear un nuevo usuario desde la autenticación de Google
// Función para crear un nuevo usuario desde la autenticación de Google
async function createUserFromGoogle(
  profile: any
): Promise<MaestroUsuario | null> {
  const client = generateClient();

  try {
    console.log("Creando nuevo usuario desde Google:", profile);

    // Generar un DNI único para el usuario (asegúrate de que sea exactamente de 10 dígitos)
    const dni = await generateUniqueId();
    console.log("DNI generado:", dni);

    // Generar una contraseña aleatoria (no será usada por el usuario)
    const randomPassword = Math.random().toString(36).substring(2, 12);
    const hashedPassword = SHA256(randomPassword).toString();

    // Número de teléfono fijo válido para AWSPhone
    const phoneNumber = "+573101234567";

    // Crear el nuevo usuario con datos mínimos requeridos
    const registerVariables = {
      nombre_completo: profile.name || "Usuario Google",
      dni: dni,
      email: profile.email.toLowerCase(),
      numero_contacto: phoneNumber,
      contrasena: hashedPassword,
      estado: true,
      fecha_creacion: new Date().toISOString(),
      foto_perfil: profile.picture || null, // Agregamos la foto de perfil
    };

    console.log(
      "Variables para registro de usuario Google:",
      JSON.stringify(registerVariables, null, 2)
    );

    // Ejecutar la mutación GraphQL para crear el usuario
    const response = await client.graphql({
      query: REGISTER_USER_MUTATION,
      variables: registerVariables,
      authMode: "apiKey",
    });

    // Verificar la respuesta
    console.log(
      "Respuesta de creación de usuario:",
      JSON.stringify(response, null, 2)
    );

    if (response.data?.createMaestroUsuarios) {
      console.log(
        "Usuario creado exitosamente:",
        response.data.createMaestroUsuarios
      );
      return response.data.createMaestroUsuarios as MaestroUsuario;
    } else if (response.errors) {
      console.error("Errores de GraphQL:", response.errors);
      response.errors.forEach((err) => {
        console.error(`- Error: ${err.message}`);
      });
    }

    console.error("No se pudo crear el usuario desde Google");
    return null;
  } catch (error) {
    console.error("Error al crear usuario desde Google:", error);
    if (error.errors) {
      error.errors.forEach((err) => {
        console.error("Error de GraphQL detallado:", err.message);
      });
    }
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
      async authorize(credentials) {
        try {
          console.log("Iniciando proceso de autorización con credenciales");

          if (!credentials?.email || !credentials?.password) {
            console.log("Credenciales incompletas");
            return null;
          }

          console.log(`Autenticando a: ${credentials.email}`);
          const user = await getUser(credentials.email);

          if (!user) {
            console.log("Usuario no encontrado");
            return null;
          }

          console.log("Usuario encontrado, verificando contraseña");
          const hashedPassword = SHA256(credentials.password).toString();

          if (user.contrasena !== hashedPassword) {
            console.log("Contraseña incorrecta");
            return null;
          }

          console.log("Autenticación exitosa");

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
      profile(profile) {
        console.log("Perfil de Google recibido:", profile);

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          // Estos campos se agregarán en signIn
          dni: "",
          nombre_completo: profile.name,
          numero_contacto: "",
          fecha_creacion: new Date().toISOString(),
          estado: true,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Proceso de signIn:", {
        provider: account?.provider,
        email: user.email,
      });

      // Solo procesamos la lógica especial para Google
      if (account?.provider === "google" && user.email) {
        try {
          // Verificar si el usuario ya existe en nuestra DB
          console.log(
            `Verificando si el usuario de Google ${user.email} ya existe...`
          );
          const exists = await checkUserExists(user.email);

          if (!exists) {
            console.log(
              `Usuario de Google ${user.email} no existe, creando nuevo usuario...`
            );

            // Intentar crear el usuario varias veces en caso de error
            let newUser = null;
            let attemptCount = 0;
            const maxAttempts = 3;

            while (!newUser && attemptCount < maxAttempts) {
              attemptCount++;
              console.log(
                `Intento ${attemptCount} de crear usuario de Google...`
              );

              try {
                newUser = await createUserFromGoogle(profile);
                if (newUser) {
                  console.log(
                    `Usuario de Google creado exitosamente en el intento ${attemptCount}`
                  );

                  // Actualizar los datos del usuario con la información de nuestra DB
                  user.id = newUser.dni;
                  user.dni = newUser.dni;
                  user.nombre_completo = newUser.nombre_completo;
                  user.numero_contacto = newUser.numero_contacto;
                  user.fecha_creacion = newUser.fecha_creacion;
                  user.estado = newUser.estado;
                } else {
                  console.error(
                    `Intento ${attemptCount} fallido: No se pudo crear el usuario`
                  );
                }
              } catch (createError) {
                console.error(`Error en intento ${attemptCount}:`, createError);
              }
            }

            if (!newUser) {
              // Si después de varios intentos no se pudo crear, seguimos con datos básicos
              console.warn(
                "No se pudo crear usuario en la DB después de varios intentos, usando datos básicos"
              );
              user.id = profile.sub || Math.random().toString(36).substring(2);
              user.dni = user.id;
              user.nombre_completo =
                profile.name || user.name || "Usuario Google";
              user.numero_contacto = "+573101234567";
              user.fecha_creacion = new Date().toISOString();
              user.estado = true;
            }
          } else {
            console.log(
              `Usuario de Google ${user.email} ya existe, obteniendo datos...`
            );
            // Si existe, obtener datos completos
            const existingUser = await getUser(user.email);

            if (existingUser) {
              console.log(
                `Datos del usuario ${user.email} obtenidos correctamente`
              );
              // Actualizar los datos del usuario con la información de nuestra DB
              user.id = existingUser.dni;
              user.dni = existingUser.dni;
              user.nombre_completo = existingUser.nombre_completo;
              user.numero_contacto = existingUser.numero_contacto;
              user.fecha_nacimiento = existingUser.fecha_nacimiento;
              user.genero = existingUser.genero;
              user.foto_perfil = existingUser.foto_perfil;
              user.fecha_creacion = existingUser.fecha_creacion;
              user.fecha_actualizacion = existingUser.fecha_actualizacion;
              user.estado = existingUser.estado;
              user.id_zona_ventas = existingUser.id_zona_ventas;
              user.canal = existingUser.canal;
              user.cargo = existingUser.cargo;
              user.gerencia = existingUser.gerencia;
              user.sitio = existingUser.sitio;
              user.codigo_cedi = existingUser.codigo_cedi;
            } else {
              // Si por alguna razón no se encuentra, usamos datos básicos
              console.warn(
                `Usuario ${user.email} existe pero no se pudo obtener, usando datos básicos`
              );
              user.id = profile.sub || Math.random().toString(36).substring(2);
              user.dni = user.id;
              user.nombre_completo =
                profile.name || user.name || "Usuario Google";
              user.numero_contacto = "+573101234567";
              user.fecha_creacion = new Date().toISOString();
              user.estado = true;
            }
          }
        } catch (error) {
          console.error("Error general en signIn de Google:", error);
          // No rechazamos la autenticación, permitimos continuar con datos básicos
          user.id = profile.sub || Math.random().toString(36).substring(2);
          user.dni = user.id;
          user.nombre_completo = profile.name || user.name || "Usuario Google";
          user.numero_contacto = "+573101234567";
          user.fecha_creacion = new Date().toISOString();
          user.estado = true;
        }
      }

      // Siempre permitimos el inicio de sesión
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Pasamos todos los datos del usuario al token
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
    // Mejorar el callback de redirección
    async redirect({ url, baseUrl }) {
      console.log(`Redireccionando: URL=${url}, baseUrl=${baseUrl}`);

      // Eliminar path 'en' de las URLs (si existe)
      const normalizedUrl = url.replace(/\/en\//, "/");
      const normalizedBaseUrl = baseUrl.replace(/\/en\//, "/");

      // Si la URL comienza con la URL base, permite la redirección
      if (normalizedUrl.startsWith(normalizedBaseUrl)) {
        // Quitar los posibles parámetros callbackUrl
        const cleanUrl = normalizedUrl.split("?")[0];
        return cleanUrl;
      }

      // Verificar si es una redirección a account-pending
      if (normalizedUrl.includes("/account-pending")) {
        return `${normalizedBaseUrl}/account-pending`;
      }

      // Por defecto, redirigir al home
      return `${normalizedBaseUrl}/home`;
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
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
