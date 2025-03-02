"use client";

import { useState } from "react";
import {
  ArrowRight,
  Copy,
  Edit,
  Trash,
  AlertTriangle,
  Briefcase,
  Building,
  Users,
  CreditCard,
  FileText,
  User,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  Position,
  PositionResponsibility,
  PositionRequirement,
  PositionStatus,
  PositionLevel,
} from "@/types/positions";

/**
 * Página de detalles de un cargo específico
 * Permite visualizar y gestionar la configuración completa del cargo
 */
export default function PositionDetailPage() {
  const params = useParams();
  const positionId = params.positionId as string;

  // Estados para controlar la interfaz
  const [activeTab, setActiveTab] = useState<
    "summary" | "responsibilities" | "requirements" | "assignments" | "history"
  >("summary");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Datos de ejemplo del cargo (en una aplicación real, estos vendrían de una API)
  const positionData: Position = {
    id: positionId,
    code: "GG-001",
    title: "Gerente General",
    description:
      "Responsable de la dirección y gestión estratégica de la empresa",
    status: "Activo",
    level: "Directivo",
    department: {
      id: "DEP-001",
      name: "Gerencia General",
    },
    baseSalary: 120000,
    salaryRange: {
      min: 100000,
      max: 150000,
    },
    created: "05/01/2022",
    modified: "10/03/2023",
    responsibilities: [
      {
        id: "RESP-001",
        description:
          "Liderar la planificación estratégica, definir objetivos y establecer metas para la organización",
        primary: true,
      },
      {
        id: "RESP-002",
        description:
          "Supervisar la operación general y asegurar el cumplimiento de políticas y procedimientos",
        primary: true,
      },
      {
        id: "RESP-003",
        description:
          "Aprobar presupuestos y tomar decisiones financieras estratégicas",
        primary: true,
      },
      {
        id: "RESP-004",
        description:
          "Representar a la empresa ante terceros, clientes y socios comerciales",
        primary: true,
      },
      {
        id: "RESP-005",
        description:
          "Supervisar y coordinar el trabajo de los directores de área",
        primary: false,
      },
      {
        id: "RESP-006",
        description:
          "Asegurar el cumplimiento normativo y legal de la organización",
        primary: false,
      },
    ],
    requirements: [
      {
        id: "REQ-001",
        type: "Educación",
        description:
          "MBA o equivalente en Administración de Empresas, Economía o campos relacionados",
        mandatory: true,
      },
      {
        id: "REQ-002",
        type: "Experiencia",
        description:
          "10+ años en puestos de liderazgo, con al menos 5 años en posiciones directivas",
        mandatory: true,
      },
      {
        id: "REQ-003",
        type: "Habilidad",
        description: "Liderazgo estratégico y capacidad de toma de decisiones",
        mandatory: true,
      },
      {
        id: "REQ-004",
        type: "Habilidad",
        description: "Visión estratégica y pensamiento analítico",
        mandatory: true,
      },
      {
        id: "REQ-005",
        type: "Habilidad",
        description: "Negociación y resolución de conflictos",
        mandatory: true,
      },
      {
        id: "REQ-006",
        type: "Certificación",
        description: "Certificación en dirección de empresas (deseable)",
        mandatory: false,
      },
    ],
    assignedUsers: [
      {
        id: "U-001",
        username: "jramirez",
        name: "Juan Ramírez",
        startDate: "01/02/2022",
        isActive: true,
      },
    ],
    tags: [
      { key: "Area", value: "Dirección" },
      { key: "Criticidad", value: "Alta" },
      { key: "Sucesión", value: "Requerida" },
    ],
    workLocation: "Sede Central",
    workSchedule: "Tiempo completo",
  };

  /**
   * Renderiza el badge de estado del cargo con el color apropiado
   */
  const renderStatusBadge = (status: PositionStatus) => {
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

  /**
   * Renderiza el badge del nivel jerárquico con el color apropiado
   */
  const renderLevelBadge = (level: PositionLevel) => {
    let bgColor;

    switch (level) {
      case "Directivo":
        bgColor =
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        break;
      case "Gerencial":
        bgColor =
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case "Jefatura":
        bgColor =
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
        break;
      case "Operativo":
        bgColor =
          "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
        break;
      case "Asistencial":
        bgColor =
          "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
        break;
      default:
        bgColor =
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
      >
        {level}
      </span>
    );
  };

  /**
   * Formatea un valor numérico como moneda
   */
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      {positionData.title}
                    </h2>
                    {renderStatusBadge(positionData.status)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Código: {positionData.code} • {positionData.department.name}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {positionData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Información general
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Departamento
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {positionData.department.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nivel jerárquico
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {positionData.level}
                        </p>
                      </div>
                    </div>
                    {positionData.reportTo && (
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Reporta a
                          </p>
                          <Link
                            href={`/positions/${positionData.reportTo}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Director Ejecutivo
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Detalles
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Salario base
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {positionData.baseSalary
                            ? formatCurrency(positionData.baseSalary)
                            : "No especificado"}
                        </p>
                        {positionData.salaryRange && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                            Rango:{" "}
                            {formatCurrency(positionData.salaryRange.min)} -{" "}
                            {formatCurrency(positionData.salaryRange.max)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ubicación
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {positionData.workLocation || "No especificada"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Jornada
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {positionData.workSchedule || "No especificada"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Responsabilidades
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {positionData.responsibilities.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Primarias:{" "}
                          {
                            positionData.responsibilities.filter(
                              (r) => r.primary
                            ).length
                          }
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Secundarias:{" "}
                          {
                            positionData.responsibilities.filter(
                              (r) => !r.primary
                            ).length
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("responsibilities")}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Ver detalle
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Requisitos
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {positionData.requirements.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Obligatorios:{" "}
                          {
                            positionData.requirements.filter((r) => r.mandatory)
                              .length
                          }
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Deseables:{" "}
                          {
                            positionData.requirements.filter(
                              (r) => !r.mandatory
                            ).length
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("requirements")}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Ver detalle
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Asignaciones
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {positionData.assignedUsers.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Activos:{" "}
                          {
                            positionData.assignedUsers.filter((u) => u.isActive)
                              .length
                          }
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Vacantes:{" "}
                          {positionData.assignedUsers.length === 0 ? "1" : "0"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("assignments")}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Ver detalle
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case "responsibilities":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Responsabilidades del cargo
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Editar responsabilidades
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                Responsabilidades primarias
              </h3>
              <div className="space-y-3">
                {positionData.responsibilities
                  .filter((resp) => resp.primary)
                  .map((resp) => (
                    <div
                      key={resp.id}
                      className="flex items-start p-3 bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {resp.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                Responsabilidades secundarias
              </h3>
              <div className="space-y-3">
                {positionData.responsibilities
                  .filter((resp) => !resp.primary)
                  .map((resp) => (
                    <div
                      key={resp.id}
                      className="flex items-start p-3 bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {resp.description}
                      </p>
                    </div>
                  ))}
                {positionData.responsibilities.filter((resp) => !resp.primary)
                  .length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No hay responsabilidades secundarias definidas.
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case "requirements":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Requisitos del cargo
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Editar requisitos
              </button>
            </div>

            {/* Agrupar los requisitos por tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(
                new Set(positionData.requirements.map((req) => req.type))
              ).map((reqType) => (
                <div
                  key={reqType}
                  className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
                    {reqType}
                  </h3>
                  <div className="space-y-3">
                    {positionData.requirements
                      .filter((req) => req.type === reqType)
                      .map((req) => (
                        <div key={req.id} className="flex items-start">
                          <div
                            className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full ${
                              req.mandatory
                                ? "bg-red-500 dark:bg-red-600"
                                : "bg-yellow-500 dark:bg-yellow-600"
                            }`}
                          ></div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {req.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {req.mandatory ? "Obligatorio" : "Deseable"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "assignments":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Asignaciones
              </h2>
              <button className="px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                Asignar usuario
              </button>
            </div>

            {positionData.assignedUsers.length > 0 ? (
              <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-[#131e32]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Fecha inicio
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Fecha fin
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#172133] divide-y divide-gray-200 dark:divide-gray-700">
                      {positionData.assignedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Link
                              href={`/iam/users/${user.username}`}
                              className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm"
                            >
                              {user.username}
                            </Link>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.startDate}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.endDate || "-"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {user.isActive ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Activo
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                Inactivo
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                              Editar
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                              Desasignar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No hay usuarios asignados
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                    Este cargo no tiene ocupantes asignados actualmente. Puede
                    asignar un usuario para ocupar esta posición.
                  </p>
                  <button className="px-4 py-2 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium">
                    Asignar usuario
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "history":
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Historial del cargo
              </h2>
            </div>

            <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-8">
                  <div className="relative pl-10">
                    <div className="absolute left-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-50 dark:bg-[#131e32] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Modificación
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Se actualizó la descripción del cargo
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        10/03/2023 - 14:35 por admin@empresa.com
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-50 dark:bg-[#131e32] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Asignación
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Se asignó el usuario Juan Ramírez al cargo
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        01/02/2022 - 09:12 por admin@empresa.com
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-50 dark:bg-[#131e32] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Creación
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Se creó el cargo Gerente General
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        05/01/2022 - 10:45 por admin@empresa.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4 overflow-x-auto whitespace-nowrap">
        <Link
          href="/positions"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Cargos
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">
          {positionData.title}
        </span>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
            {positionData.title}
          </h1>
          {renderStatusBadge(positionData.status)}
          {renderLevelBadge(positionData.level)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Copy className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Duplicar</span>
            <span className="sm:hidden">Dupl.</span>
          </button>
          <Link
            href={`/positions/${positionData.id}/edit`}
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
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "summary"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Resumen
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "responsibilities"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("responsibilities")}
          >
            Responsabilidades
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "requirements"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            Requisitos
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "assignments"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("assignments")}
          >
            Asignaciones
          </button>
          <button
            className={`py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "history"
                ? "border-[#0073bb] text-[#0073bb] dark:border-[#45a3e6] dark:text-[#45a3e6]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Historial
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
              <h3 className="text-lg font-medium">Eliminar cargo</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Está seguro de que desea eliminar el cargo{" "}
              <strong>{positionData.title}</strong>? Esta acción no se puede
              deshacer.
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
