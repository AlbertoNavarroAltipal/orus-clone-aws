/**
 * Interfaz que define la estructura de datos de un usuario
 */
export interface UserData {
  // Información personal
  firstName: string;
  lastName: string;
  dni?: string;
  birthDate?: string;
  gender?: string;
  profileImage?: string;

  // Información de contacto
  email: string;
  personalEmail?: string;
  phone?: string;

  // Información laboral
  jobTitle?: string;
  department?: string;
  management?: string;

  // Información comercial
  salesZone?: string;
  channel?: string;

  // Ubicación e información del sitio
  location?: string;
  country?: string;
  timezone?: string;
  language?: string;
  site?: string;
  cedi?: string;

  // Información de la cuenta
  lastAccess: string;
  accountCreated: string;
  mfaEnabled: boolean;

  // Preferencias de usuario
  notificationPreferences: {
    email: {
      security: boolean;
      marketing: boolean;
      updates: boolean;
      reports: boolean;
    };
    push: {
      security: boolean;
      marketing: boolean;
      updates: boolean;
      reports: boolean;
    };
  };

  // Configuración de bloqueo de pantalla
  screenLock?: {
    enabled: boolean;
    timeoutMinutes: number;
    requirePin: boolean;
    pin?: string;
    showClock: boolean;
    message?: string;
  };
}

/**
 * Interfaces para los datos del historial de inicios de sesión
 */
export interface LoginHistoryItem {
  id: number;
  date: string;
  ip: string;
  location: string;
  device: string;
  status: "success" | "failed";
}

/**
 * Interfaces para los datos del historial de actividades
 */
export interface ActivityHistoryItem {
  id: number;
  date: string;
  action: string;
  ip: string;
}

/**
 * Interfaces para los datos de dispositivos conectados
 */
export interface ConnectedDevice {
  id: number;
  name: string;
  type: "desktop" | "mobile" | "tablet" | "laptop";
  browser: string;
  os: string;
  lastActive: string;
  location: string;
  current: boolean;
}
