// src/data/menuData.ts
import { MenuSection } from "@/types/megaMenu";

export const quickAccessSection: MenuSection = {
  id: "quick-access",
  title: "ACCESOS RÁPIDOS",
  items: [
    {
      id: "home",
      title: "Inicio",
      href: "/home",
      icon: "home",
      hasSubmenu: false,
    },
    {
      id: "recent",
      title: "Visitados recientemente",
      href: "/recent",
      icon: "clock",
      hasSubmenu: true,
    },
    {
      id: "favorites",
      title: "Favoritos",
      href: "/favorites",
      icon: "bookmark",
      hasSubmenu: true,
    },
  ],
};

export const mainMenuSections: MenuSection[] = [
  {
    id: "cloud-systems",
    title: "SYSTEMS",
    items: [
      // {
      //   id: "test",
      //   title: "Menu de ejemplo sin submenu",
      //   href: "/billing",
      //   icon: "barChart3",
      //   description:
      //     "Vea y pague facturas, analice y controle sus gastos y optimice sus costos",
      //   isFavorite: true,
      // },
      {
        id: "iam",
        title: "IAM",
        href: "/iam",
        icon: "shield",
        description: "Administrar el acceso a los recursos de ORUS",
        isFavorite: true,
        hasSubmenu: false,
        // children: [
        //   {
        //     id: "group-people",
        //     title: "Grupos de personas",
        //     href: "/iam/groups",
        //     parentId: "iam",
        //   },          {
        //     id: "people",
        //     title: "Personas",
        //     href: "/iam/people",
        //     parentId: "iam",
        //   },
        //   {
        //     id: "roles",
        //     title: "Roles",
        //     href: "/iam/roles",
        //     parentId: "iam",
        //   },
        //   {
        //     id: "policies",
        //     title: "Políticas",
        //     href: "/iam/policies",
        //     parentId: "iam",
        //   },
        //   {
        //     id: "job-positions",
        //     title: "Cargos",
        //     href: "/iam/job-positions",
        //     parentId: "iam",
        //   },
        // ],
      },
      {
        id: "systems-settings",
        title: "Ajustes del sistema",
        href: "/systems-settings",
        icon: "cog",
        description: "Configuración general del sistema",
        isFavorite: true,
        hasSubmenu: true,
        children: [
          {
            id: "access-logs",
            title: "Logs de acceso",
            href: "/systems-settings/access-logs",
            parentId: "systems-settings",
          },
          {
            id: "audit-logs",
            title: "Logs de auditoría",
            href: "/systems-settings/audit-logs",
            parentId: "systems-settings",
          },
          {
            id: "modules",
            title: "Módulos",
            href: "/systems-settings/modules",
            parentId: "systems-settings",
          },
          {
            id: "notifications",
            title: "Notificaciones",
            href: "/systems-settings/notifications",
            parentId: "systems-settings",
          },
          {
            id: "integrations",
            title: "Integraciones",
            href: "/systems-settings/integrations",
            parentId: "systems-settings",
          },
          {
            id: "parameters",
            title: "Parámetros",
            href: "/systems-settings/parameters",
            parentId: "systems-settings",
          },
          {
            id: "security",
            title: "Seguridad",
            href: "/systems-settings/security",
            parentId: "systems-settings",
          },
          {
            id: "automation",
            title: "Automatización",
            href: "/systems-settings/automation",
            parentId: "systems-settings",
          },
          {
            id: "interface",
            title: "Interfaz",
            href: "/systems-settings/interfaz",
            parentId: "systems-settings",
          },
          {
            id:"database",
            title:"Base de datos",
            href:"/systems-settings/database",
            parentId:"systems-settings",
          },
          {
            id:"dimensions",
            title:"Dimensiones",
            href:"/systems-settings/dimensions",
            parentId:"systems-settings",
          }
        ],
      },

      
        
    ],
  },
  {
    id: "cloud-apps",
    title: "APLICACIONES",
    items: [
      {
        id: "project-management",
        title: "Gestión de proyectos",
        href: "/project-management",
        icon: "layout-list",
        description: "Administre sus proyectos y tareas",
        isFavorite: true,
      },
      {
        id: "helpdesk",
        title: "Mesa de ayuda",
        href: "/helpdesk",
        icon: "heart-handshake",
        description: "Administre sus tickets de soporte",
      },
      {
        id: "logistics-operations",
        title: "Operaciones logísticas",
        href: "/logistics-operations",
        icon: "truck",
        description: "Administre sus operaciones logísticas",
        hasSubmenu: true,
        children: [
          {
            id: "jumpal",
            title: "Jumpal",
            href: "/logistics-operations/jumpal",
            parentId: "logistics-operations",
          },
          {
            id: "dynamic-routing",
            title: "Ruteo dinámico",
            href: "/logistics-operations/dynamic-routing",
            parentId: "logistics-operations",
          },
        ],
      },
      {
        id: "commercial",
        title: "Comercial",
        href: "/commercial",
        icon: "store",
        description: "Administre sus operaciones comerciales",
        isFavorite: true,
        hasSubmenu: true,
        children: [
          {
            id: "wallet-crosses",
            title: "Cruces de cartera",
            href: "/commercial/wallet-crosses",
            parentId: "commercial",
          },
        ],
      },
      {
        id: "treasury",
        title: "Tesorería",
        href: "/treasury",
        icon: "coins",
        description: "Administre su tesorería",
        isFavorite: true,
        hasSubmenu: true,
        children: [
          {
            id: "banks",
            title: "Bancos",
            href: "/treasury/banks",
            parentId: "treasury",
          },
          {
            id: "transaction-verification",
            title: "Verificación de transacciones",
            href: "/treasury/transaction-verification",
            parentId: "treasury",
          },
        ],
      }

    ],
  },
];
