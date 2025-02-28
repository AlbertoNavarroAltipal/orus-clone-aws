"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";
import type { MenuItem } from "@/types/sidebar";
import { Search, Settings, ArrowRight } from "lucide-react";

const demoMenuItems: MenuItem[] = [
  {
    title: "Inicio",
    href: "/demo",
    icon: "home",
  },
  {
    type: "subtitle",
    title: "ANÁLISIS & REPORTES",
  },
  {
    title: "Dashboard",
    href: "/demo/dashboard",
    icon: "layoutDashboard",
    badge: {
      text: "Nuevo",
      color: "bg-green-500",
    },
  },
  {
    title: "Reportes",
    href: "/demo/reports",
    icon: "barChart3",
    badge: {
      text: 3,
      color: "bg-[#ec7211]",
    },
    children: [
      {
        title: "Ventas Diarias",
        href: "/demo/reports/daily",
        icon: "barChart3",
        badge: {
          text: "Live",
          color: "bg-red-500",
        },
      },
      {
        title: "Análisis",
        href: "/demo/reports/analysis",
        icon: "fileText",
        children: [
          {
            title: "Por Producto",
            href: "/demo/reports/analysis/product",
            dot: true,
          },
          {
            title: "Por Región",
            href: "/demo/reports/analysis/region",
            dot: true,
          },
          {
            title: "Por Cliente",
            href: "/demo/reports/analysis/customer",
            dot: true,
          },
        ],
      },
    ],
  },
  {
    type: "subtitle",
    title: "GESTIÓN DE DATOS",
  },
  {
    title: "Base de datos",
    href: "/demo/database",
    icon: "database",
    children: [
      {
        title: "Tablas",
        href: "/demo/database/tables",
        icon: "database",
        children: [
          {
            title: "Estructura",
            href: "/demo/database/tables/structure",
            icon: "gitBranch",
          },
          {
            title: "Consultas",
            href: "/demo/database/tables/queries",
            icon: "terminal",
            badge: {
              text: "Beta",
              color: "bg-purple-500",
            },
          },
          {
            title: "Optimización",
            href: "/demo/database/tables/optimization",
            icon: "settings",
            children: [
              {
                title: "Índices",
                href: "/demo/database/tables/optimization/indexes",
                dot: true,
              },
              {
                title: "Caché",
                href: "/demo/database/tables/optimization/cache",
                dot: true,
                badge: {
                  text: "New",
                  color: "bg-blue-500",
                },
              },
            ],
          },
        ],
      },
      {
        title: "Backups",
        href: "/demo/database/backups",
        icon: "hardDrive",
        badge: {
          text: "2",
          color: "bg-yellow-500",
        },
      },
    ],
  },
  {
    type: "subtitle",
    title: "ADMINISTRACIÓN",
  },
  {
    title: "Usuarios",
    href: "/demo/users",
    icon: "users",
    badge: {
      text: "99+",
      color: "bg-red-500",
    },
    children: [
      {
        title: "Listado",
        href: "/demo/users/list",
        icon: "users",
      },
      {
        title: "Roles",
        href: "/demo/users/roles",
        icon: "shield",
      },
      {
        title: "Permisos",
        href: "/demo/users/permissions",
        icon: "key",
      },
    ],
  },
  {
    title: "Configuración",
    href: "/demo/settings",
    icon: "settings",
  },
  {
    type: "subtitle",
    title: "AYUDA & SOPORTE",
  },
  {
    title: "Documentación",
    type: "external",
    href: "https://docs.example.com",
    icon: "bookOpen",
    external: true,
    badge: {
      text: "v2.0",
      color: "bg-blue-500",
    },
  },
  {
    title: "Soporte",
    type: "external",
    href: "https://support.example.com",
    icon: "externalLink",
    external: true,
    badge: {
      text: "24/7",
      color: "bg-green-500",
    },
  },
];

export default function DemoPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-72px)]">
      <Sidebar menuItems={demoMenuItems} />
      <div className="flex-1 p-6 bg-[#0f1b2d] overflow-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-4">
          <a href="#" className="text-[#0073bb] hover:underline">
            Administración de facturación y costos
          </a>
          <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-400">Nivel gratuito</span>
        </div>

        {/* Main Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-normal text-white">Free Tier</h1>
            <span className="text-sm text-[#0073bb] hover:underline cursor-pointer">
              Información
            </span>
          </div>
          <p className="text-gray-300">
            Realice un seguimiento de su uso en todos los servicios de AWS que
            ofrecen el nivel gratuito. Para ver los detalles de uso de todos los
            servicios de AWS más allá del nivel gratuito, consulte{" "}
            <a href="#" className="text-[#0073bb] hover:underline">
              Facturas
            </a>
            .
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#0f1b2d] border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl text-white mb-6">Resumen</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Left Column */}
            <div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0">
                  <div className="w-full h-full bg-blue-500/20 rounded"></div>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">
                    Uso mensual hasta la fecha
                  </h3>
                  <p className="text-white text-lg">
                    3 ofertas de servicio en uso
                  </p>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0">
                  <div className="w-full h-full bg-blue-500/20 rounded"></div>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">
                    Ofertas de servicios con límites de uso iguales o superiores
                  </h3>
                  <p className="text-white text-lg">0 de 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-[#0f1b2d] border border-gray-700 rounded-lg">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white">
                Ofertas de nivel gratuito en uso (3)
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar nombre de servicio"
                    className="pl-9 pr-4 py-1.5 bg-[#0f1b2d] border border-gray-700 rounded text-white text-sm w-80 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <Settings
                  className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => setIsPreferencesOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="px-6 py-3 text-sm font-normal text-gray-400">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-sm font-normal text-gray-400">
                    Uso actual
                  </th>
                  <th className="px-6 py-3 text-sm font-normal text-gray-400">
                    Uso previsto
                  </th>
                  <th className="px-6 py-3 text-sm font-normal text-gray-400">
                    Porcentaje de uso real de MTD
                  </th>
                  <th className="px-6 py-3 text-sm font-normal text-gray-400">
                    Porcentaje de uso previsto de MTD
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 text-white">
                    AWS Key Management Service
                  </td>
                  <td className="px-6 py-4 text-white">25 Requests</td>
                  <td className="px-6 py-4 text-white">70 Requests</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "13%" }}
                        ></div>
                      </div>
                      <span className="text-white">0.13%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <span className="text-white">0.35%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-end border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <button className="px-2 py-1 rounded hover:bg-gray-700">←</button>
              <span className="px-2 py-1 bg-gray-700 rounded text-white">
                1
              </span>
              <button className="px-2 py-1 rounded hover:bg-gray-700">→</button>
            </div>
          </div>
        </div>

        {/* Modal de Preferencias */}
        <TablePreferencesModal
          isOpen={isPreferencesOpen}
          onClose={() => setIsPreferencesOpen(false)}
        />
      </div>
    </div>
  );
}
