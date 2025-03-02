"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Server,
  Globe,
  Users,
  Shield,
  Tag,
  FileText,
  ExternalLink,
} from "lucide-react";
import { RoleType, RoleEntity } from "@/types/roles";

interface RoleCardProps {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  entity: RoleEntity;
  created: string;
  policiesCount: number;
  className?: string;
}

/**
 * Componente de tarjeta para visualizar un rol
 * Puede utilizarse en listas, dashboards o como componente destacado
 */
export default function RoleCard({
  id,
  name,
  description,
  type,
  entity,
  created,
  policiesCount,
  className = "",
}: RoleCardProps) {
  /**
   * Renderiza el icono apropiado según la entidad del rol
   */
  const renderEntityIcon = () => {
    switch (entity) {
      case "AWS":
        return <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case "Web":
        return <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />;
      case "SAML":
      case "Personalizado":
        return (
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        );
      default:
        return <Shield className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  /**
   * Renderiza el badge del tipo de rol con el color apropiado
   */
  const renderTypeBadge = () => {
    let bgColor;

    switch (type) {
      case "Servicio":
        bgColor =
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case "Web":
        bgColor =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      case "SAML":
        bgColor =
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        break;
      case "Personalizado":
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

  return (
    <Card
      className={`border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">{renderEntityIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Link
                href={`/iam/roles/${name}`}
                className="text-lg font-medium text-[#0073bb] dark:text-[#45a3e6] hover:underline truncate"
              >
                {name}
              </Link>
              {renderTypeBadge()}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-4">
              <span className="flex items-center">
                <FileText className="h-3.5 w-3.5 mr-1" />
                {policiesCount} políticas
              </span>
              <span className="flex items-center">
                <Tag className="h-3.5 w-3.5 mr-1" />
                {entity}
              </span>
              <span className="flex items-center">Creado: {created}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <Link
            href={`/iam/roles/${name}`}
            className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
          >
            Ver detalles
          </Link>
          <Link
            href={`/iam/roles/${name}/edit`}
            className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline flex items-center"
          >
            Editar
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
