import { FC, useState } from "react";
import {
  AlertCircle,
  Calendar,
  Bell,
  BellRing,
  Settings,
  Mail,
  MessageSquare,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

interface NotificationsMenuProps {
  onClose: () => void;
}

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: {
    email: boolean;
    push: boolean;
    chat: boolean;
  };
};

const defaultSettings: NotificationSetting[] = [
  {
    id: "alerts",
    title: "Alertas del sistema",
    description: "Notificaciones sobre problemas o alertas importantes",
    enabled: true,
    channels: { email: true, push: true, chat: true },
  },
  {
    id: "updates",
    title: "Actualizaciones",
    description: "Cambios y nuevas características",
    enabled: true,
    channels: { email: true, push: false, chat: true },
  },
  {
    id: "reminders",
    title: "Recordatorios",
    description: "Recordatorios de tareas y eventos",
    enabled: true,
    channels: { email: true, push: true, chat: false },
  },
];

export const NotificationsMenu: FC<NotificationsMenuProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] =
    useState<NotificationSetting[]>(defaultSettings);

  const toggleSetting = (
    settingId: string,
    field: "enabled" | keyof NotificationSetting["channels"]
  ) => {
    setSettings(
      settings.map((setting) => {
        if (setting.id === settingId) {
          if (field === "enabled") {
            return { ...setting, enabled: !setting.enabled };
          } else {
            return {
              ...setting,
              channels: {
                ...setting.channels,
                [field]:
                  !setting.channels[
                    field as keyof NotificationSetting["channels"]
                  ],
              },
            };
          }
        }
        return setting;
      })
    );
  };

  // Vista de configuración de notificaciones
  if (showSettings) {
    return (
      <div className="absolute right-0 mt-2 w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Ajustes de notificaciones
              </h3>
            </div>
          </div>
        </div>

        {/* Lista de configuraciones */}
        <div className="p-4 space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {setting.title}
                    </h4>
                    <div
                      role="checkbox"
                      aria-checked={setting.enabled}
                      tabIndex={0}
                      onClick={() => toggleSetting(setting.id, "enabled")}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        setting.enabled
                          ? "bg-blue-600 border-blue-600"
                          : "bg-gray-200 border-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          setting.enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {setting.description}
                  </p>
                </div>
              </div>

              {setting.enabled && (
                <div className="flex items-center gap-2 pl-4">
                  {Object.entries(setting.channels).map(
                    ([channel, enabled]) => (
                      <button
                        key={channel}
                        onClick={() =>
                          toggleSetting(
                            setting.id,
                            channel as keyof NotificationSetting["channels"]
                          )
                        }
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                          enabled
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {channel === "email" && <Mail className="h-3 w-3" />}
                        {channel === "push" && <Bell className="h-3 w-3" />}
                        {channel === "chat" && (
                          <MessageSquare className="h-3 w-3" />
                        )}
                        <span className="capitalize">{channel}</span>
                        {enabled && <Check className="h-3 w-3" />}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista principal del menú de notificaciones
  return (
    <div className="absolute right-0 mt-2 w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Notificaciones
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mantente al día con las actualizaciones
        </p>
      </div>

      {/* Welcome Message */}
      <div className="px-12 py-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="mb-4 inline-flex p-3 rounded-full bg-blue-500 text-white">
          <BellRing className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Centro de Notificaciones
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Recibe actualizaciones importantes a través de múltiples canales
        </p>

        {/* Channels */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
            <Mail className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
            <MessageSquare className="h-5 w-5 text-green-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Chat
            </span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
            <Bell className="h-5 w-5 text-purple-500 mx-auto mb-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Push
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <span>Configurar notificaciones</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Status Summary */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-2">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            0
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Alertas
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-2">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            0
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Eventos
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-2">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            0
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Mensajes
          </div>
        </div>
      </div>
    </div>
  );
};
