"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Position,
  PositionStatus,
  PositionLevel,
  PositionTag,
  PositionResponsibility,
  PositionRequirement,
  Department,
} from "@/types/positions";

type Step = "details" | "responsibilities" | "requirements" | "tags" | "review";

/**
 * Página para la creación de un nuevo cargo
 * Implementa un wizard con múltiples pasos para la configuración completa
 */
export default function CreatePositionPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [positionData, setPositionData] = useState<{
    code: string;
    title: string;
    description: string;
    departmentId: string;
    level: PositionLevel;
    status: PositionStatus;
    reportTo?: string;
    baseSalary?: number;
    salaryRangeMin?: number;
    salaryRangeMax?: number;
    workLocation?: string;
    workSchedule?: string;
    responsibilities: PositionResponsibility[];
    requirements: PositionRequirement[];
    tags: PositionTag[];
  }>({
    code: "",
    title: "",
    description: "",
    departmentId: "",
    level: "Operativo",
    status: "Activo",
    responsibilities: [],
    requirements: [],
    tags: [],
  });

  // Datos de ejemplo para el formulario
  const departments: Department[] = [
    { id: "DEP-001", name: "Gerencia General" },
    { id: "DEP-002", name: "Recursos Humanos" },
    { id: "DEP-003", name: "Finanzas" },
    { id: "DEP-004", name: "Tecnología" },
    { id: "DEP-005", name: "Marketing" },
  ];

  const reportsToOptions = [
    { id: "", name: "Ninguno" },
    { id: "POS-001", name: "Director Ejecutivo" },
    { id: "POS-007", name: "Gerente de RRHH" },
    { id: "POS-008", name: "Gerente de Tecnología" },
    { id: "POS-009", name: "Director de Marketing" },
  ];

  // Manejadores de cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPositionData({ ...positionData, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPositionData({
      ...positionData,
      [name]: value === "" ? undefined : Number(value),
    });
  };

  // Manejo de responsabilidades
  const addResponsibility = () => {
    const newResponsibility: PositionResponsibility = {
      id: `resp-${Date.now()}`,
      description: "",
      primary: true,
    };
    setPositionData({
      ...positionData,
      responsibilities: [...positionData.responsibilities, newResponsibility],
    });
  };

  const handleResponsibilityChange = (
    id: string,
    field: keyof PositionResponsibility,
    value: any
  ) => {
    setPositionData({
      ...positionData,
      responsibilities: positionData.responsibilities.map((resp) =>
        resp.id === id ? { ...resp, [field]: value } : resp
      ),
    });
  };

  const removeResponsibility = (id: string) => {
    setPositionData({
      ...positionData,
      responsibilities: positionData.responsibilities.filter(
        (resp) => resp.id !== id
      ),
    });
  };

  // Manejo de requisitos
  const addRequirement = () => {
    const newRequirement: PositionRequirement = {
      id: `req-${Date.now()}`,
      type: "Educación",
      description: "",
      mandatory: true,
    };
    setPositionData({
      ...positionData,
      requirements: [...positionData.requirements, newRequirement],
    });
  };

  const handleRequirementChange = (
    id: string,
    field: keyof PositionRequirement,
    value: any
  ) => {
    setPositionData({
      ...positionData,
      requirements: positionData.requirements.map((req) =>
        req.id === id ? { ...req, [field]: value } : req
      ),
    });
  };

  const removeRequirement = (id: string) => {
    setPositionData({
      ...positionData,
      requirements: positionData.requirements.filter((req) => req.id !== id),
    });
  };

  // Manejo de etiquetas
  const addTag = () => {
    setPositionData({
      ...positionData,
      tags: [...positionData.tags, { key: "", value: "" }],
    });
  };

  const updateTag = (index: number, field: "key" | "value", value: string) => {
    const newTags = [...positionData.tags];
    newTags[index][field] = value;
    setPositionData({
      ...positionData,
      tags: newTags,
    });
  };

  const removeTag = (index: number) => {
    setPositionData({
      ...positionData,
      tags: positionData.tags.filter((_, i) => i !== index),
    });
  };

  // Navegación entre pasos del wizard
  const goToNextStep = () => {
    switch (currentStep) {
      case "details":
        setCurrentStep("responsibilities");
        break;
      case "responsibilities":
        setCurrentStep("requirements");
        break;
      case "requirements":
        setCurrentStep("tags");
        break;
      case "tags":
        setCurrentStep("review");
        break;
      case "review":
        handleSubmit();
        break;
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "responsibilities":
        setCurrentStep("details");
        break;
      case "requirements":
        setCurrentStep("responsibilities");
        break;
      case "tags":
        setCurrentStep("requirements");
        break;
      case "review":
        setCurrentStep("tags");
        break;
    }
  };

  // Envío final del formulario
  const handleSubmit = async () => {
    try {
      // Simula el envío de datos a API
      console.log("Cargo creado:", positionData);

      // En una implementación real, aquí iría una llamada a API
      // await createPosition(positionData);

      // Redireccionar a la página de cargos o a los detalles del cargo creado
      router.push(`/positions`);
    } catch (error) {
      console.error("Error creating position", error);
      // Manejo de errores
    }
  };

  // Validación básica
  const isDetailsValid =
    positionData.code.trim() !== "" &&
    positionData.title.trim() !== "" &&
    positionData.departmentId.trim() !== "";

  const isResponsibilitiesValid =
    positionData.responsibilities.length > 0 &&
    positionData.responsibilities.every(
      (resp) => resp.description.trim() !== ""
    );

  const isRequirementsValid =
    positionData.requirements.length > 0 &&
    positionData.requirements.every((req) => req.description.trim() !== "");

  const getDepartmentName = (id: string) => {
    return departments.find((dept) => dept.id === id)?.name || "";
  };

  // Formatear un valor numérico como moneda
  const formatCurrency = (value?: number) => {
    if (value === undefined) return "No especificado";

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Render condicional para cada paso del wizard
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "details":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Información básica del cargo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ingrese la información principal que define este cargo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="code"
                >
                  Código*
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={positionData.code}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ejemplo: GG-001"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="title"
                >
                  Título*
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={positionData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ejemplo: Gerente General"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="description"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={positionData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describa las principales responsabilidades y objetivos de este cargo"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="departmentId"
                >
                  Departamento*
                </label>
                <select
                  id="departmentId"
                  name="departmentId"
                  value={positionData.departmentId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione un departamento</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="level"
                >
                  Nivel jerárquico
                </label>
                <select
                  id="level"
                  name="level"
                  value={positionData.level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Directivo">Directivo</option>
                  <option value="Gerencial">Gerencial</option>
                  <option value="Jefatura">Jefatura</option>
                  <option value="Operativo">Operativo</option>
                  <option value="Asistencial">Asistencial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="status"
                >
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  value={positionData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Suspendido">Suspendido</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="reportTo"
                >
                  Reporta a
                </label>
                <select
                  id="reportTo"
                  name="reportTo"
                  value={positionData.reportTo || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {reportsToOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información salarial
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="baseSalary"
                  >
                    Salario base
                  </label>
                  <input
                    id="baseSalary"
                    name="baseSalary"
                    type="number"
                    value={positionData.baseSalary || ""}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ejemplo: 2000000"
                    min="0"
                    step="1000"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="salaryRangeMin"
                  >
                    Salario mínimo
                  </label>
                  <input
                    id="salaryRangeMin"
                    name="salaryRangeMin"
                    type="number"
                    value={positionData.salaryRangeMin || ""}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Mínimo del rango salarial"
                    min="0"
                    step="1000"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="salaryRangeMax"
                  >
                    Salario máximo
                  </label>
                  <input
                    id="salaryRangeMax"
                    name="salaryRangeMax"
                    type="number"
                    value={positionData.salaryRangeMax || ""}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Máximo del rango salarial"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información adicional
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="workLocation"
                  >
                    Ubicación de trabajo
                  </label>
                  <input
                    id="workLocation"
                    name="workLocation"
                    type="text"
                    value={positionData.workLocation || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ejemplo: Sede Central"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="workSchedule"
                  >
                    Jornada laboral
                  </label>
                  <input
                    id="workSchedule"
                    name="workSchedule"
                    type="text"
                    value={positionData.workSchedule || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ejemplo: Tiempo completo"
                  />
                </div>
              </div>
            </div>

            {!isDetailsValid && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Debe proporcionar al menos el código, título y
                      departamento del cargo.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "responsibilities":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Responsabilidades del cargo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Defina las principales funciones y responsabilidades que tendrá
              este cargo.
            </p>

            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={addResponsibility}
                className="inline-flex items-center px-3 py-2 border border-blue-300 dark:border-blue-700 shadow-sm text-sm font-medium rounded-md text-blue-700 dark:text-blue-300 bg-white dark:bg-[#131e32] hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar responsabilidad
              </button>
            </div>

            {positionData.responsibilities.length === 0 ? (
              <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No ha agregado ninguna responsabilidad. Haga clic en el botón
                  "Agregar responsabilidad" para comenzar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {positionData.responsibilities.map((resp, index) => (
                  <div
                    key={resp.id}
                    className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Responsabilidad #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeResponsibility(resp.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          htmlFor={`resp-desc-${resp.id}`}
                        >
                          Descripción
                        </label>
                        <textarea
                          id={`resp-desc-${resp.id}`}
                          value={resp.description}
                          onChange={(e) =>
                            handleResponsibilityChange(
                              resp.id,
                              "description",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Describa la responsabilidad de forma clara y concisa"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id={`resp-primary-${resp.id}`}
                          type="checkbox"
                          checked={resp.primary}
                          onChange={(e) =>
                            handleResponsibilityChange(
                              resp.id,
                              "primary",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label
                          htmlFor={`resp-primary-${resp.id}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Es una responsabilidad primaria
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isResponsibilitiesValid &&
              positionData.responsibilities.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mt-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Todas las responsabilidades deben tener una descripción.
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        );

      case "requirements":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Requisitos del cargo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Defina los requisitos y competencias necesarias para desempeñar
              este cargo.
            </p>

            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center px-3 py-2 border border-blue-300 dark:border-blue-700 shadow-sm text-sm font-medium rounded-md text-blue-700 dark:text-blue-300 bg-white dark:bg-[#131e32] hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar requisito
              </button>
            </div>

            {positionData.requirements.length === 0 ? (
              <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No ha agregado ningún requisito. Haga clic en el botón
                  "Agregar requisito" para comenzar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {positionData.requirements.map((req, index) => (
                  <div
                    key={req.id}
                    className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Requisito #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeRequirement(req.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          htmlFor={`req-type-${req.id}`}
                        >
                          Tipo de requisito
                        </label>
                        <select
                          id={`req-type-${req.id}`}
                          value={req.type}
                          onChange={(e) =>
                            handleRequirementChange(
                              req.id,
                              "type",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Educación">Educación</option>
                          <option value="Experiencia">Experiencia</option>
                          <option value="Habilidad">Habilidad</option>
                          <option value="Certificación">Certificación</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          htmlFor={`req-desc-${req.id}`}
                        >
                          Descripción
                        </label>
                        <textarea
                          id={`req-desc-${req.id}`}
                          value={req.description}
                          onChange={(e) =>
                            handleRequirementChange(
                              req.id,
                              "description",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Describa el requisito de forma clara y concisa"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          id={`req-mandatory-${req.id}`}
                          type="checkbox"
                          checked={req.mandatory}
                          onChange={(e) =>
                            handleRequirementChange(
                              req.id,
                              "mandatory",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label
                          htmlFor={`req-mandatory-${req.id}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Es un requisito obligatorio
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isRequirementsValid && positionData.requirements.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mt-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Todos los requisitos deben tener una descripción.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "tags":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Etiquetas del cargo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Asigne etiquetas personalizadas para clasificar y filtrar los
              cargos.
            </p>

            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center px-3 py-2 border border-blue-300 dark:border-blue-700 shadow-sm text-sm font-medium rounded-md text-blue-700 dark:text-blue-300 bg-white dark:bg-[#131e32] hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar etiqueta
              </button>
            </div>

            {positionData.tags.length === 0 ? (
              <div className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No ha agregado ninguna etiqueta. Haga clic en el botón
                  "Agregar etiqueta" para comenzar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {positionData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#172133] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Etiqueta #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          htmlFor={`tag-key-${index}`}
                        >
                          Clave
                        </label>
                        <input
                          id={`tag-key-${index}`}
                          type="text"
                          value={tag.key}
                          onChange={(e) =>
                            updateTag(index, "key", e.target.value)
                          }
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Ejemplo: Departamento"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          htmlFor={`tag-value-${index}`}
                        >
                          Valor
                        </label>
                        <input
                          id={`tag-value-${index}`}
                          type="text"
                          value={tag.value}
                          onChange={(e) =>
                            updateTag(index, "value", e.target.value)
                          }
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Ejemplo: Marketing"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "review":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Revisión del cargo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Revise la información ingresada antes de crear el cargo.
            </p>

            <Card>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Información básica
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Código:</span>{" "}
                      {positionData.code}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Título:</span>{" "}
                      {positionData.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Descripción:</span>{" "}
                      {positionData.description || "No especificada"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Departamento:</span>{" "}
                      {getDepartmentName(positionData.departmentId)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Nivel jerárquico:</span>{" "}
                      {positionData.level}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Estado:</span>{" "}
                      {positionData.status}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Reporta a:</span>{" "}
                      {reportsToOptions.find(
                        (opt) => opt.id === positionData.reportTo
                      )?.name || "Ninguno"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Información salarial
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Salario base:</span>{" "}
                      {formatCurrency(positionData.baseSalary)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Rango salarial:</span>{" "}
                      {formatCurrency(positionData.salaryRangeMin)} -{" "}
                      {formatCurrency(positionData.salaryRangeMax)}
                    </p>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 mt-6">
                      Información adicional
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Ubicación de trabajo:</span>{" "}
                      {positionData.workLocation || "No especificada"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Jornada laboral:</span>{" "}
                      {positionData.workSchedule || "No especificada"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Responsabilidades
                </h3>
                <ul className="list-disc list-inside">
                  {positionData.responsibilities.map((resp) => (
                    <li
                      key={resp.id}
                      className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    >
                      {resp.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Requisitos
                </h3>
                <ul className="list-disc list-inside">
                  {positionData.requirements.map((req) => (
                    <li
                      key={req.id}
                      className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    >
                      {req.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Etiquetas
                </h3>
                <ul className="list-disc list-inside">
                  {positionData.tags.map((tag) => (
                    <li
                      key={tag.key}
                      className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    >
                      <span className="font-medium">{tag.key}:</span>{" "}
                      {tag.value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Crear un nuevo cargo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Complete los siguientes pasos para crear un nuevo cargo en la
          organización.
        </p>
      </div>

      {renderCurrentStep()}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={goToPreviousStep}
          className={`inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-[#131e32] hover:bg-gray-50 dark:hover:bg-[#1d2d50] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1`}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </button>
        {currentStep !== "review" ? (
          <button
            type="button"
            onClick={goToNextStep}
            className={`inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1`}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className={`inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1`}
          >
            Crear cargo
          </button>
        )}
      </div>
    </div>
  );
}
