"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Shield,
  Users,
  Server,
  Globe,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de menú específico para la sección de roles
 * Proporciona navegación entre los diferentes tipos de roles y funcionalidades relacionadas
 */
export default function RolesMenu() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    serviceRoles: true,
    userRoles: true,
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
          Roles
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Administre roles para servicios y entidades de la plataforma
        </p>
      </div>

      <div className="px-2">
        {/* Crear rol */}
        <Link
          href="/iam/roles/create"
          className="flex items-center p-2 mb-2 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors w-full justify-center text-sm font-medium"
        >
          Crear rol
        </Link>

        {/* Todos los roles */}
        <Link
          href="/iam/roles"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/iam/roles")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <Shield className="h-4 w-4 mr-2" />
          Todos los roles
        </Link>

        {/* Roles de servicio */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("serviceRoles")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Server className="h-4 w-4 mr-2" />
              <span>Roles de servicio</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.serviceRoles ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.serviceRoles && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/roles/service/ec2"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/service/ec2")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                EC2
              </Link>
              <Link
                href="/iam/roles/service/lambda"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/service/lambda")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Lambda
              </Link>
              <Link
                href="/iam/roles/service/database"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/service/database")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Base de datos
              </Link>
            </div>
          )}
        </div>

        {/* Roles de usuario */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("userRoles")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Roles de entidad</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.userRoles ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.userRoles && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/roles/entity/web-identity"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/entity/web-identity")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Identidad web
              </Link>
              <Link
                href="/iam/roles/entity/saml"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/entity/saml")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Federación SAML
              </Link>
              <Link
                href="/iam/roles/entity/custom"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/roles/entity/custom")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Identidad personalizada
              </Link>
            </div>
          )}
        </div>

        {/* Roles recientes */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Accedidos recientemente
          </h3>
          <Link
            href="/iam/roles/EC2ServerRole"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            EC2ServerRole
          </Link>
          <Link
            href="/iam/roles/DatabaseAccessRole"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Database className="h-4 w-4 mr-2" />
            DatabaseAccessRole
          </Link>
          <Link
            href="/iam/roles/WebIdentityRole"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Globe className="h-4 w-4 mr-2" />
            WebIdentityRole
          </Link>
        </div>
      </div>
    </div>
  );
}
