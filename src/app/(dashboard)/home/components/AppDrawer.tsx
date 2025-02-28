// src/app/(dashboard)/home/components/AppDrawer.tsx
import { Icon } from "@/components/ui/Icon";

interface AppItem {
  icon: string;
  name: string;
  description?: string;
  badge?: string;
  isNew?: boolean;
  color: {
    light: {
      bg: string;
      text: string;
      icon: string;
      border: string;
      hover: string;
    },
    dark: {
      bg: string;
      text: string;
      icon: string;
      border: string;
      hover: string;
    }
  };
}

const apps: AppItem[] = [
  {
    icon: 'mail',
    name: 'Email',
    description: 'Gestiona tu correo',
    badge: '23',
    color: {
      light: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'bg-blue-500',
        border: 'border-blue-100',
        hover: 'hover:bg-blue-100/70'
      },
      dark: {
        bg: 'dark:bg-blue-950/40',
        text: 'dark:text-blue-400',
        icon: 'dark:bg-blue-500',
        border: 'dark:border-blue-900/50',
        hover: 'dark:hover:bg-blue-900/50'
      }
    }
  },
  {
    icon: 'calendar',
    name: 'Calendario',
    description: 'Agenda y eventos',
    isNew: true,
    color: {
      light: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'bg-purple-500',
        border: 'border-purple-100',
        hover: 'hover:bg-purple-100/70'
      },
      dark: {
        bg: 'dark:bg-purple-950/40',
        text: 'dark:text-purple-400',
        icon: 'dark:bg-purple-500',
        border: 'dark:border-purple-900/50',
        hover: 'dark:hover:bg-purple-900/50'
      }
    }
  },
  // ... [resto de los apps con el mismo patrón de color]
];

export function AppDrawer() {
  return (
    <div className="bg-white dark:bg-[#232f3e] rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-200">
      {/* Header con patrón de fondo */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/50"></div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-[#2a3f59] rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700/50">
              <Icon 
                name="grid" 
                className="h-6 w-6 text-gray-900 dark:text-white" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tus Aplicaciones
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                Acceso rápido a tus herramientas favoritas
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200">
              <Icon name="search" className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-[#2a3f59] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#35495e] transition-all duration-200 shadow-sm">
              <Icon name="plus" className="h-4 w-4" />
              <span>Añadir app</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Grid de Apps */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {apps.map((app, index) => (
            <button
              key={index}
              className={`group relative flex flex-col items-center p-4 rounded-xl ${app.color.light.bg} ${app.color.dark.bg} ${app.color.light.hover} ${app.color.dark.hover} transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Icono con efecto hover */}
              <div className={`relative p-4 rounded-xl bg-white dark:bg-[#2a3f59] shadow-sm group-hover:shadow-md transition-all duration-300 mb-3`}>
                <Icon 
                  name={app.icon} 
                  className={`h-6 w-6 ${app.color.light.text} ${app.color.dark.text}`}
                />
                {app.badge && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-medium">
                    {app.badge}
                  </span>
                )}
                {app.isNew && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500 text-white">
                    Nuevo
                  </span>
                )}
              </div>

              {/* Texto */}
              <span className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                {app.name}
              </span>
              {app.description && (
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-1">
                  {app.description}
                </span>
              )}

              {/* Borde decorativo */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 dark:ring-gray-700/50 group-hover:ring-2 group-hover:ring-gray-300 dark:group-hover:ring-gray-600 transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Footer con acciones */}
        <div className="mt-8 flex items-center gap-4">
          <button className="flex-1 px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-white transition-all duration-200">
            Ver todas las aplicaciones
          </button>
          <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
}