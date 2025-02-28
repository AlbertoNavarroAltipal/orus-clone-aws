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
} as const;
