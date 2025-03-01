import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown, UserCircle, Settings, Shield } from "lucide-react";

const UserMenuSkeleton = () => {
  return (
    <div className="relative user-menu">
      <button className="group flex items-center gap-3 p-2 rounded-lg">
        <div className="relative">
          {/* Avatar skeleton */}
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          {/* Online status skeleton */}
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="hidden md:block text-left space-y-1">
          {/* Name skeleton */}
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          {/* Email skeleton */}
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <ChevronDown className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      </button>
    </div>
  );
};

const UserMenu = ({ session, isLoading }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  if (isLoading) {
    return <UserMenuSkeleton />;
  }

  return (
    <div className="relative user-menu">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-200"
      >
        <div className="relative">
          {/* Avatar con efecto de borde */}
          <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-white/30 transition-all duration-200">
            <Image
              src={session.user.foto_perfil || "/avatars/default.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          {/* Indicador de estado online */}
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800" />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white line-clamp-1">
            {session.user.nombre_completo}
          </p>
          <p className="text-xs text-white/70 line-clamp-1">
            {session.user.email}
          </p>
        </div>

        <ChevronDown className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-200" />
      </button>

      {/* Menú desplegable */}
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header con fondo gradiente */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full overflow-hidden ring-4 ring-white/30 dark:ring-white/20">
                  <Image
                    src={session.user.foto_perfil || "/avatars/default.png"}
                    alt="Profile"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800" />
              </div>

              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-lg font-semibold text-white mb-0.5 line-clamp-1">
                  {session.user.nombre_completo}
                </h3>
                <p className="text-sm text-white/80 line-clamp-1">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Links de navegación */}
          <div className="p-2">
            {[
              {
                href: "/account",
                text: "Mi Cuenta",
                description: "Gestiona tu perfil y preferencias",
                icon: UserCircle,
                iconColor: "text-blue-500",
              },
              {
                href: "/settings/system",
                text: "Configuración",
                description: "Ajustes del sistema",
                icon: Settings,
                iconColor: "text-purple-500",
              },
              {
                href: "/account/security",
                text: "Seguridad",
                description: "Contraseñas y autenticación",
                icon: Shield,
                iconColor: "text-emerald-500",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-all duration-200"
              >
                <div
                  className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${item.iconColor} group-hover:scale-110 transition-transform duration-200`}
                >
                  <item.icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer con botones de acción */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700/50">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors duration-200">
                Ver perfil
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
