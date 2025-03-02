"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, AlertCircle, Check } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Role, RoleTag } from "@/types/roles";

type Step = "details" | "permissions" | "tags" | "trust";

/**
 * Página para editar un rol existente
 * Implementa un wizard similar al de creación pero con datos pre-cargados
 */
export default function EditRolePage() {
  const params = useParams();
  const router = useRouter();
  const roleName = params.roleName as string;

  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [loading, setLoading] = useState(true);
  const [roleData, setRoleData] = useState<{
    name: string;
    description: string;
    policies: string[];
    tags: RoleTag[];
    trustPolicy: string;
  }>({
    name: "",
    description: "",
    policies: [],
    tags: [],
    trustPolicy: "",
  });

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

  // Simula la carga de datos del rol desde una API
  useEffect(() => {
    // En una implementación real, esto sería una llamada a API
    const fetchRoleData = async () => {
      setLoading(true);
      try {
        // Datos de ejemplo simulando respuesta de API
        const data = {
          name: roleName,
          description:
            "Permite a las instancias EC2 acceder a recursos específicos",
          policies: ["policy1", "policy2", "policy3"],
          tags: [
            { key: "Environment", value: "Production" },
            { key: "Department", value: "Engineering" },
          ],
          trustPolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`,
        };

        setRoleData(data);
      } catch (error) {
        console.error("Error fetching role data", error);
        // Manejo de errores aquí
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [roleName]);

  // Manejadores de cambios en el formulario
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleData({ ...roleData, name: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRoleData({ ...roleData, description: e.target.value });
  };

  const handlePolicyChange = (policyId: string) => {
    if (roleData.policies.includes(policyId)) {
      setRoleData({
        ...roleData,
        policies: roleData.policies.filter((id) => id !== policyId),
      });
    } else {
      setRoleData({
        ...roleData,
        policies: [...roleData.policies, policyId],
      });
    }
  };

  const handleTrustPolicyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRoleData({ ...roleData, trustPolicy: e.target.value });
  };

  // Manejo de etiquetas
  const addTag = () => {
    setRoleData({
      ...roleData,
      tags: [...roleData.tags, { key: "", value: "" }],
    });
  };

  const updateTag = (index: number, field: "key" | "value", value: string) => {
    const newTags = [...roleData.tags];
    newTags[index][field] = value;
    setRoleData({
      ...roleData,
      tags: newTags,
    });
  };

  const removeTag = (index: number) => {
    if (roleData.tags.length > 1) {
      setRoleData({
        ...roleData,
        tags: roleData.tags.filter((_, i) => i !== index),
      });
    }
  };

  // Navegación entre pasos del wizard
  const goToNextStep = () => {
    switch (currentStep) {
      case "details":
        setCurrentStep("permissions");
        break;
      case "permissions":
        setCurrentStep("tags");
        break;
      case "tags":
        setCurrentStep("trust");
        break;
      case "trust":
        handleSubmit();
        break;
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "permissions":
        setCurrentStep("details");
        break;
      case "tags":
        setCurrentStep("permissions");
        break;
      case "trust":
        setCurrentStep("tags");
        break;
    }
  };

  // Envío final del formulario
  const handleSubmit = async () => {
    try {
      // Simula el envío de datos a API
      console.log("Rol actualizado:", roleData);

      // En una implementación real, aquí iría una llamada a API
      // await updateRole(roleName, roleData);

      // Redireccionar a la página de detalles del rol actualizado
      router.push(`/iam/roles/${roleData.name}`);
    } catch (error) {
      console.error("Error updating role", error);
      // Manejo de errores
    }
  };

  // Render condicional para cada paso del wizard
  const renderCurrentStep = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (currentStep) {
      case "details":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Detalles del rol
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Modifique la información básica del rol.
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
                value={roleData.name}
                onChange={handleNameChange}
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
                value={roleData.description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Describa el propósito de este rol"
                rows={3}
              />
            </div>
          </div>
        );

      case "permissions":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Políticas de permisos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Seleccione las políticas que desea adjuntar a este rol.
            </p>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              {availablePolicies.map((policy) => (
                <div key={policy.id} className="p-4 flex items-start">
                  <input
                    type="checkbox"
                    id={`policy-${policy.id}`}
                    checked={roleData.policies.includes(policy.id)}
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
        );

      case "tags":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Etiquetas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Las etiquetas son pares de clave-valor que le ayudan a organizar y
              categorizar sus recursos.
            </p>

            <div className="mb-6 space-y-4">
              {roleData.tags.map((tag, index) => (
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
                    disabled={roleData.tags.length <= 1}
                  >
                    {roleData.tags.length > 1 ? "Eliminar" : ""}
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

      case "trust":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Política de confianza
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              La política de confianza define qué entidades pueden asumir este
              rol.
            </p>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="trust-policy"
              >
                Editar política de confianza (JSON)
              </label>
              <textarea
                id="trust-policy"
                value={roleData.trustPolicy}
                onChange={handleTrustPolicyChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={10}
              />
            </div>

            {/* Validación simple - en una implementación real se debería validar el JSON */}
            {!roleData.trustPolicy.includes("sts:AssumeRole") && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      La política de confianza debería incluir la acción
                      sts:AssumeRole.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  // Renderiza los botones de navegación
  const renderNavButtons = () => {
    const isNextDisabled =
      (currentStep === "details" && !roleData.name) ||
      (currentStep === "permissions" && roleData.policies.length === 0);

    return (
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={goToPreviousStep}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#131e32] hover:bg-gray-50 dark:hover:bg-[#1c293e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            currentStep === "details" ? "invisible" : ""
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
          {currentStep === "trust" ? "Guardar cambios" : "Siguiente"}
          {currentStep !== "trust" && <ArrowRight className="h-4 w-4 ml-2" />}
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
        <Link
          href={`/iam/roles/${roleName}`}
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          {roleName}
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">Editar</span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl font-normal text-gray-900 dark:text-white mb-6">
        Editar rol: {roleName}
      </h1>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "details"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {currentStep === "details" ? "1" : <Check className="h-5 w-5" />}
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Detalles
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep !== "details"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "permissions"
                  ? "bg-blue-500 text-white"
                  : currentStep === "details"
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  : "bg-green-500 text-white"
              }`}
            >
              {currentStep === "permissions" ? (
                "2"
              ) : currentStep === "details" ? (
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
              currentStep === "tags" || currentStep === "trust"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "tags"
                  ? "bg-blue-500 text-white"
                  : currentStep === "trust"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {currentStep === "tags" ? (
                "3"
              ) : currentStep === "trust" ? (
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
              currentStep === "trust"
                ? "bg-green-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === "trust"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              4
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Confianza
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
