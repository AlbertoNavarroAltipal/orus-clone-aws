// src/utils/auth.ts

// Importamos la configuración y tipos necesarios del archivo de constantes
// APP_CONFIG contiene configuraciones globales como dominios y rutas
// PublicRoute es un tipo que define las rutas públicas permitidas
import { APP_CONFIG, type PublicRoute } from "../config/constants";

/**
 * Verifica si un correo electrónico pertenece al dominio de la empresa
 *
 * @param email - El correo electrónico a verificar (opcional o puede ser null)
 * @returns boolean - true si el correo es del dominio de la empresa, false en caso contrario
 *
 * @example
 * isCompanyEmail("usuario@altipal.com.co") // returns true
 * isCompanyEmail("usuario@otro.com") // returns false
 * isCompanyEmail() // returns false
 * isCompanyEmail(null) // returns false
 */
export const isCompanyEmail = (email?: string | null): boolean => {
  // Si no hay email, retornamos false inmediatamente
  if (!email) return false;

  // Verificamos si el email termina con el dominio de la empresa
  // APP_CONFIG.COMPANY_DOMAIN contiene el dominio configurado (ej: "altipal.com.co")
  return email.endsWith(`@${APP_CONFIG.COMPANY_DOMAIN}`);
};

/**
 * Verifica si una ruta es pública (no requiere autenticación)
 *
 * @param pathname - La ruta a verificar
 * @returns boolean - true si la ruta es pública, false si es protegida
 *
 * @example
 * isPublicRoute("/login") // returns true
 * isPublicRoute("/dashboard") // returns false
 *
 * Las rutas públicas están definidas en APP_CONFIG.PUBLIC_ROUTES e incluyen:
 * - /login
 * - /register
 * - /forgot-password
 * - /two-factor
 * - /session-expired
 * - /account-pending
 */
export const isPublicRoute = (pathname: string): boolean => {
  // Verificamos si la ruta está incluida en la lista de rutas públicas
  // El 'as PublicRoute' es necesario para satisfacer el tipado de TypeScript
  return APP_CONFIG.PUBLIC_ROUTES.includes(pathname as PublicRoute);
};

/**
 * Nota: Este archivo contiene utilidades relacionadas con la autenticación y autorización
 * que son utilizadas principalmente por el middleware y otros componentes de la aplicación
 * que necesitan verificar permisos o validar accesos.
 *
 * Las funciones son puras y no tienen efectos secundarios, lo que las hace
 * fáciles de probar y mantener.
 */
