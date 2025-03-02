"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  Clock,
} from "lucide-react";
import { UserData } from "@/types/UserData";

// Esquema de validación para el formulario de perfil
const profileSchema = z.object({
  // Información personal
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  dni: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),

  // Información de contacto
  email: z.string().email("Correo electrónico inválido"),
  personalEmail: z
    .string()
    .email("Correo electrónico inválido")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),

  // Información laboral
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  management: z.string().optional(),

  // Información comercial
  salesZone: z.string().optional(),
  channel: z.string().optional(),

  // Ubicación y preferencias
  location: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  site: z.string().optional(),
  cedi: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  userData: UserData;
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
  isSaving: boolean;
}

/**
 * Formulario mejorado para editar la información del perfil del usuario
 * Con validación mediante Zod y diseño mejorado
 */
const ProfileForm: React.FC<ProfileFormProps> = ({
  userData,
  onSubmit,
  onCancel,
  isSaving,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dni: userData.dni || "",
      birthDate: userData.birthDate || "",
      gender: userData.gender || "",
      email: userData.email,
      personalEmail: userData.personalEmail || "",
      phone: userData.phone || "",
      jobTitle: userData.jobTitle || "",
      department: userData.department || "",
      management: userData.management || "",
      salesZone: userData.salesZone || "",
      channel: userData.channel || "",
      location: userData.location || "",
      country: userData.country || "",
      timezone: userData.timezone || "",
      language: userData.language || "",
      site: userData.site || "",
      cedi: userData.cedi || "",
    },
  });

  // Determinar si una sección tiene cambios
  const isSectionDirty = (fields: string[]) => {
    return fields.some(
      (field) => dirtyFields[field as keyof ProfileFormValues]
    );
  };

  // Expandir o colapsar una sección
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {/* Encabezado del formulario */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-[#121e33] dark:to-[#0f1b2d] p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Editar Perfil
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Actualice su información personal y preferencias
        </p>
      </div>

      {/* Sección de Información Personal */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors ${
            activeSection === "personal" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          } ${
            isSectionDirty([
              "firstName",
              "lastName",
              "dni",
              "birthDate",
              "gender",
            ])
              ? "bg-blue-50 dark:bg-blue-900/20"
              : ""
          }`}
          onClick={() => toggleSection("personal")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <User className="mr-2 h-5 w-5 text-[#ec7211]" />
            Información Personal
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "personal" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "personal" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className={`pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 ${
                    errors.firstName
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Apellido <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className={`pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 ${
                    errors.lastName
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                DNI / Documento de Identidad
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="dni"
                  {...register("dni")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Género
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  id="gender"
                  {...register("gender")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                >
                  <option value="">Seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fecha de Nacimiento
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="birthDate"
                  {...register("birthDate")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Información de Contacto */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors ${
            activeSection === "contact" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          } ${
            isSectionDirty(["email", "personalEmail", "phone"])
              ? "bg-blue-50 dark:bg-blue-900/20"
              : ""
          }`}
          onClick={() => toggleSection("contact")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Mail className="mr-2 h-5 w-5 text-[#ec7211]" />
            Información de Contacto
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "contact" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "contact" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Correo Corporativo <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="personalEmail"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Correo Personal
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="personalEmail"
                  {...register("personalEmail")}
                  className={`pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 ${
                    errors.personalEmail
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.personalEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.personalEmail.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Teléfono
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Información Laboral */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors ${
            activeSection === "work" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          } ${
            isSectionDirty(["jobTitle", "department", "management"])
              ? "bg-blue-50 dark:bg-blue-900/20"
              : ""
          }`}
          onClick={() => toggleSection("work")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-[#ec7211]" />
            Información Laboral
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "work" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "work" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Cargo
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="jobTitle"
                  {...register("jobTitle")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Departamento
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="department"
                  {...register("department")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="management"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Gerencia
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="management"
                  {...register("management")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Información Comercial */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors ${
            activeSection === "sales" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          } ${
            isSectionDirty(["salesZone", "channel"])
              ? "bg-blue-50 dark:bg-blue-900/20"
              : ""
          }`}
          onClick={() => toggleSection("sales")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-[#ec7211]" />
            Información Comercial
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "sales" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "sales" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="salesZone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Zona de Ventas
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Flag className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="salesZone"
                  {...register("salesZone")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="channel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Canal
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Layers className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="channel"
                  {...register("channel")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Ubicación y Preferencias */}
      <div className="mb-6 bg-white dark:bg-[#121e33] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div
          className={`bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between cursor-pointer transition-colors ${
            activeSection === "location" ? "bg-gray-100 dark:bg-[#232f3e]" : ""
          } ${
            isSectionDirty([
              "location",
              "country",
              "timezone",
              "language",
              "site",
              "cedi",
            ])
              ? "bg-blue-50 dark:bg-blue-900/20"
              : ""
          }`}
          onClick={() => toggleSection("location")}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Globe className="mr-2 h-5 w-5 text-[#ec7211]" />
            Ubicación y Preferencias
          </h3>
          <div className="text-sm text-gray-500">
            {activeSection === "location" ? "▼" : "▶"}
          </div>
        </div>

        {activeSection === "location" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Ubicación
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  {...register("location")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                País
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  id="country"
                  {...register("country")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                >
                  <option value="">Seleccione...</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Perú">Perú</option>
                  <option value="México">México</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="timezone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Zona Horaria
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  id="timezone"
                  {...register("timezone")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                >
                  <option value="">Seleccione...</option>
                  <option value="(GMT-5) Bogotá, Lima, Quito">
                    (GMT-5) Bogotá, Lima, Quito
                  </option>
                  <option value="(GMT-6) Ciudad de México">
                    (GMT-6) Ciudad de México
                  </option>
                  <option value="(GMT-4) Caracas">(GMT-4) Caracas</option>
                  <option value="(GMT-3) Buenos Aires">
                    (GMT-3) Buenos Aires
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Idioma
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  id="language"
                  {...register("language")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                >
                  <option value="">Seleccione...</option>
                  <option value="Español">Español</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Portugués">Portugués</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="site"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Sitio
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="site"
                  {...register("site")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cedi"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                CEDI
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Warehouse className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="cedi"
                  {...register("cedi")}
                  className="pl-10 focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="text-red-500">*</span> Campos obligatorios
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#ec7211] hover:bg-[#dd6b10] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
