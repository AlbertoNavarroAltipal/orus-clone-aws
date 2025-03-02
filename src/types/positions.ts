/**
 * Tipos para la gestión de cargos
 */

/**
 * Estados posibles para un cargo
 */
export type PositionStatus = "Activo" | "Inactivo" | "Suspendido";

/**
 * Niveles de jerarquía para un cargo
 */
export type PositionLevel =
  | "Directivo"
  | "Gerencial"
  | "Jefatura"
  | "Operativo"
  | "Asistencial";

/**
 * Interfaz para departamentos relacionados con cargos
 */
export interface Department {
  id: string;
  name: string;
  description?: string;
}

/**
 * Interfaz para funciones/responsabilidades de un cargo
 */
export interface PositionResponsibility {
  id: string;
  description: string;
  primary: boolean;
}

/**
 * Interfaz para requisitos de un cargo
 */
export interface PositionRequirement {
  id: string;
  type: "Educación" | "Experiencia" | "Habilidad" | "Certificación" | "Otro";
  description: string;
  mandatory: boolean;
}

/**
 * Interfaz para etiquetas de un cargo
 */
export interface PositionTag {
  key: string;
  value: string;
}

/**
 * Interfaz para representar a un usuario asignado a un cargo
 */
export interface AssignedUser {
  id: string;
  username: string;
  name: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

/**
 * Interfaz principal para un cargo
 */
export interface Position {
  id: string;
  code: string;
  title: string;
  description?: string;
  status: PositionStatus;
  level: PositionLevel;
  department: Department;
  reportTo?: string; // ID del cargo al que reporta
  baseSalary?: number;
  salaryRange?: {
    min: number;
    max: number;
  };
  created: string;
  modified?: string;
  responsibilities: PositionResponsibility[];
  requirements: PositionRequirement[];
  assignedUsers: AssignedUser[];
  tags: PositionTag[];
  workLocation?: string;
  workSchedule?: string;
}
