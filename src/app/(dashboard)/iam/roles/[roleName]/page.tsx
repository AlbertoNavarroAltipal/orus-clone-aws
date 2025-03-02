"use client";

import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Download,
  Server,
  Globe,
  Edit,
  Trash,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

/**
 * Página de detalles de un rol específico
 * Permite visualizar y gestionar la configuración completa de un rol
 */
export default function RoleDetailPage() {
  const params = useParams();
  const roleName = params.roleName as string;

  // Estados para controlar la interfaz
  const [activeTab, setActiveTab] = useState<
    "summary" | "permissions" | "tags" | "trust"
  >("summary");
  const [showTrustPolicy, setShowTrustPolicy] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Datos de ejemplo del rol (en una aplicación real, estos vendrían de una API)
  const roleData = {
    name: roleName,
    arn: `arn:aws:iam::123456789012:role/${roleName}`,
    id: "AROA1234567890EXAMPLE",
    description: "Permite a las instancias EC2 acceder a recursos específicos",
    created: "15 Marzo 2023, 14:32:45 UTC",
    modified: "22 Julio 2023, 09:15:22 UTC",
    type: "Servicio",
    entity: "AWS",
    entityIcon: <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    policies: [
      { id: "p1", name: "AmazonS3ReadOnlyAccess", type: "AWS Managed" },
      { id: "p2", name: "CloudWatchAgentServerPolicy", type: "AWS Managed" },
      { id: "p3", name: "CustomS3Policy", type: "Customer Managed" },
    ],
    tags: [
      { key: "Environment", value: "Production" },
      { key: "Department", value: "Engineering" },
    ],
    trustPolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`,
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
                {roleData.entityIcon}
                <div>
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    {roleData.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-block mr-2">
                      Creado: {roleData.created}
                    </span>
                    |
                    <span className="inline-block ml-2">
                      Modificado: {roleData.modified}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {roleData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    ARN del rol
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-[#131e32] p-2 rounded border border-gray-200 dark:border-gray-700">
                    <code className="text-sm text-gray-800 dark:text-gray-200 flex-1 overflow-x-auto">
                      {roleData.arn}
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
                    ID del rol
                  </h3>
                  <div className="flex items-center bg-gray-50 dark:bg-[#131e32] p-2 rounded border border-gray-200 dark:border-gray-700">
                    <code className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                      {roleData.id}
                    </code>
                    <button
                      className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      title="Copiar al portapapeles"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Políticas Adjuntas - Vista Resumen */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Políticas adjuntas ({roleData.policies.length})
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
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tipo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {roleData.policies.map((policy) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Política de confianza - Vista Resumen */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  Política de confianza
                </h3>
                <Link
                  href="#"
                  onClick={() => setActiveTab("trust")}
                  className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
                >
                  Editar
                </Link>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowTrustPolicy(!showTrustPolicy)}
                  className="flex items-center justify-between w-full py-2 px-3 bg-gray-50 dark:bg-[#131e32] border border-gray-200 dark:border-gray-700 rounded-t text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1c293e]"
                >
                  <span>Mostrar política</span>
                  {showTrustPolicy ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showTrustPolicy && (
                  <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b p-3 bg-white dark:bg-[#172133]">
                    <pre className="text-xs overflow-x-auto p-3 bg-gray-50 dark:bg-[#131e32] rounded">
                      {roleData.trustPolicy}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "permissions":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Políticas de permisos
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
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                    {roleData.policies.map((policy) => (
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
                    {roleData.tags.map((tag, index) => (
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

      case "trust":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Política de confianza
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Editar política de confianza
              </button>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                La política de confianza define qué entidades pueden asumir este
                rol. Cuando una entidad asume un rol, recibe credenciales
                temporales con los permisos que tiene el rol.
              </p>

              <pre className="text-sm overflow-x-auto p-4 bg-gray-50 dark:bg-[#131e32] rounded border border-gray-200 dark:border-gray-700">
                {roleData.trustPolicy}
              </pre>
            </div>
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
          href="/iam/roles"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Roles
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">{roleName}</span>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
          {roleName}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Copy className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Copiar ARN</span>
            <span className="sm:hidden">ARN</span>
          </button>
          <Link
            href={`/iam/roles/${roleName}/edit`}
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
        <nav className="flex space-x-8">
          <button
            className={`py-3 border-b-2 font-medium text-sm ${
              activeTab === "summary"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Resumen
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm ${
              activeTab === "permissions"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("permissions")}
          >
            Permisos
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm ${
              activeTab === "tags"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("tags")}
          >
            Etiquetas
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm ${
              activeTab === "trust"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("trust")}
          >
            Relaciones de confianza
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
              <h3 className="text-lg font-medium">Eliminar rol</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Está seguro de que desea eliminar el rol{" "}
              <strong>{roleName}</strong>? Esta acción no se puede deshacer.
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
