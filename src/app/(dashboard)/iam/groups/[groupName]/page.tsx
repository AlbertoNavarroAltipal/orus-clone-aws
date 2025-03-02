"use client";

import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Edit,
  Trash,
  AlertTriangle,
  Users,
  Shield,
  Tag,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { UserGroup } from "@/types/users";

/**
 * Página de detalles de un grupo específico
 * Permite visualizar y gestionar la configuración completa del grupo
 */
export default function GroupDetailPage() {
  const params = useParams();
  const groupName = params.groupName as string;

  // Estados para controlar la interfaz
  const [activeTab, setActiveTab] = useState<
    "summary" | "users" | "permissions" | "tags"
  >("summary");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Datos de ejemplo del grupo (en una aplicación real, estos vendrían de una API)
  const groupData = {
    id: "g1",
    name: groupName,
    description: "Grupo con acceso administrativo completo al sistema.",
    created: "15 Enero 2023, 14:32:45 UTC",
    modified: "22 Julio 2023, 09:15:22 UTC",
    arn: `arn:aws:iam::123456789012:group/${groupName}`,
    users: [
      { id: "u1", username: "admin", name: "Administrador Principal" },
      { id: "u2", username: "jdoe", name: "John Doe" },
      { id: "u3", username: "msmith", name: "Maria Smith" },
    ],
    policies: [
      {
        id: "p1",
        name: "AdministratorAccess",
        type: "AWS Managed",
        description:
          "Proporciona acceso completo a todos los servicios y recursos de AWS",
      },
      {
        id: "p2",
        name: "PowerUserAccess",
        type: "AWS Managed",
        description:
          "Proporciona acceso completo excepto a la gestión de usuarios y grupos",
      },
      {
        id: "p3",
        name: "CustomAdminPolicy",
        type: "Customer Managed",
        description: "Política personalizada con permisos adicionales",
      },
    ],
    tags: [
      { key: "Department", value: "IT" },
      { key: "Role", value: "Administration" },
      { key: "Environment", value: "Production" },
    ],
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
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    {groupData.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-block mr-2">
                      Creado: {groupData.created}
                    </span>
                    {groupData.modified && (
                      <>
                        |
                        <span className="inline-block ml-2">
                          Modificado: {groupData.modified}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {groupData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    ARN del grupo
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-[#131e32] p-2 rounded border border-gray-200 dark:border-gray-700">
                    <code className="text-sm text-gray-800 dark:text-gray-200 flex-1 overflow-x-auto">
                      {groupData.arn}
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
                    Resumen
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {groupData.users.length} usuarios en este grupo
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {groupData.policies.length} políticas adjuntas
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {groupData.tags.length} etiquetas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usuarios - Vista resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Usuarios ({groupData.users.length})
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("users")}
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
                        Nombre de usuario
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre completo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {groupData.users.slice(0, 3).map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/users/${user.username}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {user.username}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Políticas - Vista resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Políticas adjuntas ({groupData.policies.length})
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("permissions")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Administrar
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
                        Descripción
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {groupData.policies.map((policy) => (
                      <tr
                        key={policy.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/policies/${policy.name}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {policy.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {policy.type}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                          {policy.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Etiquetas - Vista resumen */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Etiquetas ({groupData.tags.length})
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("tags")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Administrar
                </Link>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
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
                    {groupData.tags.map((tag, index) => (
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

      case "users":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Usuarios en el grupo
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Añadir usuarios
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre de usuario
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre completo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {groupData.users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/users/${user.username}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {user.username}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.name}
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

      case "permissions":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Políticas adjuntas
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Adjuntar políticas
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#131e32]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {groupData.policies.map((policy) => (
                      <tr
                        key={policy.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/iam/policies/${policy.name}`}
                            className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                          >
                            {policy.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {policy.type}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                          {policy.description}
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
                    {groupData.tags.map((tag, index) => (
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
    }
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
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
        <Link
          href="/iam/users/groups"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Grupos
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">{groupName}</span>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
          {groupData.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Copy className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Copiar ARN</span>
            <span className="sm:hidden">ARN</span>
          </button>
          <Link
            href={`/iam/users/groups/${groupName}/edit`}
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
              activeTab === "users"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
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
              activeTab === "tags"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("tags")}
          >
            Etiquetas
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
              <h3 className="text-lg font-medium">Eliminar grupo</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Está seguro de que desea eliminar el grupo{" "}
              <strong>{groupData.name}</strong>? Los usuarios asignados a este
              grupo perderán los permisos asociados.
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
