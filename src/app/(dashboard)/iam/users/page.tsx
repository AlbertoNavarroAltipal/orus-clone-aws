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
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";
import { UserStatus } from "@/types/users";

/**
 * Interfaz para la tabla de usuarios
 */
interface UserItem {
  id: string;
  username: string;
  name?: string;
  arn: string;
  groups: number;
  status: UserStatus;
  created: string;
  lastActivity?: string;
  mfaEnabled: boolean;
  consoleAccess: boolean;
  programmaticAccess: boolean;
}

/**
 * Página principal del módulo de usuarios
 * Muestra el listado completo de usuarios con opciones de filtrado y acciones
 */
export default function UsersPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<UserStatus | "Todos">(
    "Todos"
  );

  // Datos de ejemplo para los usuarios
  const usersData: UserItem[] = [
    {
      id: "u-1",
      username: "admin",
      name: "Administrador Principal",
      arn: "arn:aws:iam::123456789012:user/admin",
      groups: 3,
      status: "Activo",
      created: "15/01/2023",
      lastActivity: "Hace 2 horas",
      mfaEnabled: true,
      consoleAccess: true,
      programmaticAccess: true,
    },
    {
      id: "u-2",
      username: "developer",
      name: "Equipo de Desarrollo",
      arn: "arn:aws:iam::123456789012:user/developer",
      groups: 2,
      status: "Activo",
      created: "10/02/2023",
      lastActivity: "Hace 1 día",
      mfaEnabled: true,
      consoleAccess: true,
      programmaticAccess: true,
    },
    {
      id: "u-3",
      username: "readonly",
      name: "Usuario de Solo Lectura",
      arn: "arn:aws:iam::123456789012:user/readonly",
      groups: 1,
      status: "Activo",
      created: "05/03/2023",
      mfaEnabled: false,
      consoleAccess: true,
      programmaticAccess: false,
    },
    {
      id: "u-4",
      username: "testing",
      name: "Cuenta de Pruebas",
      arn: "arn:aws:iam::123456789012:user/testing",
      groups: 1,
      status: "Suspendido",
      created: "20/03/2023",
      mfaEnabled: false,
      consoleAccess: true,
      programmaticAccess: false,
    },
    {
      id: "u-5",
      username: "apiuser",
      name: "Usuario de API",
      arn: "arn:aws:iam::123456789012:user/apiuser",
      groups: 2,
      status: "Activo",
      created: "15/04/2023",
      lastActivity: "Hace 5 días",
      mfaEnabled: false,
      consoleAccess: false,
      programmaticAccess: true,
    },
  ];

  // Filtrar usuarios por término de búsqueda y estado
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === "Todos" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /**
   * Renderiza el badge de estado del usuario con el color apropiado
   */
  const renderStatusBadge = (status: UserStatus) => {
    let bgColor;

    switch (status) {
      case "Activo":
        bgColor =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      case "Inactivo":
        bgColor =
          "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400";
        break;
      case "Suspendido":
        bgColor =
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        break;
      case "Pendiente":
        bgColor =
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        break;
      default:
        bgColor =
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Main Title Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 dark:text-white">
            Usuarios
          </h1>
          <button
            className="inline-flex items-center text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
            title="Más información sobre usuarios"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Los usuarios son identidades creadas en IAM que representan a personas
          o aplicaciones que interactúan con los recursos de la plataforma.
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
                placeholder="Buscar usuarios"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as UserStatus | "Todos")
                }
                className="pl-3 pr-8 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Pendiente">Pendiente</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
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
              href="/iam/users/create"
              className="flex items-center px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Crear usuario</span>
              <span className="md:hidden">Crear</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Users Table - Con ajustes para responsive */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Usuario
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                  Nombre
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Estado
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                  Grupos
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  MFA
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                  Creación
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                  Última actividad
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                  >
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/iam/users/${user.username}`}
                        className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm font-medium"
                      >
                        {user.username}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white hidden md:table-cell">
                      {user.name || "-"}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {renderStatusBadge(user.status)}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white hidden lg:table-cell">
                      {user.groups}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {user.mfaEnabled ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4 mr-1" />
                          <span className="hidden md:inline">Activado</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600 dark:text-red-400">
                          <X className="h-4 w-4 mr-1" />
                          <span className="hidden md:inline">No activado</span>
                        </span>
                      )}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                      {user.created}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                      {user.lastActivity || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 md:px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron usuarios que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Versión más compacta y responsive */}
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-{filteredUsers.length} de {filteredUsers.length}{" "}
            usuarios
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
