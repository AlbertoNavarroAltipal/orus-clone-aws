// src/app/(dashboard)/account/components/ProfileForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Globe,
  Calendar,
  CreditCard,
  ShoppingBag,
  Layers,
  Briefcase,
  Flag,
  Store,
  Warehouse,
  AlertCircle,
  AlertTriangle,
  LinkIcon,
  Check,
} from "lucide-react";
import client from "@/config/aws-config";
import { toast } from "sonner";

interface ProfileFormProps {
  userData: any;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userData, onCancel }) => {
  // Estado para las secciones del formulario
  const [activeSection, setActiveSection] = useState<string | null>("personal");
  // Estado para el campo que se está actualizando
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  // Estado para el modal de confirmación de DNI
  const [showDniModal, setShowDniModal] = useState(false);
  const [pendingDniUpdate, setPendingDniUpdate] = useState<string | null>(null);
  // Estado para el modal de confirmación de correo
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingEmailUpdate, setPendingEmailUpdate] = useState<string | null>(
    null
  );

  // Estado para los valores del formulario
  const [formValues, setFormValues] = useState({
    nombre_completo: "",
    dni: "",
    fecha_nacimiento: "",
    genero: "",
    foto_perfil: "",
    email: "",
    numero_contacto: "",
    cargo: "",
    gerencia: "",
    id_zona_ventas: "",
    canal: "",
    sitio: "",
    codigo_cedi: "",
    contrasena: "",
    estado: false,
    verificacion_correo: "",
  });

  // Errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    if (userData) {
      setFormValues({
        nombre_completo: userData.nombreCompleto || "",
        dni: userData.dni || "",
        fecha_nacimiento: userData.fechaNacimiento || "",
        genero: userData.genero || "",
        foto_perfil: userData.fotoPerfil || "",
        email: userData.email || "",
        numero_contacto: userData.numeroContacto || "",
        cargo: userData.cargo || "",
        gerencia: userData.gerencia || "",
        id_zona_ventas: userData.idZonaVentas || "",
        canal: userData.canal || "",
        sitio: userData.sitio || "",
        codigo_cedi: userData.codigoCedi || "",
        contrasena: "", // No mostramos la contraseña
        estado: userData.estado || false,
        verificacion_correo: userData.verificacionCorreo || "",
      });
    }
  }, [userData]);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error al cambiar el valor
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Función para validar un campo
  const validateField = (field: string, value: string | boolean): boolean => {
    // Limpiar errores previos
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Validación básica para campos de texto
    if (typeof value === "string") {
      if (field === "nombre_completo" && (!value || value.length < 2)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "El nombre completo debe tener al menos 2 caracteres",
        }));
        return false;
      }

      if (field === "email" && (!value || !/\S+@\S+\.\S+/.test(value))) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Ingrese un correo electrónico válido",
        }));
        return false;
      }

      if (
        field === "numero_contacto" &&
        value &&
        !/^\+?\d{10,15}$/.test(value)
      ) {
        setErrors((prev) => ({
          ...prev,
          [field]:
            "El formato debe ser XXXXXXXXXX (10-15 dígitos, opcional código de país)",
        }));
        return false;
      }

      if (field === "foto_perfil" && value && !/^https?:\/\/.+/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Debe ser una URL válida (comienza con http:// o https://)",
        }));
        return false;
      }
    }

    return true;
  };

  // Función para actualizar un campo
  const updateField = async (field: string) => {
    // No hacer nada si ya estamos actualizando
    if (isUpdating) return;

    // Obtener el valor del campo
    const value = formValues[field as keyof typeof formValues];

    // Validar el campo
    if (!validateField(field, value)) return;

    // Caso especial para el DNI
    if (field === "dni" && value !== userData.dni) {
      setPendingDniUpdate(value);
      setShowDniModal(true);
      return;
    }

    // Caso especial para el correo
    if (field === "email" && value !== userData.email) {
      setPendingEmailUpdate(value);
      setShowEmailModal(true);
      return;
    }

    try {
      setIsUpdating(field);

      // Fecha actual para la actualización
      const currentDate = new Date().toISOString();

      // Crear una copia de todos los valores actuales
      const variables = {
        dni: formValues.dni || "",
        canal: formValues.canal || "",
        cargo: formValues.cargo || "",
        codigo_cedi: formValues.codigo_cedi || "",
        contrasena: "", // No enviamos la contraseña
        email: userData.email,
        estado: formValues.estado,
        fecha_actualizacion: currentDate,
        fecha_nacimiento: formValues.fecha_nacimiento || "",
        foto_perfil: formValues.foto_perfil || "",
        genero: formValues.genero || "",
        gerencia: formValues.gerencia || "",
        id_zona_ventas: formValues.id_zona_ventas || "",
        nombre_completo: formValues.nombre_completo || "",
        numero_contacto: formValues.numero_contacto || "",
        sitio: formValues.sitio || "",
        verificacion_correo: formValues.verificacion_correo || "",
      };

      // Actualizar solo el campo específico con el nuevo valor
      variables[field] = value;

      console.log("Variables para la mutación:", variables);

      // Crear la mutación idéntica a la que proporcionaste
      const UPDATE_USER = `
        mutation UpdateUser(
          $dni: String = "",
          $canal: String = "",
          $cargo: String = "",
          $codigo_cedi: String = "",
          $contrasena: String = "",
          $email: AWSEmail = "admin@altipal.com.co",
          $estado: Boolean = false,
          $fecha_actualizacion: AWSDateTime = "1970-01-01T12:30:00.000Z",
          $fecha_nacimiento: AWSDate = "2025-11-13",
          $foto_perfil: String = "",
          $genero: String = "",
          $gerencia: String = "",
          $id_zona_ventas: String = "",
          $nombre_completo: String = "",
          $numero_contacto: AWSPhone = "3154377743",
          $sitio: String = "",
          $verificacion_correo: AWSDateTime = "1970-01-01T12:30:00.000Z"
        ) {
          updateMaestroUsuarios(
            input: {
              dni: $dni,
              canal: $canal,
              cargo: $cargo,
              codigo_cedi: $codigo_cedi,
              contrasena: $contrasena,
              email: $email,
              estado: $estado,
              fecha_actualizacion: $fecha_actualizacion,
              fecha_nacimiento: $fecha_nacimiento,
              foto_perfil: $foto_perfil,
              genero: $genero,
              gerencia: $gerencia,
              id_zona_ventas: $id_zona_ventas,
              nombre_completo: $nombre_completo,
              numero_contacto: $numero_contacto,
              sitio: $sitio,
              verificacion_correo: $verificacion_correo
            }
          ) {
            dni
            email
            fecha_actualizacion
            ${field}
          }
        }
      `;

      // Ejecutar la mutación
      const response = await client.graphql({
        query: UPDATE_USER,
        variables: variables,
      });

      console.log("Respuesta de la mutación:", response);

      // Actualizar los datos locales
      if (response.data?.updateMaestroUsuarios) {
        // También actualizar los datos de userData para mantener todo sincronizado
        if (field === "nombre_completo") userData.nombreCompleto = value;
        if (field === "dni") userData.dni = value;
        if (field === "fecha_nacimiento") userData.fechaNacimiento = value;
        if (field === "genero") userData.genero = value;
        if (field === "foto_perfil") userData.fotoPerfil = value;
        if (field === "numero_contacto") userData.numeroContacto = value;
        if (field === "cargo") userData.cargo = value;
        if (field === "gerencia") userData.gerencia = value;
        if (field === "id_zona_ventas") userData.idZonaVentas = value;
        if (field === "canal") userData.canal = value;
        if (field === "sitio") userData.sitio = value;
        if (field === "codigo_cedi") userData.codigoCedi = value;
      }

      toast.success(`Campo ${getFieldLabel(field)} actualizado correctamente`);
    } catch (error) {
      console.log(`Error al actualizar ${field}:`, error);

      let errorMessage = `Error al actualizar ${getFieldLabel(field)}. `;
      if (error instanceof Error) {
        errorMessage += error.message;
      }

      if ((error as any)?.errors) {
        const graphQLErrors = (error as any).errors;
        graphQLErrors.forEach((err: any) => {
          errorMessage += ` ${err.message}`;
        });
      }

      toast.error(errorMessage);
    } finally {
      setIsUpdating(null);
    }
  };

  // Función para confirmar cambio de DNI
  const confirmDniUpdate = async () => {
    if (!pendingDniUpdate) return;

    try {
      setIsUpdating("dni");

      // Fecha actual para la actualización
      const currentDate = new Date().toISOString();

      // Crear variables con el mismo formato que tu ejemplo
      const variables = {
        dni: pendingDniUpdate,
        canal: formValues.canal || "",
        cargo: formValues.cargo || "",
        codigo_cedi: formValues.codigo_cedi || "",
        contrasena: "",
        email: userData.email,
        estado: formValues.estado,
        fecha_actualizacion: currentDate,
        fecha_nacimiento: formValues.fecha_nacimiento || "",
        foto_perfil: formValues.foto_perfil || "",
        genero: formValues.genero || "",
        gerencia: formValues.gerencia || "",
        id_zona_ventas: formValues.id_zona_ventas || "",
        nombre_completo: formValues.nombre_completo || "",
        numero_contacto: formValues.numero_contacto || "",
        sitio: formValues.sitio || "",
        verificacion_correo: formValues.verificacion_correo || "",
      };

      // Usar la misma mutación exacta
      const UPDATE_USER = `
        mutation UpdateUser(
          $dni: String = "",
          $canal: String = "",
          $cargo: String = "",
          $codigo_cedi: String = "",
          $contrasena: String = "",
          $email: AWSEmail = "admin@altipal.com.co",
          $estado: Boolean = false,
          $fecha_actualizacion: AWSDateTime = "1970-01-01T12:30:00.000Z",
          $fecha_nacimiento: AWSDate = "2025-11-13",
          $foto_perfil: String = "",
          $genero: String = "",
          $gerencia: String = "",
          $id_zona_ventas: String = "",
          $nombre_completo: String = "",
          $numero_contacto: AWSPhone = "3154377743",
          $sitio: String = "",
          $verificacion_correo: AWSDateTime = "1970-01-01T12:30:00.000Z"
        ) {
          updateMaestroUsuarios(
            input: {
              dni: $dni,
              canal: $canal,
              cargo: $cargo,
              codigo_cedi: $codigo_cedi,
              contrasena: $contrasena,
              email: $email,
              estado: $estado,
              fecha_actualizacion: $fecha_actualizacion,
              fecha_nacimiento: $fecha_nacimiento,
              foto_perfil: $foto_perfil,
              genero: $genero,
              gerencia: $gerencia,
              id_zona_ventas: $id_zona_ventas,
              nombre_completo: $nombre_completo,
              numero_contacto: $numero_contacto,
              sitio: $sitio,
              verificacion_correo: $verificacion_correo
            }
          ) {
            dni
            email
            fecha_actualizacion
          }
        }
      `;

      // Ejecutar la mutación
      const response = await client.graphql({
        query: UPDATE_USER,
        variables: variables,
      });

      console.log("Respuesta DNI:", response);

      // Actualizar datos locales
      setFormValues((prev) => ({ ...prev, dni: pendingDniUpdate }));
      userData.dni = pendingDniUpdate;

      toast.success("DNI actualizado correctamente");
      setShowDniModal(false);
      setPendingDniUpdate(null);
    } catch (error) {
      console.log("Error al actualizar DNI:", error);

      let errorMessage = "Error al actualizar DNI. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }

      if ((error as any)?.errors) {
        const graphQLErrors = (error as any).errors;
        graphQLErrors.forEach((err: any) => {
          errorMessage += ` ${err.message}`;
        });
      }

      toast.error(errorMessage);
    } finally {
      setIsUpdating(null);
    }
  };

  // Función para confirmar cambio de correo
  const confirmEmailUpdate = async () => {
    if (!pendingEmailUpdate) return;

    try {
      setIsUpdating("email");

      // Fecha actual para la actualización
      const currentDate = new Date().toISOString();

      // Crear variables con el mismo formato que tu ejemplo
      const variables = {
        dni: formValues.dni || "",
        canal: formValues.canal || "",
        cargo: formValues.cargo || "",
        codigo_cedi: formValues.codigo_cedi || "",
        contrasena: "",
        email: pendingEmailUpdate,
        estado: formValues.estado,
        fecha_actualizacion: currentDate,
        fecha_nacimiento: formValues.fecha_nacimiento || "",
        foto_perfil: formValues.foto_perfil || "",
        genero: formValues.genero || "",
        gerencia: formValues.gerencia || "",
        id_zona_ventas: formValues.id_zona_ventas || "",
        nombre_completo: formValues.nombre_completo || "",
        numero_contacto: formValues.numero_contacto || "",
        sitio: formValues.sitio || "",
        verificacion_correo: formValues.verificacion_correo || "",
      };

      // Usar la misma mutación exacta
      const UPDATE_USER = `
        mutation UpdateUser(
          $dni: String = "",
          $canal: String = "",
          $cargo: String = "",
          $codigo_cedi: String = "",
          $contrasena: String = "",
          $email: AWSEmail = "admin@altipal.com.co",
          $estado: Boolean = false,
          $fecha_actualizacion: AWSDateTime = "1970-01-01T12:30:00.000Z",
          $fecha_nacimiento: AWSDate = "2025-11-13",
          $foto_perfil: String = "",
          $genero: String = "",
          $gerencia: String = "",
          $id_zona_ventas: String = "",
          $nombre_completo: String = "",
          $numero_contacto: AWSPhone = "3154377743",
          $sitio: String = "",
          $verificacion_correo: AWSDateTime = "1970-01-01T12:30:00.000Z"
        ) {
          updateMaestroUsuarios(
            input: {
              dni: $dni,
              canal: $canal,
              cargo: $cargo,
              codigo_cedi: $codigo_cedi,
              contrasena: $contrasena,
              email: $email,
              estado: $estado,
              fecha_actualizacion: $fecha_actualizacion,
              fecha_nacimiento: $fecha_nacimiento,
              foto_perfil: $foto_perfil,
              genero: $genero,
              gerencia: $gerencia,
              id_zona_ventas: $id_zona_ventas,
              nombre_completo: $nombre_completo,
              numero_contacto: $numero_contacto,
              sitio: $sitio,
              verificacion_correo: $verificacion_correo
            }
          ) {
            dni
            email
            fecha_actualizacion
          }
        }
      `;

      // Ejecutar la mutación
      const response = await client.graphql({
        query: UPDATE_USER,
        variables: variables,
      });

      console.log("Respuesta Email:", response);

      // Actualizar datos locales
      setFormValues((prev) => ({ ...prev, email: pendingEmailUpdate }));
      userData.email = pendingEmailUpdate;

      toast.success("Correo electrónico actualizado correctamente");
      setShowEmailModal(false);
      setPendingEmailUpdate(null);
    } catch (error) {
      console.error("Error al actualizar correo electrónico:", error);

      let errorMessage = "Error al actualizar correo electrónico. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }

      if ((error as any)?.errors) {
        const graphQLErrors = (error as any).errors;
        graphQLErrors.forEach((err: any) => {
          errorMessage += ` ${err.message}`;
        });
      }

      toast.error(errorMessage);
    } finally {
      setIsUpdating(null);
    }
  };

  // Función para expandir/contraer secciones
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Obtener la etiqueta para un campo
  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      nombre_completo: "Nombre completo",
      dni: "DNI / Documento de identidad",
      fecha_nacimiento: "Fecha de nacimiento",
      genero: "Género",
      foto_perfil: "Foto de perfil",
      email: "Correo electrónico",
      numero_contacto: "Teléfono",
      cargo: "Cargo",
      gerencia: "Gerencia",
      id_zona_ventas: "Zona de ventas",
      canal: "Canal",
      sitio: "Sitio",
      codigo_cedi: "Código CEDI",
    };

    return labels[field] || field;
  };

  // Si no hay datos de usuario, mostrar mensaje de error
  if (!userData) {
    return (
      <div className="p-6 bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No se encontraron datos del usuario
          </h3>
          <button
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-[#004f9f] text-white rounded-md hover:bg-[#003d7a] transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  // Renderizar un campo con su botón de guardar
  const renderField = (
    field: string,
    icon: React.ReactNode,
    type: string = "text",
    options?: string[][]
  ) => {
    const isUpdatingThis = isUpdating === field;
    const value = formValues[field as keyof typeof formValues];

    return (
      <div className="relative mb-4">
        <label
          htmlFor={field}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {getFieldLabel(field)}{" "}
          {field === "nombre_completo" ? (
            <span className="text-red-500">*</span>
          ) : null}
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>

          {type === "select" && options ? (
            <div className="relative">
              <select
                id={field}
                value={typeof value === "string" ? value : ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`pl-10 pr-12 block w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 focus:ring-[#004f9f] focus:border-[#004f9f] appearance-none ${
                  errors[field]
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : ""
                }`}
              >
                <option value="">Seleccione...</option>
                {options.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-12 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <input
              type={type}
              id={field}
              placeholder={
                field === "foto_perfil" ? "https://ejemplo.com/imagen.jpg" : ""
              }
              value={typeof value === "string" ? value : ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`pl-10 pr-24 block w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md py-2 focus:ring-[#004f9f] focus:border-[#004f9f] ${
                errors[field]
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : ""
              }`}
            />
          )}

          {field !== "email" && (
            <button
              type="button"
              onClick={() => updateField(field)}
              disabled={isUpdatingThis}
              className="absolute right-0 inset-y-0 px-3 rounded-r-md bg-[#004f9f] text-white hover:bg-[#0033cc] focus:outline-none transition-colors font-medium text-sm flex items-center"
            >
              {isUpdatingThis ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Aplicar
                </>
              )}
            </button>
          )}
        </div>

        {errors[field] && (
          <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
        )}

        {field === "foto_perfil" && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <LinkIcon className="h-3 w-3 mr-1" />
            Ingrese una URL válida de imagen (http:// o https://)
          </p>
        )}

        {field === "email" && (
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => updateField(field)}
              disabled={isUpdating === "email"}
              className="px-3 py-1 rounded bg-[#004f9f] text-white hover:bg-[#0033cc] focus:outline-none transition-colors font-medium text-sm flex items-center"
            >
              {isUpdating === "email" ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Cambiar correo
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-[#121e33] dark:to-[#0f1b2d] p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Editar Perfil
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Actualice su información personal y preferencias campo por campo
        </p>
      </div>

      {/* Sección de Información Personal */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer ${
            activeSection === "personal" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          }`}
          onClick={() => toggleSection("personal")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <User className="mr-2 h-5 w-5 text-[#004f9f]" />
            Información Personal
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "personal" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "personal" && (
          <div className="p-4">
            {renderField(
              "nombre_completo",
              <User className="h-4 w-4 text-gray-400" />
            )}
            {renderField(
              "dni",
              <CreditCard className="h-4 w-4 text-gray-400" />
            )}
            {renderField(
              "genero",
              <User className="h-4 w-4 text-gray-400" />,
              "select",
              [
                ["Masculino", "Masculino"],
                ["Femenino", "Femenino"],
                ["Otro", "Otro"],
                ["Prefiero no decir", "Prefiero no decir"],
              ]
            )}
            {renderField(
              "fecha_nacimiento",
              <Calendar className="h-4 w-4 text-gray-400" />,
              "date"
            )}
            {renderField(
              "foto_perfil",
              <User className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Sección de Información de Contacto */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer ${
            activeSection === "contact" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          }`}
          onClick={() => toggleSection("contact")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Mail className="mr-2 h-5 w-5 text-[#004f9f]" />
            Información de Contacto
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "contact" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "contact" && (
          <div className="p-4">
            {renderField(
              "email",
              <Mail className="h-4 w-4 text-gray-400" />,
              "email"
            )}
            {renderField(
              "numero_contacto",
              <Phone className="h-4 w-4 text-gray-400" />,
              "tel"
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
              Formato: XXXXXXXXXX (10-15 dígitos)
            </p>
          </div>
        )}
      </div>

      {/* Sección de Información Laboral */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer ${
            activeSection === "work" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          }`}
          onClick={() => toggleSection("work")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-[#004f9f]" />
            Información Laboral
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "work" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "work" && (
          <div className="p-4">
            {renderField(
              "cargo",
              <Briefcase className="h-4 w-4 text-gray-400" />
            )}
            {renderField(
              "gerencia",
              <Building className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Sección de Información Comercial */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer ${
            activeSection === "commercial"
              ? "bg-gray-100 dark:bg-[#232f3e]"
              : ""
          }`}
          onClick={() => toggleSection("commercial")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-[#004f9f]" />
            Información Comercial
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "commercial" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "commercial" && (
          <div className="p-4">
            {renderField(
              "id_zona_ventas",
              <Flag className="h-4 w-4 text-gray-400" />
            )}
            {renderField("canal", <Layers className="h-4 w-4 text-gray-400" />)}
          </div>
        )}
      </div>

      {/* Sección de Información del Sitio */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer ${
            activeSection === "site" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          }`}
          onClick={() => toggleSection("site")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Globe className="mr-2 h-5 w-5 text-[#004f9f]" />
            Información del Sitio
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "site" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "site" && (
          <div className="p-4">
            {renderField("sitio", <Store className="h-4 w-4 text-gray-400" />)}
            {renderField(
              "codigo_cedi",
              <Warehouse className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Botón de volver */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
        >
          Volver
        </button>
      </div>

      {/* Modal de confirmación para cambio de DNI */}
      {showDniModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#121e33] rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">
                Confirmación de cambio de DNI
              </h3>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Está a punto de cambiar su número de identificación (DNI). Este es
              un dato crítico que podría afectar a múltiples sistemas y
              procesos.
            </p>

            <p className="mb-6 text-gray-700 dark:text-gray-300">
              <strong>DNI actual:</strong> {userData.dni || "No especificado"}
              <br />
              <strong>Nuevo DNI:</strong> {pendingDniUpdate}
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDniModal(false);
                  setPendingDniUpdate(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDniUpdate}
                disabled={isUpdating === "dni"}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none disabled:opacity-50"
              >
                {isUpdating === "dni" ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Confirmar cambio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cambio de correo */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#121e33] rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">
                Confirmación de cambio de correo
              </h3>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Está a punto de cambiar su dirección de correo electrónico. Este
              es su identificador principal en el sistema y afectará a todos los
              servicios relacionados.
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              <strong>Correo actual:</strong>{" "}
              {userData.email || "No especificado"}
              <br />
              <strong>Nuevo correo:</strong> {pendingEmailUpdate}
            </p>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md mb-6 text-sm text-amber-800 dark:text-amber-200">
              <p>⚠️ Después de cambiar su correo electrónico:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Deberá iniciar sesión con la nueva dirección</li>
                <li>Las notificaciones se enviarán a la nueva dirección</li>
                <li>Es posible que se requiera verificar el nuevo correo</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setPendingEmailUpdate(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmEmailUpdate}
                disabled={isUpdating === "email"}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none disabled:opacity-50"
              >
                {isUpdating === "email" ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Confirmar cambio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
