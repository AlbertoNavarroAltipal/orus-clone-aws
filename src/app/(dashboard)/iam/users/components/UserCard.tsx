"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { UserCog, Tag, Users, Shield, Check, X } from "lucide-react";
import { UserStatus } from "@/types/users";

interface UserCardProps {
  id: string;
  username: string;
  name?: string;
  email?: string;
  status: UserStatus;
  groups: number;
  permissions: number;
  mfaEnabled: boolean;
  lastActivity?: string;
  className?: string;
}

/**
 * Componente de tarjeta para visualizar un usuario
 * Puede utilizarse en listas, dashboards o como componente destacado
 */
export default function UserCard({
  id,
  username,
  name,
  email,
  status,
  groups,
  permissions,
  mfaEnabled,
  lastActivity,
  className = "",
}: UserCardProps) {
  /**
   * Renderiza el badge de estado del usuario con el color apropiado
   */
  const renderStatusBadge = () => {
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
    <Card
      className={`border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
              <UserCog className="h-5 w-5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Link
                href={`/iam/users/${username}`}
                className="text-lg font-medium text-[#0073bb] dark:text-[#45a3e6] hover:underline truncate"
              >
                {username}
              </Link>
              {renderStatusBadge()}
            </div>
            {name && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {name}
              </p>
            )}
            {email && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {email}
              </p>
            )}
            <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-4">
              <span className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                {groups} {groups === 1 ? "grupo" : "grupos"}
              </span>
              <span className="flex items-center">
                <Shield className="h-3.5 w-3.5 mr-1" />
                {permissions} {permissions === 1 ? "política" : "políticas"}
              </span>
              <span className="flex items-center">
                {mfaEnabled ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-green-500 dark:text-green-400" />
                    MFA activado
                  </>
                ) : (
                  <>
                    <X className="h-3.5 w-3.5 mr-1 text-red-500 dark:text-red-400" />
                    Sin MFA
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {lastActivity
              ? `Última actividad: ${lastActivity}`
              : "Sin actividad reciente"}
          </span>
          <Link
            href={`/iam/users/${username}/edit`}
            className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
          >
            Editar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
