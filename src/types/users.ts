/**
 * Tipos para la gestión de usuarios
 */

/**
 * Estados posibles para un usuario
 */
export type UserStatus = "Activo" | "Inactivo" | "Suspendido" | "Pendiente";

/**
 * Tipos de MFA disponibles para un usuario
 */
export type MFAType = "Ninguno" | "Virtual" | "Hardware" | "SMS";

/**
 * Tipos de credenciales de acceso
 */
export type AccessKeyStatus = "Activa" | "Inactiva" | "Expirada";

/**
 * Interfaz para grupos de usuarios
 */
export interface UserGroup {
  id: string;
  name: string;
  description?: string;
  policiesCount: number;
  usersCount: number;
  created: string;
}

/**
 * Interfaz para claves de acceso
 */
export interface AccessKey {
  id: string;
  status: AccessKeyStatus;
  created: string;
  lastUsed?: string;
  lastRotated?: string;
  expiresAt?: string;
}

/**
 * Interfaz para permisos asociados a un usuario
 */
export interface UserPermission {
  id: string;
  name: string;
  type: "Directa" | "Grupo" | "Rol";
  source: string;
}

/**
 * Interfaz para etiquetas de usuario
 */
export interface UserTag {
  key: string;
  value: string;
}

/**
 * Interfaz principal para un usuario
 */
export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  status: UserStatus;
  created: string;
  lastActivity?: string;
  passwordLastChanged?: string;
  mfaEnabled: boolean;
  mfaType: MFAType;
  arn: string;
  path?: string;
  groups: string[];
  permissions: UserPermission[];
  accessKeys: AccessKey[];
  tags: UserTag[];
  consoleAccess: boolean;
  programmaticAccess: boolean;
}
