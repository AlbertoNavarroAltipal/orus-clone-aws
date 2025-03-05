// src/app/(dashboard)/account/components/ProfileCard.tsx
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { UserData } from "@/types/UserData";

interface ProfileCardProps {
  userData: UserData | null;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente de Skeleton para mostrar durante la carga
 */
const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 animate-pulse">
      {/* Tarjeta de perfil principal - Skeleton */}
      <div className="flex flex-col sm:flex-row items-center p-6 mb-8 bg-gradient-to-r from-[#0f1b2d]/90 to-[#232f3e] rounded-lg shadow-md text-white">
        <div className="relative mb-6 sm:mb-0 sm:mr-8">
          <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-[#004f9f]/50 flex items-center justify-center"></div>
          <div className="absolute bottom-0 right-0 rounded-full bg-[#004f9f]/50 p-2 border-2 border-white/30"></div>
        </div>
        <div className="text-center sm:text-left w-full sm:w-2/3">
          <div className="h-8 w-48 bg-white/20 rounded mb-2"></div>
          <div className="h-4 w-32 bg-white/10 rounded mb-4"></div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
            <div className="h-5 w-32 bg-white/20 rounded"></div>
            <div className="h-5 w-32 bg-white/20 rounded"></div>
            <div className="h-5 w-32 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda - Skeleton */}
        <div>
          {/* Información Personal - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Información de Contacto - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicación - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha - Skeleton */}
        <div>
          {/* Información Laboral - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Información Comercial - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Información de la Cuenta - Skeleton */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded col-span-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente que muestra la información del perfil del usuario
 * de forma estructurada en secciones con diseño mejorado
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  userData,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-[#004f9f] text-white rounded-md hover:bg-[#003d7a] transition-colors"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-6">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <p className="text-yellow-600 dark:text-yellow-400 text-lg">
          No se encontraron datos del usuario
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Tarjeta de perfil principal */}
      <div className="flex flex-col sm:flex-row items-center p-6 mb-8 bg-gradient-to-r from-[#0f1b2d]/90 to-[#232f3e] rounded-lg shadow-md text-white">
        <div className="relative mb-6 sm:mb-0 sm:mr-8">
          <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-[#004f9f] flex items-center justify-center text-white overflow-hidden">
            {userData.fotoPerfil ? (
              <img
                src={userData.fotoPerfil}
                alt={userData.nombreCompleto}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-14 w-14" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 rounded-full bg-[#004f9f] p-2 border-2 border-white cursor-pointer hover:bg-[#dd6b10] transition-colors">
            <Camera className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-1">
            {userData.nombreCompleto}
          </h2>
          <div className="text-gray-300 mb-3">
            {userData.cargo || "Cargo sin especificar"}
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-[#004f9f]" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-[#004f9f]" />
              <span>{userData.numeroContacto || "No especificado"}</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-[#004f9f]" />
              <span>{userData.dni || "No especificado"}</span>
            </div>
          </div>
        </div>

        {/* Última actividad */}
        <div className="hidden lg:block ml-auto bg-white/10 rounded-lg p-3 text-sm">
          <div className="text-gray-300 mb-1">Fecha de registro</div>
          <div className="flex items-center text-white">
            <Calendar className="h-4 w-4 mr-2 text-[#004f9f]" />
            {userData.fechaCreacion
              ? new Date(userData.fechaCreacion).toLocaleString()
              : "No disponible"}
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
                <User className="mr-2 h-5 w-5 text-[#004f9f]" />
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
                    {userData.nombreCompleto}
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
                      {userData.fechaNacimiento
                        ? new Date(
                            userData.fechaNacimiento
                          ).toLocaleDateString()
                        : "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Género
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    {userData.genero || "No especificado"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#004f9f]" />
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
                    Teléfono
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.numeroContacto || "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Verificación de correo
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      {userData.verificacionCorreo ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Verificado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          No verificado
                        </span>
                      )}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Ubicación e Información del Sitio */}
          <div className="bg-white dark:bg-[#121e33] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#1a2942] px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Globe className="mr-2 h-5 w-5 text-[#004f9f]" />
                Información del Sitio
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Sitio
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Store className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.sitio || "No especificado"}
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
                      {userData.codigoCedi || "No especificado"}
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
                <Briefcase className="mr-2 h-5 w-5 text-[#004f9f]" />
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
                      {userData.cargo || "No especificado"}
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
                      {userData.gerencia || "No especificado"}
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
                <ShoppingBag className="mr-2 h-5 w-5 text-[#004f9f]" />
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
                      {userData.idZonaVentas || "No especificado"}
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
                      {userData.canal || "No especificado"}
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
                <User className="mr-2 h-5 w-5 text-[#004f9f]" />
                Información de la Cuenta
              </h3>
            </div>
            <div className="p-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Fecha de creación
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.fechaCreacion
                        ? new Date(userData.fechaCreacion).toLocaleDateString()
                        : "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Última actualización
                  </dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-300 col-span-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.fechaActualizacion
                        ? new Date(
                            userData.fechaActualizacion
                          ).toLocaleDateString()
                        : "No especificado"}
                    </div>
                  </dd>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Estado de la cuenta
                  </dt>
                  <dd className="text-sm col-span-2">
                    {userData.estado ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Activa
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Inactiva
                      </span>
                    )}
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
