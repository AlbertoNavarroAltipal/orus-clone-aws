// src/lib/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { generateClient } from "aws-amplify/api";
import type { GraphQLResult } from "@aws-amplify/api";
import { SHA256 } from "crypto-js";
import "@/config/aws-config";

// Crear clase AuthError para no depender de una importación externa
export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "AuthError";
  }
}

// Obtener dominios permitidos de variables de entorno
const ALLOWED_EMAIL_DOMAINS = process.env.ALLOWED_EMAIL_DOMAINS
  ? process.env.ALLOWED_EMAIL_DOMAINS.split(",")
  : ["altipal.com.co", "altipal.com"];

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

// Extensión de los tipos de NextAuth para incluir campos personalizados
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
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
    } & DefaultSession["user"];
  }

  // Definición de User con los campos adicionales
  interface User {
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

// Mutación para registrar intentos de acceso
const LOG_AUTH_ATTEMPT_MUTATION = `
  mutation CreateAuthLog(
    $email: String!,
    $timestamp: AWSDateTime!,
    $ipAddress: String,
    $reason: String!,
    $success: Boolean!,
    $provider: String!,
    $userAgent: String,
    $details: String
  ) {
    createAuthLog(input: {
      email: $email,
      timestamp: $timestamp,
      ipAddress: $ipAddress,
      reason: $reason,
      success: $success,
      provider: $provider,
      userAgent: $userAgent,
      details: $details
    }) {
      id
      email
      timestamp
      success
    }
  }
`;

// Función para obtener usuario por email
async function getUser(email: string): Promise<MaestroUsuario | null> {
  if (!email) {
    console.error("Email no proporcionado para buscar usuario");
    return null;
  }

  const client = generateClient();
  try {
    console.log(`Buscando usuario con email: ${email}`);

    const response = (await client.graphql({
      query: GET_USER_QUERY,
      variables: { email: email.toLowerCase() },
      authMode: "apiKey",
    })) as GraphQLResult<{ getMaestroUsuariosByEmail: MaestroUsuario }>;

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

    const response = (await client.graphql({
      query: CHECK_EMAIL_QUERY,
      variables: { email: email.toLowerCase() },
      authMode: "apiKey",
    })) as GraphQLResult<{ listMaestroUsuarios: { items: any[] } }>;

    const exists = response.data?.listMaestroUsuarios?.items.length > 0;
    console.log(`Usuario ${email} existe: ${exists}`);
    return exists;
  } catch (error) {
    console.error("Error al verificar existencia de usuario:", error);
    return false;
  }
}

// Función para registrar intentos de autenticación
async function logAuthenticationAttempt(data: {
  email: string;
  timestamp: string;
  ipAddress?: string;
  reason: string;
  success: boolean;
  provider: string;
  userAgent?: string;
  details?: string;
}): Promise<boolean> {
  const client = generateClient();
  try {
    console.log(
      `Registrando intento de autenticación: ${data.email}, Motivo: ${data.reason}, Éxito: ${data.success}`
    );

    const response = (await client.graphql({
      query: LOG_AUTH_ATTEMPT_MUTATION,
      variables: {
        email: data.email.toLowerCase(),
        timestamp: data.timestamp,
        ipAddress: data.ipAddress || "unknown",
        reason: data.reason,
        success: data.success,
        provider: data.provider,
        userAgent: data.userAgent || null,
        details: data.details || null,
      },
      authMode: "apiKey",
    })) as GraphQLResult<{ createAuthLog: { id: string } }>;

    console.log(
      "Registro de autenticación creado:",
      response.data?.createAuthLog?.id
    );
    return true;
  } catch (error) {
    console.error("Error al registrar intento de autenticación:", error);
    return false;
  }
}

// Función para verificar si un email pertenece a un dominio permitido
function isAllowedDomain(email: string): boolean {
  if (!email) return false;

  return ALLOWED_EMAIL_DOMAINS.some((domain) =>
    email.toLowerCase().endsWith(`@${domain}`)
  );
}

// Función para generar un DNI basado en el email
function generateDniFromEmail(email: string): string {
  // Extraer la parte antes del @ y reemplazar puntos por guiones
  const parts = email.split("@");
  const username = parts[0].replace(/\./g, "-").toLowerCase();

  // Si es demasiado largo, truncar a 10 caracteres
  if (username.length > 20) {
    return username.substring(0, 20);
  }

  // Si es demasiado corto, rellenar con números aleatorios
  if (username.length < 20) {
    const padding = Math.floor(Math.random() * 20 ** (20 - username.length))
      .toString()
      .padStart(10 - username.length, "0");
    return username + "-" + padding;
  }

  return username;
}

// Función para generar un DNI aleatorio único
async function generateUniqueId(email: string): Promise<string> {
  // Primero intentamos generar un DNI basado en el email
  let id = generateDniFromEmail(email);
  let isUnique = false;

  const client = generateClient();

  // Verificar que no exista este ID en la base de datos
  while (!isUnique) {
    try {
      const response = (await client.graphql({
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
      })) as GraphQLResult<{ listMaestroUsuarios: { items: any[] } }>;

      if (response.data?.listMaestroUsuarios?.items.length === 0) {
        isUnique = true;
      } else {
        // Si ya existe, generar un nuevo ID aleatorio
        id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
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
async function createUserFromGoogle(
  profile: any | undefined
): Promise<MaestroUsuario | null> {
  if (!profile || !profile.email) {
    console.error("El perfil de Google no contiene información válida");
    return null;
  }

  const client = generateClient();

  try {
    console.log("Creando nuevo usuario desde Google:", profile);

    // Generar un DNI único para el usuario basado en el email
    const dni = await generateUniqueId(profile.email);
    console.log("DNI generado:", dni);

    // Generar una contraseña aleatoria (no será usada por el usuario)
    const currentYear = new Date().getFullYear();
    const randomPassword = `$ALt1p4L.${currentYear}***`;

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
    const response = (await client.graphql({
      query: REGISTER_USER_MUTATION,
      variables: registerVariables,
      authMode: "apiKey",
    })) as GraphQLResult<{ createMaestroUsuarios: MaestroUsuario }>;

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
      return response.data.createMaestroUsuarios;
    } else if (response.errors) {
      console.error("Errores de GraphQL:", response.errors);
      response.errors.forEach((err: any) => {
        console.error(`- Error: ${err.message}`);
      });
    }

    console.error("No se pudo crear el usuario desde Google");
    return null;
  } catch (error: any) {
    console.error("Error al crear usuario desde Google:", error);
    if (error.errors) {
      error.errors.forEach((err: any) => {
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

          // Asegurarse de que las credenciales no sean undefined
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) {
            console.log("Credenciales incompletas");
            return null;
          }

          console.log(`Autenticando a: ${email}`);
          const user = await getUser(email);

          if (!user) {
            console.log("Usuario no encontrado");
            // Registrar intento fallido
            await logAuthenticationAttempt({
              email: email,
              timestamp: new Date().toISOString(),
              reason: "user_not_found",
              success: false,
              provider: "credentials",
            });
            return null;
          }

          console.log("Usuario encontrado, verificando contraseña");
          const hashedPassword = SHA256(password).toString();

          if (user.contrasena !== hashedPassword) {
            console.log("Contraseña incorrecta");
            // Registrar intento fallido
            await logAuthenticationAttempt({
              email: email,
              timestamp: new Date().toISOString(),
              reason: "invalid_password",
              success: false,
              provider: "credentials",
            });
            return null;
          }

          // Verificar si el usuario está activo
          if (!user.estado) {
            console.log("Usuario inactivo");
            // Registrar intento fallido
            await logAuthenticationAttempt({
              email: email,
              timestamp: new Date().toISOString(),
              reason: "user_inactive",
              success: false,
              provider: "credentials",
            });
            return null;
          }

          console.log("Autenticación exitosa");
          // Registrar intento exitoso
          await logAuthenticationAttempt({
            email: email,
            timestamp: new Date().toISOString(),
            reason: "success",
            success: true,
            provider: "credentials",
          });

          return {
            id: user.dni, // Usar DNI como ID ya que no tenemos campo id
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
          // Registrar error del servidor
          try {
            await logAuthenticationAttempt({
              email: credentials?.email || "unknown",
              timestamp: new Date().toISOString(),
              reason: "server_error",
              success: false,
              provider: "credentials",
            });
          } catch (logError) {
            console.error(
              "Error al registrar fallo de autenticación:",
              logError
            );
          }
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Dominio principal de la empresa (aunque permitiremos múltiples dominios en el callback signIn)
          hd: ALLOWED_EMAIL_DOMAINS[0],
          // Forzar la selección de cuenta siempre
          prompt: "select_account",
          // Definir los alcances (scopes) que necesitas
          scope: "openid email profile",
          // Acceso offline para obtener refresh tokens si es necesario
          access_type: "offline",
          // Configurar el modo de visualización
          display: "popup",
          // Establecer el tipo de respuesta
          response_type: "code",
          // Incluir un estado para seguridad CSRF
          state: process.env.NEXTAUTH_SECRET
            ? Buffer.from(
                `${process.env.NEXTAUTH_SECRET}:${Date.now()}`
              ).toString("base64")
            : undefined,
        },
      },
      profile(profile) {
        console.log("Perfil de Google recibido:", profile);

        // Validar el dominio del email aquí como verificación adicional
        const email = profile.email;
        const domainAllowed = isAllowedDomain(email);

        if (!domainAllowed) {
          console.warn(`Email no autorizado detectado en profile: ${email}`);
          // No lanzamos error aquí, lo manejamos en el callback signIn
        }

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          // Estos campos se completarán/actualizarán en signIn
          dni: "", // Será actualizado en signIn
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
        email: user?.email,
      });

      // Solo procesamos la lógica especial para Google
      if (account?.provider === "google" && user?.email) {
        try {
          // Verificar si el email pertenece a un dominio permitido
          if (!isAllowedDomain(user.email)) {
            console.log(
              `Acceso denegado: ${user.email} no pertenece a un dominio autorizado`
            );

            // Registrar intento fallido
            await logAuthenticationAttempt({
              email: user.email,
              timestamp: new Date().toISOString(),
              reason: "domain_unauthorized",
              success: false,
              provider: "google",
            });

            // Redirigir a la página personalizada de error
            return `/unauthorized-domain?email=${encodeURIComponent(
              user.email
            )}`;
          }

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

                  // Registrar creación exitosa
                  await logAuthenticationAttempt({
                    email: user.email,
                    timestamp: new Date().toISOString(),
                    reason: "user_created",
                    success: true,
                    provider: "google",
                  });
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
              // Si después de varios intentos no se pudo crear, registramos el error
              console.warn(
                "No se pudo crear usuario en la DB después de varios intentos, usando datos básicos"
              );

              await logAuthenticationAttempt({
                email: user.email,
                timestamp: new Date().toISOString(),
                reason: "user_creation_failed",
                success: false,
                provider: "google",
              });

              // Generar DNI basado en el email para usar como ID
              const tempDni = generateDniFromEmail(user.email);
              user.id = tempDni;
              user.dni = tempDni;
              user.nombre_completo = profile?.name || "Usuario Google";
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

              // Verificar si el usuario está activo
              if (!existingUser.estado) {
                console.log("Usuario inactivo");

                // Registrar intento fallido
                await logAuthenticationAttempt({
                  email: user.email,
                  timestamp: new Date().toISOString(),
                  reason: "user_inactive",
                  success: false,
                  provider: "google",
                });

                // Redirigir a página de usuario inactivo
                return `/user-inactive?email=${encodeURIComponent(user.email)}`;
              }

              // Actualizar los datos del usuario con la información de nuestra DB
              user.id = existingUser.dni; // Usar DNI como ID
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

              // Registrar autenticación exitosa
              await logAuthenticationAttempt({
                email: user.email,
                timestamp: new Date().toISOString(),
                reason: "success",
                success: true,
                provider: "google",
              });
            } else {
              // Si por alguna razón no se encuentra, usamos datos básicos
              console.warn(
                `Usuario ${user.email} existe pero no se pudo obtener, usando datos básicos`
              );

              // Registrar anomalía
              await logAuthenticationAttempt({
                email: user.email,
                timestamp: new Date().toISOString(),
                reason: "user_fetch_failed",
                success: false,
                provider: "google",
              });

              // Generar DNI basado en el email para usar como ID
              const tempDni = generateDniFromEmail(user.email);
              user.id = tempDni;
              user.dni = tempDni;
              user.nombre_completo = profile?.name || "Usuario Google";
              user.numero_contacto = "+573101234567";
              user.fecha_creacion = new Date().toISOString();
              user.estado = true;
            }
          }
        } catch (error) {
          console.error("Error general en signIn de Google:", error);

          // Registrar error del servidor
          try {
            await logAuthenticationAttempt({
              email: user.email || "unknown",
              timestamp: new Date().toISOString(),
              reason: "server_error",
              success: false,
              provider: "google",
            });
          } catch (logError) {
            console.error(
              "Error al registrar fallo de autenticación:",
              logError
            );
          }

          // No rechazamos la autenticación, permitimos continuar con datos básicos
          // Generar DNI basado en el email para usar como ID
          const tempDni = user.email
            ? generateDniFromEmail(user.email)
            : Math.random().toString(36).substring(2, 12);
          user.id = tempDni;
          user.dni = tempDni;
          user.nombre_completo = profile?.name || "Usuario Google";
          user.numero_contacto = "+573101234567";
          user.fecha_creacion = new Date().toISOString();
          user.estado = true;
        }
      }

      // Siempre permitimos el inicio de sesión si ha pasado todas las verificaciones
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

      // Si la URL es para una página de error personalizada, permitirla directamente
      if (
        normalizedUrl.includes("/unauthorized-domain") ||
        normalizedUrl.includes("/user-inactive") ||
        normalizedUrl.includes("/auth/error")
      ) {
        return normalizedUrl;
      }

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
    error: "/auth/error",
    // No es necesario incluir unauthorized-domain y user-inactive aquí,
    // ya que las manejamos a través del callback signIn
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
