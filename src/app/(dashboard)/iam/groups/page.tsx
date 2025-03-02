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
  Users,
} from "lucide-react";
import Link from "next/link";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";
import { UserGroup } from "@/types/users";

/**
 * Página para la gestión de grupos de usuarios
 * Muestra un listado de grupos con sus detalles y opciones
 */
export default function UserGroupsPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para los grupos
  const groupsData: UserGroup[] = [
    {
      id: "g1",
      name: "Administrators",
      description: "Grupo con acceso administrativo completo",
      policiesCount: 5,
      usersCount: 3,
      created: "15/01/2023",
    },
    {
      id: "g2",
      name: "Developers",
      description:
        "Grupo para desarrolladores con permisos para recursos de desarrollo",
      policiesCount: 3,
      usersCount: 12,
      created: "20/02/2023",
    },
    {
      id: "g3",
      name: "ReadOnly",
      description: "Acceso de solo lectura a todos los recursos",
      policiesCount: 1,
      usersCount: 8,
      created: "05/03/2023",
    },
    {
      id: "g4",
      name: "Support",
      description: "Acceso para personal de soporte técnico",
      policiesCount: 2,
      usersCount: 5,
      created: "12/04/2023",
    },
    {
      id: "g5",
      name: "Billing",
      description: "Acceso para gestión de facturación y costos",
      policiesCount: 2,
      usersCount: 3,
      created: "01/05/2023",
    },
  ];

  // Filtrar grupos por término de búsqueda
  const filteredGroups = groupsData.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (group.description &&
        group.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Breadcrumb
      <div className="flex items-center text-sm mb-4">
        <Link
          href="/iam"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          IAM
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link
          href="/iam/users"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Usuarios
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">Grupos</span>
      </div> */}

      {/* Main Title Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 dark:text-white">
            Grupos de usuarios
          </h1>
          <button
            className="inline-flex items-center text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
            title="Más información sobre grupos"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Los grupos permiten asignar permisos a múltiples usuarios
          simultáneamente, facilitando la administración.
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
                placeholder="Buscar grupos"
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
              href="/iam/groups/create"
              className="flex items-center px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Crear grupo</span>
              <span className="md:hidden">Crear</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Nombre del grupo
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Descripción
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap text-center">
                  Usuarios
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap text-center">
                  Políticas
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                  Fecha de creación
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <tr
                    key={group.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                  >
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/iam/users/groups/${group.name}`}
                        className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm font-medium flex items-center"
                      >
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {group.name}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white max-w-[150px] md:max-w-[250px] lg:max-w-[400px] truncate">
                      {group.description || "-"}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white text-center">
                      {group.usersCount}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white text-center">
                      {group.policiesCount}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                      {group.created}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 md:px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron grupos que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-{filteredGroups.length} de {filteredGroups.length}{" "}
            grupos
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
