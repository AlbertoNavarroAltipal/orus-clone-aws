"use client";

import { useState } from "react";
import {
  ArrowRight,
  Search,
  Settings,
  Download,
  Filter,
  Plus,
  RefreshCw,
  Info,
  Server,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";

/**
 * Tipos de roles para manejar la visualización de badges
 */
type RoleType = "Servicio" | "Web" | "SAML" | "Personalizado";

/**
 * Tipos de entidades para roles
 */
type RoleEntity = "AWS" | "Web" | "SAML" | "Personalizado";

/**
 * Interfaz para los datos de roles
 */
interface Role {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  entity: RoleEntity;
  created: string;
  modified?: string;
  policies: number;
}

/**
 * Página principal del módulo de roles
 * Muestra el listado completo de roles con opciones de filtrado y acciones
 */
export default function RolesPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para los roles
  const rolesData: Role[] = [
    {
      id: "r-1",
      name: "EC2ServerRole",
      description:
        "Permite a las instancias EC2 acceder a recursos específicos",
      type: "Servicio",
      entity: "AWS",
      created: "15/03/2023",
      modified: "22/07/2023",
      policies: 3,
    },
    {
      id: "r-2",
      name: "LambdaExecutionRole",
      description:
        "Proporciona permisos básicos para la ejecución de funciones Lambda",
      type: "Servicio",
      entity: "AWS",
      created: "05/04/2023",
      policies: 2,
    },
    {
      id: "r-3",
      name: "WebIdentityRole",
      description:
        "Permite a los usuarios de proveedores de identidad web asumir este rol",
      type: "Web",
      entity: "Web",
      created: "10/06/2023",
      modified: "18/01/2024",
      policies: 4,
    },
    {
      id: "r-4",
      name: "DatabaseAccessRole",
      description: "Proporciona acceso a servicios de bases de datos",
      type: "Servicio",
      entity: "AWS",
      created: "20/09/2023",
      policies: 2,
    },
    {
      id: "r-5",
      name: "SAMLFederationRole",
      description:
        "Permite federación con proveedor de identidad corporativo mediante SAML",
      type: "SAML",
      entity: "SAML",
      created: "01/12/2023",
      modified: "15/02/2024",
      policies: 5,
    },
  ];

  // Filtrar roles por término de búsqueda
  const filteredRoles = rolesData.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Renderiza el badge de tipo de rol con el color apropiado
   */
  const renderRoleTypeBadge = (type: RoleType) => {
    let bgColor;

    switch (type) {
      case "Servicio":
        bgColor =
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case "Web":
        bgColor =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      case "SAML":
        bgColor =
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        break;
      case "Personalizado":
        bgColor =
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
        break;
      default:
        bgColor =
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
      >
        {type}
      </span>
    );
  };

  /**
   * Renderiza el icono de entidad según el tipo
   */
  const renderEntityIcon = (entity: RoleEntity) => {
    switch (entity) {
      case "AWS":
        return <Server className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "Web":
        return <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "SAML":
        return (
          <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        );
      case "Personalizado":
        return (
          <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        );
      default:
        return <Server className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Main Title Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 dark:text-white">
            Roles
          </h1>
          <button
            className="inline-flex items-center text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
            title="Más información sobre roles"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Los roles son identidades que puede asumir un usuario, servicio o
          aplicación para obtener permisos específicos temporalmente.
        </p>
      </div>

      {/* Filter and Actions Bar */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar roles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0073bb] dark:hover:text-[#45a3e6]">
              <Filter className="h-4 w-4 mr-1" />
              Filtrar
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
            <button className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-[#0073bb] dark:hover:text-[#45a3e6]">
              <RefreshCw className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Refrescar</span>
            </button>
            <button className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-[#0073bb] dark:hover:text-[#45a3e6]">
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Exportar</span>
            </button>
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="h-4 w-4" />
            </button>
            <Link
              href="/iam/roles/create"
              className="flex items-center px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Crear rol</span>
              <span className="md:hidden">Crear</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Roles Table - Con ajustes para responsive */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Nombre
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Descripción
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Tipo
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                  Entidad
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                  Creación
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Políticas
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                  >
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/iam/roles/${role.name}`}
                        className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                      >
                        {role.name}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white max-w-[150px] md:max-w-[250px] lg:max-w-[400px] truncate">
                      {role.description}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {renderRoleTypeBadge(role.type)}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center">
                        {renderEntityIcon(role.entity)}
                        <span className="ml-1.5 text-sm text-gray-700 dark:text-gray-300">
                          {role.entity}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                      {role.created}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white text-center">
                      {role.policies}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 md:px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron roles que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Versión más compacta y responsive */}
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-{filteredRoles.length} de {filteredRoles.length} roles
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <button
              className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled
            >
              ←
            </button>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
              1
            </span>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Table Preferences Modal */}
      <TablePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </div>
  );
}
