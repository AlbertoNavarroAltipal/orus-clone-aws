"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  User,
  Users,
  Key,
  Shield,
  Lock,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de menú específico para la sección de usuarios
 * Proporciona navegación entre las diferentes secciones de gestión de usuarios
 */
export default function UsersMenu() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    accessManagement: true,
    securityCredentials: true,
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
          Usuarios
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Administre usuarios y sus credenciales de acceso
        </p>
      </div>

      <div className="px-2">
        {/* Crear usuario */}
        <Link
          href="/iam/users/create"
          className="flex items-center p-2 mb-2 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors w-full justify-center text-sm font-medium"
        >
          Crear usuario
        </Link>

        {/* Todos los usuarios */}
        <Link
          href="/iam/users"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/iam/users")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <Users className="h-4 w-4 mr-2" />
          Todos los usuarios
        </Link>

        {/* Gestión de acceso */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("accessManagement")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Gestión de acceso</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.accessManagement ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.accessManagement && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/users/groups"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/groups")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Grupos
              </Link>
              <Link
                href="/iam/users/permissions"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/permissions")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Permisos
              </Link>
              <Link
                href="/iam/users/boundaries"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/boundaries")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Límites de permisos
              </Link>
            </div>
          )}
        </div>

        {/* Credenciales de seguridad */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("securityCredentials")}
            className="flex items-center justify-between p-2 w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              <span>Credenciales</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.securityCredentials ? "rotate-90" : ""
              )}
            />
          </button>

          {expandedSections.securityCredentials && (
            <div className="pl-8 space-y-1 mt-1">
              <Link
                href="/iam/users/access-keys"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/access-keys")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Claves de acceso
              </Link>
              <Link
                href="/iam/users/mfa"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/mfa")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                MFA
              </Link>
              <Link
                href="/iam/users/password-policy"
                className={cn(
                  "block p-2 rounded text-sm",
                  isActive("/iam/users/password-policy")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Política de contraseñas
              </Link>
            </div>
          )}
        </div>

        {/* Informes y monitoreo */}
        <Link
          href="/iam/users/reports"
          className={cn(
            "flex items-center p-2 mb-1 rounded text-sm",
            isActive("/iam/users/reports")
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Informes de credenciales
        </Link>

        {/* Usuario actual */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Usuario actual
          </h3>
          <Link
            href="/iam/users/current"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <User className="h-4 w-4 mr-2" />
            Mi perfil
          </Link>
          <Link
            href="/iam/users/current/security"
            className="flex items-center p-2 mb-1 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Lock className="h-4 w-4 mr-2" />
            Credenciales de seguridad
          </Link>
        </div>
      </div>
    </div>
  );
}
