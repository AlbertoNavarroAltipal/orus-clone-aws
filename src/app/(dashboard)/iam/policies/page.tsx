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
} from "lucide-react";
import Link from "next/link";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";

/**
 * Tipos de políticas para manejar la visualización de badges
 */
type PolicyType = "Acción" | "Condición" | "Acceso";

/**
 * Interfaz para los datos de políticas
 */
interface Policy {
  id: string;
  name: string;
  description: string;
  type: PolicyType;
  created: string;
  modified?: string;
  usedBy: number;
}

/**
 * Página principal del módulo de políticas
 * Muestra el listado completo de políticas con opciones de filtrado y acciones
 */
export default function PoliciesPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para las políticas
  const policiesData: Policy[] = [
    {
      id: "p-1",
      name: "AmazonS3ReadOnlyAccess",
      description:
        "Proporciona acceso de solo lectura a todos los buckets de Amazon S3",
      type: "Acción",
      created: "01/01/2022",
      modified: "10/03/2023",
      usedBy: 23,
    },
    {
      id: "p-2",
      name: "AdminAccess",
      description:
        "Proporciona acceso completo a todos los servicios y recursos de AWS",
      type: "Condición",
      created: "01/01/2022",
      usedBy: 5,
    },
    {
      id: "p-3",
      name: "DatabaseReadOnly",
      description: "Acceso de solo lectura a los recursos de bases de datos",
      type: "Acción",
      created: "15/05/2023",
      modified: "22/10/2023",
      usedBy: 12,
    },
    {
      id: "p-4",
      name: "S3BucketBackupPolicy",
      description:
        "Permite hacer copias de seguridad de buckets S3 específicos",
      type: "Condición",
      created: "30/07/2023",
      usedBy: 3,
    },
    {
      id: "p-5",
      name: "EC2InstanceTerminationProtection",
      description: "Evita la terminación accidental de instancias EC2 críticas",
      type: "Acceso",
      created: "12/11/2023",
      modified: "28/02/2024",
      usedBy: 1,
    },
  ];

  // Filtrar políticas por término de búsqueda
  const filteredPolicies = policiesData.filter(
    (policy) =>
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Renderiza el badge de tipo de política con el color apropiado
   */
  const renderPolicyTypeBadge = (type: PolicyType) => {
    let bgColor;

    switch (type) {
      case "Acción":
        bgColor =
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
        break;
      case "Condición":
        bgColor =
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case "Acceso":
        bgColor =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
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

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Main Title Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 dark:text-white">
            Políticas
          </h1>
          <button
            className="inline-flex items-center text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
            title="Más información sobre políticas"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Las políticas definen permisos para las acciones, recursos y
          condiciones. Utilice las políticas para permitir o denegar el acceso a
          recursos de ORUS.
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
                placeholder="Buscar políticas"
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
              href="/iam/policies/create"
              className="flex items-center px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Crear política</span>
              <span className="md:hidden">Crear</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Policies Table - Con ajustes para responsive */}
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
                  Creación
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                  Modificación
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Usada
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                  >
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/iam/policies/${policy.name}`}
                        className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                      >
                        {policy.name}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white max-w-[150px] md:max-w-[250px] lg:max-w-[400px] truncate">
                      {policy.description}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {renderPolicyTypeBadge(policy.type)}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                      {policy.created}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                      {policy.modified || "-"}
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-900 dark:text-white text-center">
                      {policy.usedBy}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 md:px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron políticas que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Versión más compacta y responsive */}
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-{filteredPolicies.length} de {filteredPolicies.length}{" "}
            políticas
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
