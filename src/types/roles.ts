import { ReactNode } from "react";

/**
 * Tipos para roles
 */

/**
 * Tipos de roles
 */
export type RoleType = "Servicio" | "Web" | "SAML" | "Personalizado";

/**
 * Tipos de entidades para roles
 */
export type RoleEntity = "AWS" | "Web" | "SAML" | "Personalizado";

/**
 * Interfaz para las políticas asociadas a un rol
 */
export interface RolePolicy {
  id: string;
  name: string;
  type: string;
  description?: string;
}

/**
 * Interfaz para las etiquetas de un rol
 */
export interface RoleTag {
  key: string;
  value: string;
}

/**
 * Interfaz principal para un rol
 */
export interface Role {
  id: string;
  name: string;
  arn: string; // Amazon Resource Name
  description?: string;
  type: RoleType;
  entity: RoleEntity;
  entityIcon?: ReactNode;
  created: string;
  modified?: string;
  policies: RolePolicy[];
  tags: RoleTag[];
  trustPolicy: string;
}

/**
 * Opciones de tipo de rol para creación/edición
 */
export interface RoleTypeOption {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * Pasos en el wizard de creación de roles
 */
export type RoleCreationStep =
  | "select-type"
  | "permissions"
  | "tags"
  | "review";

/**
 * Estado del contexto de creación de roles
 */
export interface RoleCreationState {
  selectedType: string | null;
  roleName: string;
  roleDescription: string;
  selectedPolicies: string[];
  tags: RoleTag[];
  trustPolicy: string;
}
