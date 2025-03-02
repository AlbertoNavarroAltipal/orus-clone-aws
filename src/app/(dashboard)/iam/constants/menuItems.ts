import type { MenuItem } from "@/types/sidebar";

/**
 * Menú de navegación para el módulo IAM
 * Define la estructura de navegación con ítems, subítems, badges y otros elementos visuales
 */
export const iamMenuItems: MenuItem[] = [
  {
    title: "Identity and Access Management (IAM)",
    href: "/iam",
    icon: "shield",
  },
  {
    type: "subtitle",
    title: "ACCESO",
  },
  {
    title: "Usuarios",
    href: "/iam/users",
    icon: "users",
  },
  {
    title: "Grupos",
    href: "/iam/groups",
    icon: "Group",
  },
  {
    title: "Cargos",
    href: "/iam/positions",
    icon: "BookUser",
  },
  {
    title: "Roles",
    href: "/iam/roles",
    icon: "UserCog",
  },
  {
    title: "Políticas",
    href: "/iam/policies",
    icon: "fileText",
  },

  {
    type: "subtitle",
    title: "SEGURIDAD",
  },
  {
    title: "Claves de acceso",
    href: "/iam/credentials/access-keys",
    icon: "key",
  },
  {
    title: "MFA",
    href: "/iam/mfa",
    icon: "smartphone",
  },
  {
    type: "subtitle",
    title: "REPORTES",
  },
  {
    title: "Informes de credencial",
    href: "/iam/credential-report",
    icon: "fileText",
  },
  {
    title: "Analizador de acceso",
    href: "/iam/access-analyzer",
    icon: "search",
  },
  {
    type: "subtitle",
    title: "AYUDA",
  },
  {
    title: "Documentación",
    type: "external",
    href: "https://docs.example.com/iam",
    icon: "bookOpen",
    external: true,
  },
  {
    title: "Soporte",
    type: "external",
    href: "https://support.example.com",
    icon: "helpCircle",
    external: true,
  },
];
