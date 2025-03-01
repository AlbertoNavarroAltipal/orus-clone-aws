// src/config/constants.ts

/**
 * Configuración global de la aplicación
 * Este objeto contiene todas las constantes principales utilizadas en la aplicación
 */
export const APP_CONFIG = {
  /**
   * Dominio oficial de la empresa
   * Usado para validar emails corporativos y distinguir usuarios internos
   */
  COMPANY_DOMAIN: "altipal.com.co",

  /**
   * Lista de rutas públicas que no requieren autenticación
   * Estas rutas son accesibles sin necesidad de iniciar sesión
   *
   * @property {string[]} PUBLIC_ROUTES
   * @example
   * - /login - Página de inicio de sesión
   * - /register - Página de registro
   * - /forgot-password - Recuperación de contraseña
   * - /two-factor - Verificación de dos factores
   * - /session-expired - Sesión expirada
   * - /account-pending - Cuenta pendiente de activación
   */
  PUBLIC_ROUTES: [
    "/login",
    "/register",
    "/forgot-password",
    "/two-factor",
    "/session-expired",
    "/account-pending",
    "/user-inactive",       // Añadir esta ruta
  "/unauthorized-domain", // Añadir esta ruta
  "/auth/error"           // Añadir esta ruta
  ] as string[], // Cast explícito a array de strings para mejor tipado

  /**
   * Rutas protegidas y especiales de la aplicación
   * Define las rutas principales que requieren diferentes niveles de acceso
   *
   * @property {Object} PROTECTED_PATHS
   * @property {string} ADMIN - Ruta del panel de administración
   * @property {string} HOME - Página principal para usuarios internos
   * @property {string} HOME_EXTERNAL - Página principal para usuarios externos
   */
  PROTECTED_PATHS: {
    ADMIN: "/admin", // Panel de administración
    HOME: "/home", // Home para usuarios internos (@altipal.com.co)
    HOME_EXTERNAL: "/home-externo", // Home para usuarios externos
  },
} as const; // 'as const' hace que el objeto sea readonly y literal

/**
 * Tipo que representa las rutas públicas válidas
 * Este tipo se genera automáticamente basado en las rutas definidas en PUBLIC_ROUTES
 *
 * @type {PublicRoute}
 * @example
 * - Tipo resultante: "/login" | "/register" | "/forgot-password" | ...
 * - Esto asegura que solo se puedan usar las rutas definidas en PUBLIC_ROUTES
 */
export type PublicRoute = (typeof APP_CONFIG.PUBLIC_ROUTES)[number];

/**
 * Notas adicionales:
 *
 * 1. El 'as const' al final de APP_CONFIG:
 *    - Hace que el objeto sea inmutable (readonly)
 *    - Preserva los tipos literales de los strings
 *    - Mejora la inferencia de tipos
 *
 * 2. El 'as string[]' en PUBLIC_ROUTES:
 *    - Asegura que TypeScript trate el array como strings
 *    - Ayuda con la compatibilidad de tipos en otras partes de la aplicación
 *
 * 3. El tipo PublicRoute:
 *    - Usa typeof para obtener el tipo del array
 *    - [number] extrae los tipos literales de cada elemento
 *    - Resulta en un tipo unión de todas las rutas públicas
 */
