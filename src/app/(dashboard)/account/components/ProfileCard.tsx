import React from "react";
import {
  User,
  Camera,
  Mail,
  Phone,
  Building,
  MapPin,
  Globe,
  Calendar,
  CreditCard,
  Users,
  ShoppingBag,
  Layers,
  Store,
  Briefcase,
  Flag,
  Warehouse,
} from "lucide-react";
import { UserData } from "@/types/UserData";

interface ProfileCardProps {
  userData: UserData;
}

/**
 * Componente que muestra la información del perfil del usuario
 * de forma estructurada en secciones con diseño mejorado
 */
const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  return (
    <div className="p-6">
      {/* Tarjeta de perfil principal */}
      <div className="flex flex-col sm:flex-row items-center p-6 mb-8 bg-gradient-to-r from-[#0f1b2d]/90 to-[#232f3e] rounded-lg shadow-md text-white">
        <div className="relative mb-6 sm:mb-0 sm:mr-8">
          <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-[#ec7211] flex items-center justify-center text-white overflow-hidden">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt={`${userData.firstName} ${userData.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-14 w-14" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 rounded-full bg-[#ec7211] p-2 border-2 border-white cursor-pointer hover:bg-[#dd6b10] transition-colors">
            <Camera className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-1">
            {userData.firstName} {userData.lastName}
          </h2>
          <div className="text-gray-300 mb-3">{userData.jobTitle}</div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-[#ec7211]" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-[#ec7211]" />
              <span>{userData.phone}</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-[#ec7211]" />
              <span>{userData.dni || "No especificado"}</span>
            </div>
          </div>
        </div>

        {/* Última actividad */}
        <div className="hidden lg:block ml-auto bg-white/10 rounded-lg p-3 text-sm">
          <div className="text-gray-300 mb-1">Último acceso</div>
          <div className="flex items-center text-white">
            <Calendar className="h-4 w-4 mr-2 text-[#ec7211]" />
            {new Date(userData.lastAccess).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div>
          {/* Información Personal */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-[#ec7211]" />
                Información Personal
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Nombre completo
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {userData.firstName} {userData.lastName}
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    DNI
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {userData.dni || "No especificado"}
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Fecha de nacimiento
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.birthDate
                        ? new Date(userData.birthDate).toLocaleDateString()
                        : "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Género
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {userData.gender || "No especificado"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#ec7211]" />
                Información de Contacto
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Correo corporativo
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.email}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Correo personal
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.personalEmail || "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Teléfono
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.phone}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Ubicación y Preferencias */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Globe className="mr-2 h-5 w-5 text-[#ec7211]" />
                Ubicación y Preferencias
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ubicación
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.location}, {userData.country}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Zona horaria
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.timezone}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Idioma preferido
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {userData.language}
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sitio
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Store className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.site || "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    CEDI
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Warehouse className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.cedi || "No especificado"}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div>
          {/* Información Laboral */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-[#ec7211]" />
                Información Laboral
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Cargo
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.jobTitle}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Departamento
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.department}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gerencia
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.management || "No especificado"}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Información Comercial */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-[#ec7211]" />
                Información Comercial
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Zona de ventas
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.salesZone || "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Canal
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.channel || "No especificado"}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Información de la Cuenta */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-[#ec7211]" />
                Información de la Cuenta
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Último acceso
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(userData.lastAccess).toLocaleString()}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Cuenta creada
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(userData.accountCreated).toLocaleDateString()}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Estado de la cuenta
                  </dt>
                  <dd className="text-sm col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Activa
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
