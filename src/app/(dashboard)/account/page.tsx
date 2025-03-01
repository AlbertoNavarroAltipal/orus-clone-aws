"use client";

import { useState } from "react";
import {
  ArrowRight,
  Camera,
  Edit,
  Mail,
  Phone,
  Shield,
  User,
  MapPin,
  Building,
  Calendar,
  Check,
  Trash2,
  AlertCircle,
  Globe,
  Clock,
  Settings,
  BellRing,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import { toast } from "sonner";

// Definición del esquema de validación para el formulario de perfil
const profileSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Datos simulados para el historial de inicios de sesión
const loginHistoryData = [
  {
    id: 1,
    date: "28/02/2025 10:23:45",
    ip: "192.168.1.1",
    location: "Bogotá, Colombia",
    device: "Chrome en Windows",
    status: "success",
  },
  {
    id: 2,
    date: "27/02/2025 15:30:22",
    ip: "192.168.1.1",
    location: "Bogotá, Colombia",
    device: "Chrome en Windows",
    status: "success",
  },
  {
    id: 3,
    date: "25/02/2025 09:12:18",
    ip: "200.14.67.89",
    location: "Medellín, Colombia",
    device: "Safari en MacOS",
    status: "success",
  },
  {
    id: 4,
    date: "22/02/2025 18:45:30",
    ip: "186.112.45.67",
    location: "Bogotá, Colombia",
    device: "Firefox en Windows",
    status: "failed",
  },
  {
    id: 5,
    date: "20/02/2025 11:05:12",
    ip: "192.168.1.1",
    location: "Bogotá, Colombia",
    device: "Chrome en Windows",
    status: "success",
  },
];

// Datos simulados para el historial de actividades
const activityHistoryData = [
  {
    id: 1,
    date: "28/02/2025 14:30:00",
    action: "Actualizó información de perfil",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    date: "27/02/2025 16:45:00",
    action: "Cambió contraseña",
    ip: "192.168.1.1",
  },
  {
    id: 3,
    date: "26/02/2025 10:20:00",
    action: "Habilitó autenticación de dos factores",
    ip: "192.168.1.1",
  },
  {
    id: 4,
    date: "25/02/2025 09:15:00",
    action: "Descargó reporte de ventas",
    ip: "200.14.67.89",
  },
  {
    id: 5,
    date: "24/02/2025 17:30:00",
    action: "Creó un nuevo usuario",
    ip: "192.168.1.1",
  },
];

// Datos simulados para dispositivos conectados
const connectedDevicesData = [
  {
    id: 1,
    name: "Windows PC",
    type: "desktop",
    browser: "Chrome",
    os: "Windows 11",
    lastActive: "28/02/2025 14:30:00",
    location: "Bogotá, Colombia",
    current: true,
  },
  {
    id: 2,
    name: "iPhone 15",
    type: "mobile",
    browser: "Safari",
    os: "iOS 17",
    lastActive: "27/02/2025 10:15:00",
    location: "Bogotá, Colombia",
    current: false,
  },
  {
    id: 3,
    name: "MacBook Pro",
    type: "laptop",
    browser: "Safari",
    os: "MacOS Sonoma",
    lastActive: "26/02/2025 16:45:00",
    location: "Medellín, Colombia",
    current: false,
  },
  {
    id: 4,
    name: "iPad Air",
    type: "tablet",
    browser: "Safari",
    os: "iPadOS 17",
    lastActive: "25/02/2025 20:10:00",
    location: "Bogotá, Colombia",
    current: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Estado para controlar los modales
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
  const [isLoginHistoryModalOpen, setIsLoginHistoryModalOpen] = useState(false);
  const [isActivityHistoryModalOpen, setIsActivityHistoryModalOpen] =
    useState(false);
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  // Estado para las pestañas dentro de modales
  const [activeHistoryTab, setActiveHistoryTab] = useState(0);

  // Datos del usuario (simulados)
  const [userData, setUserData] = useState({
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@altipal.com",
    phone: "+57 301 234 5678",
    jobTitle: "Gerente de Ventas",
    department: "Comercial",
    location: "Bogotá",
    country: "Colombia",
    timezone: "(GMT-5) Bogotá, Lima, Quito",
    language: "Español",
    lastAccess: "2025-02-27T14:30:00Z",
    accountCreated: "2023-05-15T09:00:00Z",
    mfaEnabled: false,
    notificationPreferences: {
      email: {
        security: true,
        marketing: false,
        updates: true,
        reports: true,
      },
      push: {
        security: true,
        marketing: true,
        updates: true,
        reports: false,
      },
    },
  });

  // Configuración del formulario con React Hook Form y Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      jobTitle: userData.jobTitle,
      department: userData.department,
      location: userData.location,
      country: userData.country,
      timezone: userData.timezone,
      language: userData.language,
    },
  });

  // Manejador para guardar los cambios del perfil
  const onSubmitProfile = async (data: ProfileFormValues) => {
    setIsSaving(true);

    try {
      // Aquí se realizaría la llamada a la API para actualizar el perfil
      // Simulamos una llamada asíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar el estado local con los nuevos datos
      setUserData({
        ...userData,
        ...data,
      });

      setIsEditingProfile(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Función para cambiar contraseña (simulada)
  const handleChangePassword = async () => {
    // Simulación de cambio de contraseña
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPasswordModalOpen(false);
    toast.success("Contraseña actualizada correctamente");
  };

  // Función para habilitar MFA (simulada)
  const handleEnableMfa = async () => {
    // Simulación de habilitación de MFA
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsMfaModalOpen(false);
    setUserData({
      ...userData,
      mfaEnabled: true,
    });
    toast.success("Autenticación de dos factores habilitada correctamente");
  };

  // Función para revocar acceso a un dispositivo (simulada)
  const handleRevokeDevice = (deviceId: number) => {
    // Simulación de revocación de acceso
    toast.success("Acceso revocado correctamente");
  };

  // Función para guardar preferencias de notificaciones (simulada)
  const handleSaveNotificationPreferences = async () => {
    // Simulación de guardado de preferencias
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsNotificationsModalOpen(false);
    toast.success("Preferencias de notificaciones actualizadas correctamente");
  };

  // Función para eliminar cuenta (simulada)
  const handleDeleteAccount = async () => {
    // Simulación de eliminación de cuenta
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleteAccountModalOpen(false);
    toast.success("Cuenta eliminada correctamente");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-[#0f1b2d] mt-7">
      {/* Breadcrumb */}
      {/* <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232f3e] py-4 px-6">
        <div className="flex items-center text-sm">
          <a href="/dashboard" className="text-[#0073bb] hover:underline">
            Panel de Control
          </a>
          <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400">Mi Cuenta</span>
        </div>
      </div> */}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
            Mi Cuenta
          </h1>
          <span className="text-sm text-[#0073bb] hover:underline cursor-pointer">
            Información
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Administre su información personal, preferencias de seguridad y
          configuración de la cuenta.
        </p>

        {/* Pestañas */}
        <Tab.Group
          as="div"
          selectedIndex={activeTab}
          onChange={setActiveTab}
          className="mb-8"
        >
          <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {["Información de Perfil", "Seguridad", "Preferencias"].map(
              (tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    clsx(
                      "py-3 px-4 text-sm font-medium border-b-2 focus:outline-none",
                      selected
                        ? "border-[#ec7211] text-[#ec7211]"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )
                  }
                >
                  {tab}
                </Tab>
              )
            )}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {/* Panel de Información de Perfil */}
            <Tab.Panel>
              <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-6 flex justify-between items-start border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      Información de Perfil
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Administre su información personal y detalles de contacto
                    </p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ec7211] hover:bg-[#dd6b10] focus:outline-none"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Perfil
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form
                    onSubmit={handleSubmit(onSubmitProfile)}
                    className="p-6"
                  >
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información Personal
                      </h3>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            {...register("firstName")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Apellido
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información de Contacto
                      </h3>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Teléfono
                          </label>
                          <input
                            type="text"
                            id="phone"
                            {...register("phone")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información Laboral
                      </h3>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="jobTitle"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Cargo
                          </label>
                          <input
                            type="text"
                            id="jobTitle"
                            {...register("jobTitle")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Departamento
                          </label>
                          <input
                            type="text"
                            id="department"
                            {...register("department")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Ubicación y Preferencias
                      </h3>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Ubicación
                          </label>
                          <input
                            type="text"
                            id="location"
                            {...register("location")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            País
                          </label>
                          <select
                            id="country"
                            {...register("country")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          >
                            <option value="Colombia">Colombia</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Perú">Perú</option>
                            <option value="México">México</option>
                            <option value="Venezuela">Venezuela</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="timezone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Zona Horaria
                          </label>
                          <select
                            id="timezone"
                            {...register("timezone")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          >
                            <option value="(GMT-5) Bogotá, Lima, Quito">
                              (GMT-5) Bogotá, Lima, Quito
                            </option>
                            <option value="(GMT-6) Ciudad de México">
                              (GMT-6) Ciudad de México
                            </option>
                            <option value="(GMT-4) Caracas">
                              (GMT-4) Caracas
                            </option>
                            <option value="(GMT-3) Buenos Aires">
                              (GMT-3) Buenos Aires
                            </option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="language"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Idioma
                          </label>
                          <select
                            id="language"
                            {...register("language")}
                            className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                          >
                            <option value="Español">Español</option>
                            <option value="Inglés">Inglés</option>
                            <option value="Portugués">Portugués</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#ec7211] hover:bg-[#dd6b10] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? "Guardando..." : "Guardar Cambios"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 mb-6 bg-gray-50 dark:bg-[#121e33] rounded-lg">
                      <div className="relative mb-4 sm:mb-0 sm:mr-6">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                          <User className="h-12 w-12" />
                        </div>
                        <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-[#0f1b2d] p-1.5 border border-gray-200 dark:border-gray-700">
                          <Camera className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {userData.firstName} {userData.lastName}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex flex-col space-y-1">
                          <span className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" /> {userData.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" /> {userData.phone}
                          </span>
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />{" "}
                            {userData.jobTitle}, {userData.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información Personal */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información Personal
                      </h3>
                      <dl className="grid grid-cols-1 gap-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Nombre completo
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            {userData.firstName} {userData.lastName}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Información de Contacto */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información de Contacto
                      </h3>
                      <dl className="grid grid-cols-1 gap-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Correo electrónico
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              {userData.email}
                            </div>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Teléfono
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {userData.phone}
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Información Laboral */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información Laboral
                      </h3>
                      <dl className="grid grid-cols-1 gap-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Cargo
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-gray-400" />
                              {userData.jobTitle}
                            </div>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Departamento
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            {userData.department}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Ubicación y Preferencias */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Ubicación y Preferencias
                      </h3>
                      <dl className="grid grid-cols-1 gap-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Ubicación
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {userData.location}, {userData.country}
                            </div>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Zona horaria
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-1 text-gray-400" />
                              {userData.timezone}
                            </div>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Idioma
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            {userData.language}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Información de la Cuenta */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                        Información de la Cuenta
                      </h3>
                      <dl className="grid grid-cols-1 gap-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Último acceso
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                              {new Date(userData.lastAccess).toLocaleString()}
                            </div>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Cuenta creada
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                              {new Date(
                                userData.accountCreated
                              ).toLocaleDateString()}
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </div>
            </Tab.Panel>

            {/* Panel de Seguridad */}
            <Tab.Panel>
              <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Seguridad de la Cuenta
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Administre la configuración de seguridad de su cuenta
                  </p>
                </div>

                <div className="p-6">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Cambio de contraseña */}
                    <li className="py-5">
                      <div className="flex justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-gray-400" />
                            Contraseña
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Actualice su contraseña regularmente para mayor
                            seguridad
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                          >
                            Cambiar contraseña
                          </button>
                        </div>
                      </div>
                    </li>

                    {/* Autenticación de dos factores */}
                    <li className="py-5">
                      <div className="flex justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-gray-400" />
                            Autenticación de dos factores
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Añada una capa adicional de seguridad a su cuenta
                          </p>
                          <div className="mt-2 flex items-center">
                            {userData.mfaEnabled ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <Check className="mr-1 h-3 w-3" />
                                Habilitado
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                No habilitado
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          {userData.mfaEnabled ? (
                            <button
                              onClick={() => {
                                setUserData({
                                  ...userData,
                                  mfaEnabled: false,
                                });
                                toast.success(
                                  "Autenticación de dos factores deshabilitada"
                                );
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                            >
                              Deshabilitar
                            </button>
                          ) : (
                            <button
                              onClick={() => setIsMfaModalOpen(true)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-[#ec7211] hover:bg-[#dd6b10] focus:outline-none"
                            >
                              Habilitar
                            </button>
                          )}
                        </div>
                      </div>
                    </li>

                    {/* Historial de inicios de sesión */}
                    <li className="py-5">
                      <div className="flex justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-gray-400" />
                            Historial de actividad
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Revise sus actividades recientes e inicios de sesión
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() => setIsLoginHistoryModalOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                          >
                            Ver historial
                          </button>
                        </div>
                      </div>
                    </li>

                    {/* Dispositivos conectados */}
                    <li className="py-5">
                      <div className="flex justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Laptop className="mr-2 h-5 w-5 text-gray-400" />
                            Dispositivos conectados
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Administre los dispositivos que tienen acceso a su
                            cuenta
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() => setIsDevicesModalOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                          >
                            Administrar
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Tab.Panel>

            {/* Panel de Preferencias */}
            <Tab.Panel>
              <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Preferencias
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Personalice su experiencia en la plataforma
                  </p>
                </div>

                <div className="p-6">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Preferencias de notificaciones */}
                    <li className="py-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <BellRing className="mr-2 h-5 w-5 text-gray-400" />
                            Notificaciones
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Configure cómo y cuándo recibir notificaciones
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button
                            onClick={() => setIsNotificationsModalOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                          >
                            Configurar
                          </button>
                        </div>
                      </div>
                    </li>

                    {/* Preferencias de apariencia */}
                    <li className="py-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Settings className="mr-2 h-5 w-5 text-gray-400" />
                            Apariencia
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Elija entre modo claro, oscuro o automático
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <div className="flex items-center space-x-3">
                            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 focus:outline-none">
                              Claro
                            </button>
                            <button className="px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-[#0f1b2d] hover:bg-[#1a2942] focus:outline-none">
                              Oscuro
                            </button>
                            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
                              Auto
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Preferencias de idioma */}
                    <li className="py-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-gray-400" />
                            Idioma
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Seleccione el idioma de la interfaz
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <select className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm rounded-md">
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                          </select>
                        </div>
                      </div>
                    </li>

                    {/* Preferencias de tiempo */}
                    <li className="py-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-gray-400" />
                            Formato de fecha y hora
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Configure cómo se muestran las fechas y horas
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <select className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm rounded-md">
                            <option value="24h">24 horas (DD/MM/YYYY)</option>
                            <option value="12h">12 horas (DD/MM/YYYY)</option>
                            <option value="us">12 horas (MM/DD/YYYY)</option>
                          </select>
                        </div>
                      </div>
                    </li>

                    {/* Eliminar cuenta */}
                    <li className="py-5">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="text-base font-medium text-red-600 dark:text-red-500 flex items-center">
                            <Trash2 className="mr-2 h-5 w-5" />
                            Eliminar cuenta
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Eliminar permanentemente su cuenta y todos sus datos
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button
                            onClick={() => setIsDeleteAccountModalOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-700 text-sm font-medium rounded text-red-700 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none"
                          >
                            Eliminar cuenta
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Modal de cambio de contraseña */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Cambiar contraseña
                </h3>
                <div className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contraseña actual
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Confirmar nueva contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ec7211] text-base font-medium text-white hover:bg-[#dd6b10] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cambiar contraseña
                </button>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de activación MFA */}
      {isMfaModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Configurar autenticación de dos factores
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Escanee el siguiente código QR con su aplicación de
                    autenticación (como Google Authenticator, Microsoft
                    Authenticator o Authy).
                  </p>

                  <div className="flex justify-center my-6">
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                        [Código QR simulado]
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="verificationCode"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Ingrese el código de verificación
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleEnableMfa}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ec7211] text-base font-medium text-white hover:bg-[#dd6b10] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Verificar y activar
                </button>
                <button
                  type="button"
                  onClick={() => setIsMfaModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de historial de actividad */}
      {isLoginHistoryModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Historial de Actividad
                </h3>

                {/* Pestañas para el historial */}
                <Tab.Group
                  selectedIndex={activeHistoryTab}
                  onChange={setActiveHistoryTab}
                >
                  <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-4">
                    <Tab
                      className={({ selected }) =>
                        clsx(
                          "py-2 px-4 text-sm font-medium border-b-2 focus:outline-none",
                          selected
                            ? "border-[#ec7211] text-[#ec7211]"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )
                      }
                    >
                      Inicios de sesión
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        clsx(
                          "py-2 px-4 text-sm font-medium border-b-2 focus:outline-none",
                          selected
                            ? "border-[#ec7211] text-[#ec7211]"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )
                      }
                    >
                      Actividades
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    {/* Panel de inicios de sesión */}
                    <Tab.Panel>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-[#121e33]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Fecha y hora
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Dirección IP
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Ubicación
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Dispositivo
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Estado
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-[#0f1b2d] divide-y divide-gray-200 dark:divide-gray-700">
                            {loginHistoryData.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {item.ip}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {item.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {item.device}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {item.status === "success" ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      Exitoso
                                    </span>
                                  ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                      Fallido
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Panel>

                    {/* Panel de actividades */}
                    <Tab.Panel>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-[#121e33]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Fecha y hora
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Acción
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                              >
                                Dirección IP
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-[#0f1b2d] divide-y divide-gray-200 dark:divide-gray-700">
                            {activityHistoryData.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {item.action}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {item.ip}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsLoginHistoryModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de dispositivos conectados */}
      {isDevicesModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Dispositivos Conectados
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-[#121e33]">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Dispositivo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Navegador / SO
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Última actividad
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Ubicación
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-[#0f1b2d] divide-y divide-gray-200 dark:divide-gray-700">
                      {connectedDevicesData.map((device) => (
                        <tr key={device.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {device.type === "desktop" && (
                                <Laptop className="h-5 w-5 mr-2 text-gray-400" />
                              )}
                              {device.type === "mobile" && (
                                <Smartphone className="h-5 w-5 mr-2 text-gray-400" />
                              )}
                              {device.type === "tablet" && (
                                <Tablet className="h-5 w-5 mr-2 text-gray-400" />
                              )}
                              {device.type === "laptop" && (
                                <Laptop className="h-5 w-5 mr-2 text-gray-400" />
                              )}
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                {device.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {device.browser} en {device.os}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {device.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {device.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {device.current ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Sesión actual
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                Activo
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            {!device.current && (
                              <button
                                onClick={() => handleRevokeDevice(device.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                              >
                                Revocar acceso
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsDevicesModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de notificaciones */}
      {isNotificationsModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Configurar notificaciones
                </h3>
                <div className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="emailNotifications"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Notificaciones por correo electrónico
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 dark:border-gray-600 rounded"
                      />
                      <label
                        htmlFor="emailNotifications"
                        className="ml-2 block text-sm text-gray-900 dark:text-white"
                      >
                        Activar notificaciones por correo electrónico
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="pushNotifications"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Notificaciones push
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="pushNotifications"
                        className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 dark:border-gray-600 rounded"
                      />
                      <label
                        htmlFor="pushNotifications"
                        className="ml-2 block text-sm text-gray-900 dark:text-white"
                      >
                        Activar notificaciones push
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsNotificationsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación de cuenta */}
      {isDeleteAccountModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-red-600 dark:text-red-500">
                  Eliminar cuenta
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ¿Está seguro de que desea eliminar permanentemente su cuenta
                    y todos sus datos?
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full inline-flex justify-center rounded-md border border-red-300 dark:border-red-700 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 dark:text-red-500 hover:bg-red-50 focus:outline-none sm:ml-3 sm:w-auto sm:text sm:text-sm"
                >
                  Eliminar cuenta
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteAccountModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto
                sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
