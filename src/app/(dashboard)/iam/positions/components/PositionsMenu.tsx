"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Briefcase,
  Users,
  Building,
  FileText,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de menú específico para la sección de cargos
 * Proporciona navegación entre las diferentes secciones de gestión de cargos
 */
export default function PositionsMenu() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    structure: true,
    reports: true,
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
          Cargos
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Administre los cargos y la estructura organizacional
        </p>
      </div>

      <div className="px-2">
        {/* Crear cargo */}
        <Link
          href="/positions/create"
          className="flex items-center p-2 mb-2 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors w-full justify-center text-sm font-medium"
        >
          Crear cargo
        </Link>

        {/* Todos los cargos */}
        <Link
          href="/positions"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/positions")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Todos los cargos
        </Link>

        {/* Estructura organizacional */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("structure")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              <span>Estructura organizacional</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.structure ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.structure && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/positions/departments"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/departments")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Departamentos
              </Link>
              <Link
                href="/positions/hierarchy"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/hierarchy")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Jerarquía
              </Link>
              <Link
                href="/positions/org-chart"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/org-chart")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Organigrama
              </Link>
            </div>
          )}
        </div>

        {/* Asignaciones */}
        <Link
          href="/positions/assignments"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/positions/assignments")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <Users className="h-4 w-4 mr-2" />
          Asignaciones
        </Link>

        {/* Informes y reportes */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("reports")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Informes</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.reports ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.reports && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/positions/reports/vacancies"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/reports/vacancies")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Vacantes
              </Link>
              <Link
                href="/positions/reports/salary"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/reports/salary")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Análisis salarial
              </Link>
              <Link
                href="/positions/reports/headcount"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/positions/reports/headcount")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Headcount
              </Link>
            </div>
          )}
        </div>

        {/* Plantillas */}
        <Link
          href="/positions/templates"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/positions/templates")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <FileText className="h-4 w-4 mr-2" />
          Plantillas
        </Link>

        {/* Cargos recientes */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Accedidos recientemente
          </h3>
          <Link
            href="/positions/POS-001"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Gerente General
          </Link>
          <Link
            href="/positions/POS-002"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Analista de Recursos Humanos
          </Link>
        </div>
      </div>
    </div>
  );
}
