"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Info,
  Check,
  Server,
  Globe,
  Users,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type RoleTypeOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Step = "select-type" | "permissions" | "tags" | "review";

/**
 * Página para la creación de un nuevo rol
 * Implementa un wizard con múltiples pasos para la configuración
 */
export default function CreateRolePage() {
  const [currentStep, setCurrentStep] = useState<Step>("select-type");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [tags, setTags] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  // Opciones de tipos de roles
  const roleTypeOptions: RoleTypeOption[] = [
    {
      id: "aws-service",
      title: "Rol de servicio",
      description:
        "Permite que los servicios asuman este rol para realizar acciones en su nombre",
      icon: <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: "web-identity",
      title: "Rol de identidad web",
      description:
        "Permite a los usuarios autenticados por un proveedor de identidad web acceder a los servicios",
      icon: <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
      id: "saml",
      title: "Rol de federación SAML",
      description:
        "Permite a los usuarios federados a través de un proveedor de identidad SAML acceder a los servicios",
      icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    },
    {
      id: "custom",
      title: "Rol personalizado",
      description: "Crea un rol con una relación de confianza personalizada",
      icon: <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
    },
  ];

  // Políticas disponibles para seleccionar
  const availablePolicies = [
    {
      id: "policy1",
      name: "AmazonS3ReadOnlyAccess",
      description:
        "Proporciona acceso de solo lectura a todos los buckets de Amazon S3",
    },
    {
      id: "policy2",
      name: "AmazonEC2FullAccess",
      description: "Proporciona acceso completo a los recursos de Amazon EC2",
    },
    {
      id: "policy3",
      name: "AmazonRDSReadOnlyAccess",
      description:
        "Proporciona acceso de solo lectura a los recursos de Amazon RDS",
    },
    {
      id: "policy4",
      name: "AmazonDynamoDBFullAccess",
      description: "Proporciona acceso completo a los recursos de DynamoDB",
    },
  ];

  /**
   * Manejador para seleccionar un tipo de rol
   */
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  /**
   * Navegación al siguiente paso del wizard
   */
  const goToNextStep = () => {
    switch (currentStep) {
      case "select-type":
        setCurrentStep("permissions");
        break;
      case "permissions":
        setCurrentStep("tags");
        break;
      case "tags":
        setCurrentStep("review");
        break;
      case "review":
        // Aquí iría la lógica para enviar los datos del rol
        console.log("Rol creado:", {
          roleName,
          roleDescription,
          selectedType,
          selectedPolicies,
          tags,
        });
        // Redireccionar a la página de roles o mostrar confirmación
        break;
    }
  };

  /**
   * Navegación al paso anterior del wizard
   */
  const goToPreviousStep = () => {
    switch (currentStep) {
      case "permissions":
        setCurrentStep("select-type");
        break;
      case "tags":
        setCurrentStep("permissions");
        break;
      case "review":
        setCurrentStep("tags");
        break;
    }
  };

  /**
   * Manejador para cambiar la selección de políticas
   */
  const handlePolicyChange = (policyId: string) => {
    if (selectedPolicies.includes(policyId)) {
      setSelectedPolicies(selectedPolicies.filter((id) => id !== policyId));
    } else {
      setSelectedPolicies([...selectedPolicies, policyId]);
    }
  };

  /**
   * Manejador para añadir una nueva etiqueta
   */
  const addTag = () => {
    setTags([...tags, { key: "", value: "" }]);
  };

  /**
   * Manejador para actualizar una etiqueta existente
   */
  const updateTag = (index: number, field: "key" | "value", value: string) => {
    const newTags = [...tags];
    newTags[index][field] = value;
    setTags(newTags);
  };

  /**
   * Manejador para eliminar una etiqueta
   */
  const removeTag = (index: number) => {
    if (tags.length > 1) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };

  /**
   * Renderiza el paso actual del wizard
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "select-type":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Seleccione el tipo de rol
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              El tipo de rol determina quién puede asumir el rol y qué permisos
              tendrán.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {roleTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedType === option.id
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleTypeSelect(option.id)}
                >
                  <div className="flex items-start mb-2">
                    <div className="mr-3 mt-0.5">{option.icon}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </h3>
                        {selectedType === option.id && (
                          <Check className="ml-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "permissions":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Configurar detalles y permisos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ingrese un nombre para su rol y seleccione las políticas que desea
              adjuntar.
            </p>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="role-name"
              >
                Nombre del rol*
              </label>
              <input
                id="role-name"
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingrese un nombre para el rol"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="role-description"
              >
                Descripción
              </label>
              <textarea
                id="role-description"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describa el propósito de este rol"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Políticas de permisos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Seleccione las políticas que desea adjuntar a este rol.
              </p>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {availablePolicies.map((policy) => (
                  <div key={policy.id} className="p-4 flex items-start">
                    <input
                      type="checkbox"
                      id={`policy-${policy.id}`}
                      checked={selectedPolicies.includes(policy.id)}
                      onChange={() => handlePolicyChange(policy.id)}
                      className="h-4 w-4 mt-1 text-blue-600 dark:text-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor={`policy-${policy.id}`}
                      className="ml-3 flex-1"
                    >
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        {policy.name}
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {policy.description}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "tags":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Agregar etiquetas (opcional)
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Las etiquetas son pares de clave-valor que le ayudan a organizar y
              categorizar sus recursos.
            </p>

            <div className="mb-6 space-y-4">
              {tags.map((tag, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={tag.key}
                      onChange={(e) => updateTag(index, "key", e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Clave"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={tag.value}
                      onChange={(e) =>
                        updateTag(index, "value", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Valor"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    disabled={tags.length <= 1}
                  >
                    {tags.length > 1 ? "Eliminar" : ""}
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#131e32] hover:bg-gray-50 dark:hover:bg-[#1c293e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              Agregar etiqueta
            </button>
          </div>
        );

      case "review":
        const selectedTypeOption = roleTypeOptions.find(
          (option) => option.id === selectedType
        );
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Revisar y crear
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Revise la configuración de su rol antes de crearlo.
            </p>

            <div className="bg-gray-50 dark:bg-[#131e32] border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Tipo de rol
                </h3>
                <p className="text-base text-gray-900 dark:text-white">
                  {selectedTypeOption?.title || "No seleccionado"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Nombre del rol
                </h3>
                <p className="text-base text-gray-900 dark:text-white">
                  {roleName || "Sin nombre"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Descripción
                </h3>
                <p className="text-base text-gray-900 dark:text-white">
                  {roleDescription || "Sin descripción"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Políticas adjuntas ({selectedPolicies.length})
                </h3>
                {selectedPolicies.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-900 dark:text-white">
                    {selectedPolicies.map((policyId) => {
                      const policy = availablePolicies.find(
                        (p) => p.id === policyId
                      );
                      return <li key={policyId}>{policy?.name}</li>;
                    })}
                  </ul>
                ) : (
                  <p className="text-base text-gray-900 dark:text-white">
                    Sin políticas seleccionadas
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Etiquetas ({tags.filter((tag) => tag.key.trim()).length})
                </h3>
                {tags.some((tag) => tag.key.trim()) ? (
                  <ul className="text-gray-900 dark:text-white">
                    {tags
                      .filter((tag) => tag.key.trim())
                      .map((tag, index) => (
                        <li key={index} className="flex space-x-2">
                          <span className="font-medium">{tag.key}:</span>
                          <span>{tag.value}</span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-base text-gray-900 dark:text-white">
                    Sin etiquetas
                  </p>
                )}
              </div>
            </div>

            {(!roleName || selectedPolicies.length === 0) && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Corrija los siguientes problemas antes de continuar:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {!roleName && <li>El nombre del rol es obligatorio</li>}
                    {selectedPolicies.length === 0 && (
                      <li>Debe seleccionar al menos una política</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  /**
   * Renderiza los botones de navegación según el paso actual
   */
  const renderNavButtons = () => {
    const isNextDisabled =
      (currentStep === "select-type" && !selectedType) ||
      (currentStep === "permissions" && !roleName) ||
      (currentStep === "review" &&
        (!roleName || selectedPolicies.length === 0));

    return (
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={goToPreviousStep}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#131e32] hover:bg-gray-50 dark:hover:bg-[#1c293e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            currentStep === "select-type" ? "invisible" : ""
          }`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Atrás
        </button>

        <button
          type="button"
          onClick={goToNextStep}
          disabled={isNextDisabled}
          className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0073bb] hover:bg-[#0062a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {currentStep === "review" ? "Crear rol" : "Siguiente"}
          {currentStep !== "review" && <ArrowRight className="h-4 w-4 ml-2" />}
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link
          href="/iam"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          IAM
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link
          href="/iam/roles"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Roles
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">Crear rol</span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl font-normal text-gray-900 dark:text-white mb-6">
        Crear rol
      </h1>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "select-type"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {currentStep === "select-type" ? (
                "1"
              ) : (
                <Check className="h-5 w-5" />
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Tipo
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep !== "select-type"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "permissions"
                  ? "bg-blue-500 text-white"
                  : currentStep === "select-type"
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  : "bg-green-500 text-white"
              }`}
            >
              {currentStep === "permissions" ? (
                "2"
              ) : currentStep === "select-type" ? (
                "2"
              ) : (
                <Check className="h-5 w-5" />
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Permisos
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep === "tags" || currentStep === "review"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "tags"
                  ? "bg-blue-500 text-white"
                  : currentStep === "review"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {currentStep === "tags" ? (
                "3"
              ) : currentStep === "review" ? (
                <Check className="h-5 w-5" />
              ) : (
                "3"
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Etiquetas
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep === "review"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "review"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              4
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Revisar
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-white dark:bg-[#172133] border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          {renderCurrentStep()}
          {renderNavButtons()}
        </CardContent>
      </Card>
    </div>
  );
}
