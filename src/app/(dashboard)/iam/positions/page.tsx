"use client";

import { useState } from "react";
import {
  Search,
  Settings,
  Download,
  Filter,
  Plus,
  RefreshCw,
  Info,
  Briefcase,
  Building,
  Users,
} from "lucide-react";
import Link from "next/link";
import TablePreferencesModal from "@/components/ui/TablePreferencesModal";
import { Position, PositionStatus, PositionLevel } from "@/types/positions";

/**
 * Página principal del módulo de cargos
 * Muestra el listado completo de cargos con opciones de filtrado y acciones
 */
export default function PositionsPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<PositionStatus | "Todos">(
    "Todos"
  );
  const [filterDepartment, setFilterDepartment] = useState<string>("Todos");

  // Datos de ejemplo para los cargos
  const positionsData: Position[] = [
    {
      id: "POS-001",
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
          description: "Liderar la planificación estratégica",
          primary: true,
        },
        {
          id: "RESP-002",
          description: "Supervisar la operación general",
          primary: true,
        },
      ],
      requirements: [
        {
          id: "REQ-001",
          type: "Educación",
          description: "MBA o equivalente",
          mandatory: true,
        },
        {
          id: "REQ-002",
          type: "Experiencia",
          description: "10+ años en puestos similares",
          mandatory: true,
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
      ],
      workLocation: "Sede Central",
      workSchedule: "Tiempo completo",
    },
    {
      id: "POS-002",
      code: "RH-001",
      title: "Analista de Recursos Humanos",
      description:
        "Gestiona los procesos de selección y administración del personal",
      status: "Activo",
      level: "Operativo",
      department: {
        id: "DEP-002",
        name: "Recursos Humanos",
      },
      baseSalary: 35000,
      salaryRange: {
        min: 30000,
        max: 40000,
      },
      created: "12/02/2022",
      reportTo: "POS-007",
      responsibilities: [
        {
          id: "RESP-003",
          description: "Gestionar procesos de reclutamiento",
          primary: true,
        },
        {
          id: "RESP-004",
          description: "Administrar contratos y documentación",
          primary: true,
        },
      ],
      requirements: [
        {
          id: "REQ-003",
          type: "Educación",
          description: "Grado en RRHH o Psicología",
          mandatory: true,
        },
        {
          id: "REQ-004",
          type: "Experiencia",
          description: "2+ años en RRHH",
          mandatory: true,
        },
      ],
      assignedUsers: [
        {
          id: "U-002",
          username: "mlopez",
          name: "María López",
          startDate: "15/02/2022",
          isActive: true,
        },
      ],
      tags: [
        { key: "Area", value: "RRHH" },
        { key: "Criticidad", value: "Media" },
      ],
      workLocation: "Oficina Central",
      workSchedule: "Tiempo completo",
    },
    {
      id: "POS-003",
      code: "FI-001",
      title: "Director Financiero",
      description:
        "Responsable de la planificación financiera y gestión económica de la empresa",
      status: "Activo",
      level: "Directivo",
      department: {
        id: "DEP-003",
        name: "Finanzas",
      },
      baseSalary: 85000,
      salaryRange: {
        min: 80000,
        max: 110000,
      },
      created: "10/03/2022",
      modified: "22/07/2023",
      responsibilities: [
        {
          id: "RESP-005",
          description: "Elaborar presupuestos anuales",
          primary: true,
        },
        {
          id: "RESP-006",
          description: "Supervisar operaciones contables",
          primary: true,
        },
      ],
      requirements: [
        {
          id: "REQ-005",
          type: "Educación",
          description: "Licenciatura en Finanzas o Contabilidad",
          mandatory: true,
        },
        {
          id: "REQ-006",
          type: "Experiencia",
          description: "8+ años en área financiera",
          mandatory: true,
        },
        {
          id: "REQ-007",
          type: "Certificación",
          description: "CPA o equivalente",
          mandatory: true,
        },
      ],
      assignedUsers: [
        {
          id: "U-003",
          username: "pgarcia",
          name: "Pablo García",
          startDate: "15/03/2022",
          isActive: true,
        },
      ],
      tags: [
        { key: "Area", value: "Finanzas" },
        { key: "Criticidad", value: "Alta" },
      ],
      workLocation: "Sede Principal",
      workSchedule: "Tiempo completo",
    },
    {
      id: "POS-004",
      code: "IT-001",
      title: "Desarrollador Senior",
      description: "Responsable del desarrollo y mantenimiento de aplicaciones",
      status: "Activo",
      level: "Operativo",
      department: {
        id: "DEP-004",
        name: "Tecnología",
      },
      baseSalary: 50000,
      salaryRange: {
        min: 45000,
        max: 65000,
      },
      created: "15/04/2022",
      reportTo: "POS-008",
      responsibilities: [
        {
          id: "RESP-007",
          description: "Desarrollar aplicaciones web y móviles",
          primary: true,
        },
        {
          id: "RESP-008",
          description: "Mantener código existente",
          primary: false,
        },
      ],
      requirements: [
        {
          id: "REQ-008",
          type: "Educación",
          description: "Ingeniería en Sistemas o similar",
          mandatory: true,
        },
        {
          id: "REQ-009",
          type: "Experiencia",
          description: "5+ años en desarrollo",
          mandatory: true,
        },
        {
          id: "REQ-010",
          type: "Habilidad",
          description: "JavaScript, React, NodeJS",
          mandatory: true,
        },
      ],
      assignedUsers: [
        {
          id: "U-004",
          username: "smartinez",
          name: "Sofía Martínez",
          startDate: "01/05/2022",
          isActive: true,
        },
        {
          id: "U-005",
          username: "ajuarez",
          name: "Andrés Juárez",
          startDate: "15/06/2022",
          isActive: true,
        },
      ],
      tags: [
        { key: "Area", value: "Tecnología" },
        { key: "Especialidad", value: "Desarrollo" },
      ],
      workLocation: "Oficina Tecnología",
      workSchedule: "Flexible",
    },
    {
      id: "POS-005",
      code: "MK-001",
      title: "Especialista en Marketing Digital",
      description:
        "Encargado de las estrategias de marketing en plataformas digitales",
      status: "Activo",
      level: "Operativo",
      department: {
        id: "DEP-005",
        name: "Marketing",
      },
      baseSalary: 38000,
      salaryRange: {
        min: 35000,
        max: 45000,
      },
      created: "20/05/2022",
      reportTo: "POS-009",
      responsibilities: [
        {
          id: "RESP-009",
          description: "Gestionar campañas digitales",
          primary: true,
        },
        {
          id: "RESP-010",
          description: "Analizar métricas y KPIs",
          primary: true,
        },
      ],
      requirements: [
        {
          id: "REQ-011",
          type: "Educación",
          description: "Licenciatura en Marketing o afines",
          mandatory: true,
        },
        {
          id: "REQ-012",
          type: "Experiencia",
          description: "3+ años en marketing digital",
          mandatory: true,
        },
        {
          id: "REQ-013",
          type: "Certificación",
          description: "Google Ads, Analytics",
          mandatory: false,
        },
      ],
      assignedUsers: [],
      tags: [
        { key: "Area", value: "Marketing" },
        { key: "Especialidad", value: "Digital" },
      ],
      workLocation: "Oficina Marketing",
      workSchedule: "Tiempo completo",
    },
  ];

  // Obtener departamentos únicos para el filtro
  const departments = [
    { id: "Todos", name: "Todos los departamentos" },
    ...(Array.from(
      new Set(positionsData.map((position) => position.department.id))
    )
      .map((id) => {
        const dept = positionsData.find(
          (pos) => pos.department.id === id
        )?.department;
        return dept ? { id: dept.id, name: dept.name } : null;
      })
      .filter(Boolean) as { id: string; name: string }[]),
  ];

  // Filtrar cargos según criterios
  const filteredPositions = positionsData.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (position.description &&
        position.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === "Todos" || position.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "Todos" ||
      position.department.id === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

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

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Main Title Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 dark:text-white">
            Cargos
          </h1>
          <button
            className="inline-flex items-center text-sm text-[#0073bb] dark:text-[#45a3e6] hover:underline"
            title="Más información sobre cargos"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Gestione los cargos de la organización, su estructura jerárquica y
          asignaciones.
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
                placeholder="Buscar cargos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as PositionStatus | "Todos")
                }
                className="pl-3 pr-8 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-3 pr-8 py-1.5 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
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
              href="/iam/positions/create"
              className="flex items-center px-3 py-1.5 bg-[#0073bb] dark:bg-[#0073bb] text-white rounded hover:bg-[#0062a3] dark:hover:bg-[#0062a3] transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Crear cargo</span>
              <span className="md:hidden">Crear</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Código
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Cargo
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Departamento
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Nivel
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Estado
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap text-center">
                  Ocupantes
                </th>
                <th className="px-3 md:px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                  Creación
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.length > 0 ? (
                filteredPositions.map((position) => (
                  <tr
                    key={position.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1c293e]"
                  >
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {position.code}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/positions/${position.id}`}
                        className="text-[#0073bb] dark:text-[#45a3e6] hover:underline text-sm font-medium flex items-center"
                      >
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        {position.title}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/positions/departments/${position.department.id}`}
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#0073bb] dark:hover:text-[#45a3e6]"
                      >
                        {position.department.name}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {renderLevelBadge(position.level)}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                      {renderStatusBadge(position.status)}
                    </td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="relative flex -space-x-2">
                          {position.assignedUsers.length > 0 ? (
                            <>
                              {position.assignedUsers
                                .slice(0, 2)
                                .map((user, idx) => (
                                  <div
                                    key={user.id}
                                    className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border border-white dark:border-gray-800"
                                    title={user.name}
                                  >
                                    {user.name.charAt(0)}
                                  </div>
                                ))}
                              {position.assignedUsers.length > 2 && (
                                <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border border-white dark:border-gray-800">
                                  +{position.assignedUsers.length - 2}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Vacante
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden lg:table-cell">
                      {position.created}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 md:px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No se encontraron cargos que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 md:p-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Mostrando 1-{filteredPositions.length} de {filteredPositions.length}{" "}
            cargos
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
