"use client";

import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Edit,
  Trash,
  Key,
  AlertTriangle,
  Shield,
  Tag,
  UserCog,
  Clock,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { User, UserPermission, UserTag, AccessKey } from "@/types/users";

/**
 * Página de detalles de un usuario específico
 * Permite visualizar y gestionar su configuración completa
 */
export default function UserDetailPage() {
  const params = useParams();
  const username = params.username as string;

  // Estados para controlar la interfaz
  const [activeTab, setActiveTab] = useState<
    "summary" | "permissions" | "groups" | "tags" | "security"
  >("summary");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Datos de ejemplo del usuario (en una aplicación real, estos vendrían de una API)
  const userData: User = {
    id: "u-1",
    username: username,
    name: "Administrador Principal",
    email: "admin@example.com",
    status: "Activo",
    created: "15 Enero 2023, 14:32:45 UTC",
    lastActivity: "Hace 2 horas",
    passwordLastChanged: "10 Diciembre 2023, 09:15:22 UTC",
    mfaEnabled: true,
    mfaType: "Virtual",
    arn: `arn:aws:iam::123456789012:user/${username}`,
    path: "/",
    groups: ["Admin", "Developers", "Support"],
    permissions: [
      { id: "p1", name: "AdministratorAccess", type: "Grupo", source: "Admin" },
      {
        id: "p2",
        name: "PowerUserAccess",
        type: "Grupo",
        source: "Developers",
      },
      { id: "p3", name: "ViewOnlyAccess", type: "Directa", source: "Directa" },
    ],
    accessKeys: [
      {
        id: "AKIAIOSFODNN7EXAMPLE",
        status: "Activa",
        created: "15 Enero 2023",
        lastUsed: "Hace 2 días",
        lastRotated: "15 Enero 2023",
      },
      {
        id: "AKIAI44QH8DHBEXAMPLE",
        status: "Inactiva",
        created: "10 Septiembre 2022",
        lastUsed: "Hace 3 meses",
        lastRotated: "10 Septiembre 2022",
      },
    ],
    tags: [
      { key: "Department", value: "IT" },
      { key: "Role", value: "Administrator" },
    ],
    consoleAccess: true,
    programmaticAccess: true,
  };

  /**
   * Renderiza el badge de estado del usuario con el color apropiado
   */
  const renderStatusBadge = () => {
    let bgColor;

    switch (userData.status) {
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
        {userData.status}
      </span>
    );
  };

  /**
   * Renderiza un badge para el tipo de permiso
   */
  const renderPermissionTypeBadge = (type: UserPermission["type"]) => {
    let bgColor;

    switch (type) {
      case "Directa":
        bgColor =
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case "Grupo":
        bgColor =
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        break;
      case "Rol":
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
   * Renderiza un badge para el estado de la clave de acceso
   */
  const renderAccessKeyStatusBadge = (status: AccessKey["status"]) => {
    let bgColor;

    switch (status) {
      case "Activa":
        bgColor =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      case "Inactiva":
        bgColor =
          "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400";
        break;
      case "Expirada":
        bgColor =
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
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

  /**
   * Renderiza el contenido según la pestaña activa
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                  <UserCog className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      {userData.username}
                    </h2>
                    {renderStatusBadge()}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userData.name}
                    {userData.email && ` • ${userData.email}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    ARN del usuario
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-[#131e32] p-2 rounded border border-gray-200 dark:border-gray-700">
                    <code className="text-sm text-gray-800 dark:text-gray-200 flex-1 overflow-x-auto">
                      {userData.arn}
                    </code>
                    <button
                      className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      title="Copiar al portapapeles"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Fechas importantes
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Creado: {userData.created}
                      </span>
                    </div>
                    {userData.lastActivity && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Última actividad: {userData.lastActivity}
                        </span>
                      </div>
                    )}
                    {userData.passwordLastChanged && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Contraseña cambiada: {userData.passwordLastChanged}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Grupos - Vista Resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Grupos ({userData.groups.length})
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("groups")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Administrar
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.groups.map((group, index) => (
                  <Link
                    key={index}
                    href={`/iam/users/groups/${group}`}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {group}
                  </Link>
                ))}
              </div>
            </div>

            {/* Permisos - Vista Resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Permisos ({userData.permissions.length})
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("permissions")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Ver todos
                </Link>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Política
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Origen
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {userData.permissions.map((permission) => (
                      <tr
                        key={permission.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/policies/${permission.name}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {permission.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {renderPermissionTypeBadge(permission.type)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {permission.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Claves de acceso - Vista Resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Credenciales de seguridad
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("security")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Administrar
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Consola de administración
                    </h4>
                    {userData.consoleAccess ? (
                      <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Habilitado
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 dark:text-red-400 text-sm">
                        <X className="h-4 w-4 mr-1" />
                        Deshabilitado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Última contraseña modificada:{" "}
                    {userData.passwordLastChanged || "Nunca"}
                  </div>
                </div>
                <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      MFA
                    </h4>
                    {userData.mfaEnabled ? (
                      <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        {userData.mfaType}
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 dark:text-red-400 text-sm">
                        <X className="h-4 w-4 mr-1" />
                        No activado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {userData.mfaEnabled
                      ? `Autenticación multifactor: ${userData.mfaType}`
                      : "Se recomienda activar MFA para mayor seguridad"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "permissions":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Permisos y políticas
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Adjuntar políticas
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Políticas adjuntas directamente
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Política
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {userData.permissions
                      .filter((permission) => permission.type === "Directa")
                      .map((permission) => (
                        <tr
                          key={permission.id}
                          className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Link
                              href={`/iam/policies/${permission.name}`}
                              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                            >
                              {permission.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                              Desadjuntar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Políticas adjuntas a través de grupos
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Política
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Grupo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {userData.permissions
                      .filter((permission) => permission.type === "Grupo")
                      .map((permission) => (
                        <tr
                          key={permission.id}
                          className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Link
                              href={`/iam/policies/${permission.name}`}
                              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                            >
                              {permission.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Link
                              href={`/iam/users/groups/${permission.source}`}
                              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                            >
                              {permission.source}
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "groups":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Pertenencia a grupos
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Añadir a grupo
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre del grupo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {userData.groups.map((group, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/users/groups/${group}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {group}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                            Eliminar del grupo
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "tags":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Etiquetas
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Administrar etiquetas
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Clave
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {userData.tags.map((tag, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tag.key}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {tag.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Credenciales de seguridad
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                  Cambiar contraseña
                </button>
                <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                  Crear clave de acceso
                </button>
              </div>
            </div>

            {/* Acceso a la consola */}
            <Card className="mb-6 bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  Acceso a la consola
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Estado de la contraseña
                    </p>
                    {userData.consoleAccess ? (
                      <button className="px-3 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        Deshabilitar
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        Habilitar
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MFA */}
            <Card className="mb-6 bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  Autenticación multifactor (MFA)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Estado de MFA
                    </p>
                    {userData.mfaEnabled ? (
                      <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Habilitado ({userData.mfaType})
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 dark:text-red-400 text-sm">
                        <X className="h-4 w-4 mr-1" />
                        No habilitado
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {userData.mfaEnabled ? (
                      <button className="px-3 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        Eliminar
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        Activar MFA
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claves de acceso */}
            <Card className="mb-6 bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  Claves de acceso
                </CardTitle>
                <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                  Crear clave
                </button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-[#131e32]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          ID de clave de acceso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Fecha de creación
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Último uso
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                      {userData.accessKeys.map((key) => (
                        <tr
                          key={key.id}
                          className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {key.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {renderAccessKeyStatusBadge(key.status)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {key.created}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {key.lastUsed || "Nunca"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {key.status === "Activa" ? (
                                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                                  Desactivar
                                </button>
                              ) : (
                                <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm">
                                  Activar
                                </button>
                              )}
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Breadcrumb */}
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
        <span className="text-gray-600 dark:text-gray-400">{username}</span>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
          {userData.username}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Copy className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Copiar ARN</span>
            <span className="sm:hidden">ARN</span>
          </button>
          <Link
            href={`/iam/users/${userData.username}/edit`}
            className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            <span>Editar</span>
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center px-3 py-1.5 border border-red-300 dark:border-red-700 rounded text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash className="h-4 w-4 mr-1.5" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "summary"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Resumen
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "permissions"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("permissions")}
          >
            Permisos
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "groups"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            Grupos
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "tags"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("tags")}
          >
            Etiquetas
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "security"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Seguridad
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        {renderTabContent()}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#172133] rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center text-red-600 dark:text-red-400 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Eliminar usuario</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Está seguro de que desea eliminar el usuario{" "}
              <strong>{userData.username}</strong>? Esta acción no se puede
              deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 border border-transparent rounded-md text-sm font-medium text-white">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
