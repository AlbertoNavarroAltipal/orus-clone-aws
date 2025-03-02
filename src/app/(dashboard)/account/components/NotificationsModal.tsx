import React, { useState } from "react";
import BaseModal from "./BaseModal";

interface NotificationPreferences {
  email: {
    security: boolean;
    marketing: boolean;
    updates: boolean;
    reports: boolean;
  };
  push: {
    security: boolean;
    marketing: boolean;
    updates: boolean;
    reports: boolean;
  };
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: NotificationPreferences;
  onSave: (preferences: NotificationPreferences) => void;
}

/**
 * Modal para configurar preferencias de notificaciones
 */
const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSave,
}) => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [localPreferences, setLocalPreferences] =
    useState<NotificationPreferences>(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleTogglePreference = (
    channel: "email" | "push",
    type: "security" | "marketing" | "updates" | "reports",
    value: boolean
  ) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: value,
      },
    }));
  };

  const handleSubmit = () => {
    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      onSave(localPreferences);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Configurar notificaciones"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="Guardar preferencias"
      isSubmitting={isSaving}
    >
      <div className="mt-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Notificaciones por correo electrónico
            </h3>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="emailToggle"
                checked={emailEnabled}
                onChange={() => setEmailEnabled(!emailEnabled)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="emailToggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  emailEnabled ? "bg-[#ec7211]" : "bg-gray-300"
                }`}
              ></label>
            </div>
          </div>

          <div className={`space-y-3 ${!emailEnabled && "opacity-50"}`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailSecurity"
                checked={localPreferences.email.security}
                onChange={(e) =>
                  handleTogglePreference("email", "security", e.target.checked)
                }
                disabled={!emailEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="emailSecurity"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Alertas de seguridad
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailMarketing"
                checked={localPreferences.email.marketing}
                onChange={(e) =>
                  handleTogglePreference("email", "marketing", e.target.checked)
                }
                disabled={!emailEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="emailMarketing"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Promociones y novedades
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailUpdates"
                checked={localPreferences.email.updates}
                onChange={(e) =>
                  handleTogglePreference("email", "updates", e.target.checked)
                }
                disabled={!emailEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="emailUpdates"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Actualizaciones del sistema
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailReports"
                checked={localPreferences.email.reports}
                onChange={(e) =>
                  handleTogglePreference("email", "reports", e.target.checked)
                }
                disabled={!emailEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="emailReports"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Informes y reportes
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Notificaciones push
            </h3>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="pushToggle"
                checked={pushEnabled}
                onChange={() => setPushEnabled(!pushEnabled)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="pushToggle"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  pushEnabled ? "bg-[#ec7211]" : "bg-gray-300"
                }`}
              ></label>
            </div>
          </div>

          <div className={`space-y-3 ${!pushEnabled && "opacity-50"}`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushSecurity"
                checked={localPreferences.push.security}
                onChange={(e) =>
                  handleTogglePreference("push", "security", e.target.checked)
                }
                disabled={!pushEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="pushSecurity"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Alertas de seguridad
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushMarketing"
                checked={localPreferences.push.marketing}
                onChange={(e) =>
                  handleTogglePreference("push", "marketing", e.target.checked)
                }
                disabled={!pushEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="pushMarketing"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Promociones y novedades
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushUpdates"
                checked={localPreferences.push.updates}
                onChange={(e) =>
                  handleTogglePreference("push", "updates", e.target.checked)
                }
                disabled={!pushEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="pushUpdates"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Actualizaciones del sistema
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushReports"
                checked={localPreferences.push.reports}
                onChange={(e) =>
                  handleTogglePreference("push", "reports", e.target.checked)
                }
                disabled={!pushEnabled}
                className="h-4 w-4 text-[#ec7211] focus:ring-[#ec7211] border-gray-300 rounded"
              />
              <label
                htmlFor="pushReports"
                className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Informes y reportes
              </label>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default NotificationsModal;
