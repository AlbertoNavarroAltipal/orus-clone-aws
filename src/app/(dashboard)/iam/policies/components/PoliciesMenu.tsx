"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Shield, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de menú específico para la sección de políticas
 * Proporciona navegación entre los diferentes tipos de políticas y funcionalidades relacionadas
 */
export default function PoliciesMenu() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    permissions: true,
    resources: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-gray-100 dark:bg-[#131e32] border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Políticas
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Administre políticas de permisos y control de acceso
        </p>
      </div>

      <div className="px-2">
        {/* Crear política */}
        <Link
          href="/iam/policies/create"
          className="flex items-center p-2 mb-2 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors w-full justify-center text-sm font-medium"
        >
          Crear política
        </Link>

        {/* Todas las políticas */}
        <Link
          href="/iam/policies"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/iam/policies")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <FileText className="h-4 w-4 mr-2" />
          Todas las políticas
        </Link>

        {/* Políticas administradas */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("permissions")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Políticas de permisos</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.permissions ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.permissions && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/policies/managed"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/managed")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Administradas por AWS
              </Link>
              <Link
                href="/iam/policies/customer-managed"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/customer-managed")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Administradas por el cliente
              </Link>
              <Link
                href="/iam/policies/inline"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/inline")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Políticas en línea
              </Link>
            </div>
          )}
        </div>

        {/* Políticas de control de recursos */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("resources")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Políticas de control</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.resources ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.resources && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/policies/scp"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/scp")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Políticas de control de servicios
              </Link>
              <Link
                href="/iam/policies/rcp"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/rcp")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Políticas de control de recursos
              </Link>
              <Link
                href="/iam/policies/permissions-boundaries"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/policies/permissions-boundaries")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Límites de permisos
              </Link>
            </div>
          )}
        </div>

        {/* Políticas recientes */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Accedidas recientemente
          </h3>
          <Link
            href="/iam/policies/AmazonS3ReadOnlyAccess"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            AmazonS3ReadOnlyAccess
          </Link>
          <Link
            href="/iam/policies/AdminAccess"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            AdminAccess
          </Link>
        </div>
      </div>
    </div>
  );
}
