// src/lib/auth-errors.ts

export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const AuthErrors = {
  USER_NOT_FOUND: new AuthError("Usuario no encontrado", "user_not_found"),
  INVALID_PASSWORD: new AuthError("Contraseña incorrecta", "invalid_password"),
  USER_INACTIVE: new AuthError("Usuario inactivo", "user_inactive"),
  INVALID_CREDENTIALS: new AuthError(
    "Credenciales inválidas",
    "invalid_credentials"
  ),
  SERVER_ERROR: new AuthError("Error del servidor", "server_error"),

  // Errores específicos para la autenticación de Google
  DOMAIN_UNAUTHORIZED: new AuthError(
    "Esta aplicación está restringida únicamente para empleados de Altipal SAS. Por favor, utiliza tu correo corporativo.",
    "domain_unauthorized"
  ),
  ORG_INTERNAL: new AuthError(
    "Esta aplicación está restringida únicamente para empleados de Altipal SAS. Por favor, utiliza tu correo corporativo.",
    "org_internal"
  ),
  ACCESS_DENIED: new AuthError(
    "Acceso denegado. Verifica que estés utilizando una cuenta autorizada.",
    "access_denied"
  ),
  HD_MISMATCH: new AuthError(
    "El correo electrónico no pertenece al dominio autorizado para esta aplicación.",
    "hd_mismatch"
  ),
  USER_CREATION_FAILED: new AuthError(
    "No se pudo crear el usuario en la base de datos.",
    "user_creation_failed"
  ),
  USER_FETCH_FAILED: new AuthError(
    "No se pudo obtener la información del usuario desde la base de datos.",
    "user_fetch_failed"
  ),
} as const;

// Mapa de errores para NextAuth
export interface ErrorInfo {
  title: string;
  description: string;
}

export const authErrorMap: Record<string, ErrorInfo> = {
  Default: {
    title: "Error de autenticación",
    description:
      "Ha ocurrido un error durante el proceso de autenticación. Por favor intenta de nuevo.",
  },
  AccessDenied: {
    title: "Dominio no autorizado",
    description: AuthErrors.DOMAIN_UNAUTHORIZED.message,
  },
  OAuthSignin: {
    title: "Error al iniciar sesión",
    description:
      "Ocurrió un error al iniciar el proceso de autenticación. Por favor intenta de nuevo.",
  },
  OAuthCallback: {
    title: "Error en la respuesta de autenticación",
    description:
      "Hubo un problema con la respuesta del proveedor de autenticación.",
  },
  OAuthCreateAccount: {
    title: "Error al crear la cuenta",
    description:
      "No se pudo crear una cuenta vinculada con tu proveedor de autenticación.",
  },
  CredentialsSignin: {
    title: "Credenciales inválidas",
    description: AuthErrors.INVALID_CREDENTIALS.message,
  },
  SessionRequired: {
    title: "Sesión requerida",
    description: "Debes iniciar sesión para acceder a esta página.",
  },
  // Errores específicos para dominios no autorizados
  org_internal: {
    title: "Dominio no autorizado",
    description: AuthErrors.ORG_INTERNAL.message,
  },
  hd_mismatch: {
    title: "Dominio no autorizado",
    description: AuthErrors.HD_MISMATCH.message,
  },
  domain_unauthorized: {
    title: "Dominio no autorizado",
    description: AuthErrors.DOMAIN_UNAUTHORIZED.message,
  },
  user_not_found: {
    title: "Usuario no encontrado",
    description: AuthErrors.USER_NOT_FOUND.message,
  },
  invalid_password: {
    title: "Contraseña incorrecta",
    description: AuthErrors.INVALID_PASSWORD.message,
  },
  user_inactive: {
    title: "Usuario inactivo",
    description: AuthErrors.USER_INACTIVE.message,
  },
  server_error: {
    title: "Error del servidor",
    description: AuthErrors.SERVER_ERROR.message,
  },
};
