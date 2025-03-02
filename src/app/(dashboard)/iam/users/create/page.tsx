"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { UserTag } from "@/types/users";

type Step = "details" | "permissions" | "tags" | "review";

/**
 * Página para la creación de un nuevo usuario
 * Implementa un wizard con múltiples pasos para la configuración completa
 */
export default function CreateUserPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    consoleAccess: true,
    programmaticAccess: false,
    requirePasswordReset: true,
    groups: [] as string[],
    permissions: [] as string[],
    tags: [] as UserTag[],
  });

  // Datos de ejemplo para el formulario
  const availableGroups = [
    { id: "g1", name: "Admin", description: "Acceso administrativo completo" },
    {
      id: "g2",
      name: "Developers",
      description: "Acceso para desarrolladores",
    },
    { id: "g3", name: "ReadOnly", description: "Acceso de solo lectura" },
    { id: "g4", name: "Support", description: "Acceso para equipo de soporte" },
  ];

  const availablePolicies = [
    {
      id: "p1",
      name: "AdminAccess",
      description: "Permite el acceso administrativo completo",
    },
    {
      id: "p2",
      name: "PowerUserAccess",
      description: "Permite la mayoría de acciones excepto IAM",
    },
    {
      id: "p3",
      name: "ReadOnlyAccess",
      description: "Permite acceso de solo lectura a todos los recursos",
    },
    {
      id: "p4",
      name: "S3FullAccess",
      description: "Permite acceso completo a S3",
    },
  ];

  // Manejadores de cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserData({ ...userData, [name]: checked });
  };

  const handleGroupChange = (groupId: string) => {
    if (userData.groups.includes(groupId)) {
      setUserData({
        ...userData,
        groups: userData.groups.filter((id) => id !== groupId),
      });
    } else {
      setUserData({
        ...userData,
        groups: [...userData.groups, groupId],
      });
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    if (userData.permissions.includes(permissionId)) {
      setUserData({
        ...userData,
        permissions: userData.permissions.filter((id) => id !== permissionId),
      });
    } else {
      setUserData({
        ...userData,
        permissions: [...userData.permissions, permissionId],
      });
    }
  };

  // Manejo de etiquetas
  const addTag = () => {
    setUserData({
      ...userData,
      tags: [...userData.tags, { key: "", value: "" }],
    });
  };

  const updateTag = (index: number, field: "key" | "value", value: string) => {
    const newTags = [...userData.tags];
    newTags[index][field] = value;
    setUserData({
      ...userData,
      tags: newTags,
    });
  };

  const removeTag = (index: number) => {
    setUserData({
      ...userData,
      tags: userData.tags.filter((_, i) => i !== index),
    });
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
        setCurrentStep("review");
        break;
      case "review":
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
      case "review":
        setCurrentStep("tags");
        break;
    }
  };

  // Envío final del formulario
  const handleSubmit = async () => {
    try {
      // Simula el envío de datos a API
      console.log("Usuario creado:", userData);

      // En una implementación real, aquí iría una llamada a API
      // await createUser(userData);

      // Redireccionar a la página de detalles del usuario creado
      router.push(`/iam/users/${userData.username}`);
    } catch (error) {
      console.error("Error creating user", error);
      // Manejo de errores
    }
  };

  // Validación básica
  const isDetailsValid =
    userData.username.trim() !== "" &&
    (userData.consoleAccess || userData.programmaticAccess);

  const getGroupByName = (groupId: string) => {
    return availableGroups.find((group) => group.id === groupId)?.name || "";
  };

  const getPolicyByName = (policyId: string) => {
    return (
      availablePolicies.find((policy) => policy.id === policyId)?.name || ""
    );
  };

  // Render condicional para cada paso del wizard
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "details":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Detalles del usuario
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ingrese la información básica del usuario y configure su acceso.
            </p>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="username"
              >
                Nombre de usuario*
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={userData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingrese un nombre de usuario único"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="name"
                >
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Nombre completo del usuario"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#131e32] border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="ejemplo@dominio.com"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Tipo de acceso
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="consoleAccess"
                    name="consoleAccess"
                    type="checkbox"
                    checked={userData.consoleAccess}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="consoleAccess"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Acceso a la consola
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Permite al usuario iniciar sesión en la consola de
                    administración
                  </p>
                </div>
              </div>

              {userData.consoleAccess && (
                <div className="ml-7">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="requirePasswordReset"
                        name="requirePasswordReset"
                        type="checkbox"
                        checked={userData.requirePasswordReset}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="requirePasswordReset"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Requerir cambio de contraseña en el próximo inicio de
                        sesión
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        El usuario deberá cambiar su contraseña al iniciar
                        sesión por primera vez
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="programmaticAccess"
                    name="programmaticAccess"
                    type="checkbox"
                    checked={userData.programmaticAccess}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="programmaticAccess"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Acceso programático
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Permite al usuario utilizar claves de acceso para API y CLI
                  </p>
                </div>
              </div>
            </div>

            {!isDetailsValid && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Debe proporcionar un nombre de usuario y seleccionar al
                      menos un tipo de acceso.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "permissions":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Configurar permisos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Añada el usuario a grupos o asigne políticas directamente.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Grupos
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Añadir a un grupo es la forma recomendada de asignar permisos.
              </p>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {availableGroups.map((group) => (
                  <div key={group.id} className="p-4 flex items-start">
                    <input
                      type="checkbox"
                      id={`group-${group.id}`}
                      checked={userData.groups.includes(group.id)}
                      onChange={() => handleGroupChange(group.id)}
                      className="h-4 w-4 mt-1 text-blue-600 dark:text-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <label
                      htmlFor={`group-${group.id}`}
                      className="ml-3 flex-1"
                    >
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        {group.name}
                      </span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {group.description}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Políticas directas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Si es necesario, puede adjuntar políticas directamente al
                usuario.
              </p>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {availablePolicies.map((policy) => (
                  <div key={policy.id} className="p-4 flex items-start">
                    <input
                      type="checkbox"
                      id={`policy-${policy.id}`}
                      checked={userData.permissions.includes(policy.id)}
                      onChange={() => handlePermissionChange(policy.id)}
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
              {userData.tags.length === 0 && (
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value=""
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-400 dark:text-gray-500 text-sm focus:outline-none"
                      placeholder="Clave"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value=""
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-400 dark:text-gray-500 text-sm focus:outline-none"
                      placeholder="Valor"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-2 py-2 text-gray-300 dark:text-gray-600"
                    disabled
                  >
                    Eliminar
                  </button>
                </div>
              )}

              {userData.tags.map((tag, index) => (
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
                  >
                    Eliminar
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
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Revisar y crear
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Revise la configuración del usuario antes de crearlo.
            </p>

            <div className="bg-gray-50 dark:bg-[#131e32] border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Detalles básicos
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Nombre de usuario:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {userData.username}
                      </span>
                    </p>
                    {userData.name && (
                      <p className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Nombre completo:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {userData.name}
                        </span>
                      </p>
                    )}
                    {userData.email && (
                      <p className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Email:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {userData.email}
                        </span>
                      </p>
                    )}
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Tipos de acceso
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Acceso a consola:
                      </span>
                      <span className="text-sm">
                        {userData.consoleAccess ? (
                          <span className="text-green-600 dark:text-green-400">
                            Habilitado
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            Deshabilitado
                          </span>
                        )}
                      </span>
                    </p>
                    {userData.consoleAccess && (
                      <p className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Requerir cambio de contraseña:
                        </span>
                        <span className="text-sm">
                          {userData.requirePasswordReset ? (
                            <span className="text-green-600 dark:text-green-400">
                              Sí
                            </span>
                          ) : (
                            <span className="text-gray-700 dark:text-gray-300">
                              No
                            </span>
                          )}
                        </span>
                      </p>
                    )}
                    <p className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Acceso programático:
                      </span>
                      <span className="text-sm">
                        {userData.programmaticAccess ? (
                          <span className="text-green-600 dark:text-green-400">
                            Habilitado
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            Deshabilitado
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Permisos
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Grupos ({userData.groups.length}):
                      </p>
                      {userData.groups.length > 0 ? (
                        <ul className="text-sm text-gray-900 dark:text-white list-disc pl-5">
                          {userData.groups.map((groupId) => (
                            <li key={groupId}>{getGroupByName(groupId)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          No se ha seleccionado ningún grupo
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Políticas ({userData.permissions.length}):
                      </p>
                      {userData.permissions.length > 0 ? (
                        <ul className="text-sm text-gray-900 dark:text-white list-disc pl-5">
                          {userData.permissions.map((policyId) => (
                            <li key={policyId}>{getPolicyByName(policyId)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          No se ha seleccionado ninguna política
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Etiquetas (
                    {userData.tags.filter((tag) => tag.key.trim()).length})
                  </h3>
                  {userData.tags.some((tag) => tag.key.trim()) ? (
                    <div className="space-y-1">
                      {userData.tags
                        .filter((tag) => tag.key.trim())
                        .map((tag, index) => (
                          <p
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-700 dark:text-gray-300">
                              {tag.key}:
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {tag.value}
                            </span>
                          </p>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      No se han añadido etiquetas
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!userData.username && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-lg mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Corrija los siguientes problemas antes de continuar:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    <li>El nombre de usuario es obligatorio</li>
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
      (currentStep === "details" && !isDetailsValid) ||
      (currentStep === "review" && !userData.username);

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
          {currentStep === "review" ? "Crear usuario" : "Siguiente"}
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
          href="/iam/users"
          className="text-[#0073bb] dark:text-[#45a3e6] hover:underline"
        >
          Usuarios
        </Link>
        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">Crear usuario</span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl font-normal text-gray-900 dark:text-white mb-6">
        Crear usuario
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
