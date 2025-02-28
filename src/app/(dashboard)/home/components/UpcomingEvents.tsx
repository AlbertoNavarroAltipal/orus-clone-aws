// src/app/(dashboard)/home/components/UpcomingEvents.tsx
"use client";

import { Icon } from "@/components/ui/Icon";

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'training' | 'deadline' | 'event';
  description: string;
  participants?: number;
  startTime?: string;
  endTime?: string;
  location?: string;
  organizer?: string;
  status?: 'upcoming' | 'inProgress' | 'completed';
}

const events: UpcomingEvent[] = [
  {
    id: "1",
    title: "Reunión Trimestral Q4",
    date: "28 Oct, 2024 - 10:00 AM",
    type: "meeting",
    description: "Revisión de objetivos y planificación estratégica",
    participants: 45,
    location: "Sala de Conferencias A",
    organizer: "Juan Pérez",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Capacitación: AWS Cloud",
    date: "15 Nov, 2024 - 2:00 PM",
    type: "training",
    description: "Sesión de formación sobre servicios cloud",
    participants: 20,
    location: "Virtual - Zoom",
    organizer: "María García",
    status: "upcoming"
  },
];

const eventConfig = {
  meeting: {
    icon: 'users',
    label: 'Reunión',
    colors: {
      light: {
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        border: 'border-blue-100'
      },
      dark: {
        bg: 'dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-indigo-900/20',
        icon: 'dark:text-blue-400',
        badge: 'dark:bg-blue-900/30 dark:text-blue-300',
        border: 'dark:border-blue-800/50'
      }
    }
  },
  training: {
    icon: 'graduationCap',
    label: 'Capacitación',
    colors: {
      light: {
        bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        icon: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
        border: 'border-emerald-100'
      },
      dark: {
        bg: 'dark:bg-gradient-to-br dark:from-emerald-900/20 dark:to-teal-900/20',
        icon: 'dark:text-emerald-400',
        badge: 'dark:bg-emerald-900/30 dark:text-emerald-300',
        border: 'dark:border-emerald-800/50'
      }
    }
  },
  deadline: {
    icon: 'alertCircle',
    label: 'Fecha límite',
    colors: {
      light: {
        bg: 'bg-gradient-to-br from-red-50 to-orange-50',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-700',
        border: 'border-red-100'
      },
      dark: {
        bg: 'dark:bg-gradient-to-br dark:from-red-900/20 dark:to-orange-900/20',
        icon: 'dark:text-red-400',
        badge: 'dark:bg-red-900/30 dark:text-red-300',
        border: 'dark:border-red-800/50'
      }
    }
  },
  event: {
    icon: 'calendar',
    label: 'Evento',
    colors: {
      light: {
        bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-700',
        border: 'border-purple-100'
      },
      dark: {
        bg: 'dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-pink-900/20',
        icon: 'dark:text-purple-400',
        badge: 'dark:bg-purple-900/30 dark:text-purple-300',
        border: 'dark:border-purple-800/50'
      }
    }
  }
};

export function UpcomingEvents() {
  return (
    <div className="bg-white dark:bg-[#232f3e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-200">
      {/* Header con fondo decorativo */}
      <div className="relative bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 p-6">
        <div className="absolute inset-0 opacity-25 dark:opacity-10">
          <div className="absolute inset-0 pattern-dots pattern-gray-500 pattern-bg-transparent pattern-size-4 pattern-opacity-10" />
        </div>
        
        {/* Header Content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-[#2a3f59] rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
              <Icon 
                name="calendarDays" 
                className="h-6 w-6 text-blue-600 dark:text-blue-400" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Próximos Eventos
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                {events.length} eventos programados
              </p>
            </div>
          </div>
          
          {/* <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors duration-200">
              <Icon name="filter" className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-[#2a3f59] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#35495e] transition-colors duration-200 shadow-sm">
              <Icon name="plus" className="h-4 w-4" />
              <span>Crear evento</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`group relative rounded-xl p-4 transition-all duration-200 ${eventConfig[event.type].colors.light.bg} ${eventConfig[event.type].colors.dark.bg} hover:shadow-lg`}
            >
              <div className="flex items-start gap-4">
                {/* Icono del Evento */}
                <div className="relative flex-shrink-0">
                  <div className={`p-4 rounded-xl bg-white dark:bg-[#2a3f59] shadow-sm transition-transform duration-200 group-hover:scale-105`}>
                    <Icon
                      name={eventConfig[event.type].icon}
                      className={`h-6 w-6 ${eventConfig[event.type].colors.light.icon} ${eventConfig[event.type].colors.dark.icon}`}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white dark:bg-[#2a3f59] shadow-sm border border-gray-100 dark:border-gray-800">
                    {eventConfig[event.type].label}
                  </div>
                </div>

                {/* Contenido del Evento */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                          <Icon name="clock" className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                            <Icon name="mapPin" className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.organizer && (
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                            <Icon name="user" className="h-4 w-4" />
                            <span>{event.organizer}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                        <Icon name="bell" className="h-5 w-5" />
                      </button>
                      <button className="p-2 opacity-0 group-hover:opacity-100 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                        <Icon name="moreVertical" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Participantes */}
                  {event.participants && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                      <div className="flex items-center -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-[#232f3e] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400"
                          >
                            U{i + 1}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-[#232f3e] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                          +{event.participants - 3}
                        </div>
                      </div>

                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                        <Icon name="userPlus" className="h-4 w-4" />
                        <span>Unirse</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío o botones de acción */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center">
              <Icon 
                name="calendar" 
                className="h-8 w-8 text-blue-600 dark:text-blue-400" 
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No hay eventos próximos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
              Cuando se programen nuevos eventos, aparecerán aquí
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
              Programar evento
            </button>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-4">
            <button className="flex-1 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
              Ver calendario completo
            </button>
            {/* <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              Exportar eventos
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}