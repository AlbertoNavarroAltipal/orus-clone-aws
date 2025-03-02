"use client";

import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

/**
 * Página principal del módulo IAM
 * Muestra un panel de control con tarjetas para los principales servicios IAM
 */
export default function IAMPage() {
  return (
    <div className="p-6">
      {/* Breadcrumb
      <div className="flex items-center text-sm mb-4">
        <Link
          href="/dashboard"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Consola de administración
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">
          Identity and Access Management (IAM)
        </span>
      </div> */}

      {/* Main Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
            Identity and Access Management (IAM)
          </h1>
          <span className="text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline cursor-pointer">
            Información
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Administre de forma segura el acceso a los servicios y recursos para
          sus usuarios. IAM le proporciona flexibilidad para configurar el
          acceso según sus requisitos de seguridad específicos.
        </p>
      </div>

      {/* IAM Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <Card className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-[#172133]">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Usuarios
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Administre usuarios y sus información de cuenta
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <Link
              href="/iam/users"
              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline flex items-center"
            >
              Administrar usuarios
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>

        {/* Policies Card */}
        <Card className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-[#172133]">
          <div className="flex items-start mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg mr-4">
              <svg
                className="h-6 w-6 text-orange-600 dark:text-orange-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M9 15L11 17L15 13M8.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11985 19 7.8V16.2C19 17.8802 19 18.7202 18.673 19.362C18.3854 19.9265 17.9265 20.3854 17.362 20.673C16.7202 21 15.8802 21 14.2 21H9.8C8.11984 21 7.27976 21 6.63803 20.673C6.07354 20.3854 5.6146 19.9265 5.32698 19.362C5 18.7202 5 17.8802 5 16.2V7.8C5 6.11985 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H8.8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Políticas
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Defina permisos para modulos, servicios y recursos
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <Link
              href="/iam/policies"
              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline flex items-center"
            >
              Administrar políticas
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>

        {/* Roles Card */}
        <Card className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-[#172133]">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Roles
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Cree grupo de políticas y permisos para el acceso a recursos
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <Link
              href="/iam/roles"
              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline flex items-center"
            >
              Administrar roles
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Identity Security Section */}
      <div className="bg-gray-50 dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl text-gray-900 dark:text-white mb-4">
          Estado de seguridad de identidad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Security Recommendations */}
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <div className="w-full h-full bg-blue-500/20 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.5H12.01M12.5 9.5V13.5H11.5M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 mb-1">
                  Recomendaciones de seguridad
                </h3>
                <p className="text-gray-900 dark:text-white text-lg">
                  3 elementos pendientes
                </p>
                <Link
                  href="/iam/security-recommendations"
                  className="text-[#0073bb] dark:text-[#45a3e6] text-sm hover:underline mt-1 inline-block"
                >
                  Ver recomendaciones
                </Link>
              </div>
            </div>
          </div>

          {/* Last Security Check */}
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <div className="w-full h-full bg-green-500/20 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-gray-700 dark:text-gray-300 mb-1">
                  Última verificación de seguridad
                </h3>
                <p className="text-gray-900 dark:text-white text-lg">
                  Hace 2 días
                </p>
                <Link
                  href="/iam/security-check"
                  className="text-[#0073bb] dark:text-[#45a3e6] text-sm hover:underline mt-1 inline-block"
                >
                  Ejecutar verificación
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl text-gray-900 dark:text-white">
            Actividad reciente
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Evento
                </th>
                <th className="px-6 py-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Usuario
                </th>
                <th className="px-6 py-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Fecha
                </th>
                <th className="px-6 py-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  Política actualizada: AmazonS3ReadOnlyAccess
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  admin@altipal.com
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  Hace 3 horas
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completado
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  Creación de rol: EC2DataProcessing
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  developer@altipal.com
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  Ayer, 14:22
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completado
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  Rotación de clave de acceso
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  security@altipal.com
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  Hace 2 días
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    En proceso
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-end border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <button className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              ←
            </button>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
              1
            </span>
            <button className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
