"use client";

import { useState } from "react";
import { BellRing, Settings, Globe, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

import NotificationsModal from "./NotificationsModal";
import DeleteAccountModal from "./DeleteAccountModal";
import useUserData from "@/hooks/useUserData";

/**
 * Panel de preferencias del usuario
 */
const PreferencesPanel: React.FC = () => {
  const { userData, updateUserData } = useUserData();

  // Estado para controlar los modales
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  // Función para guardar preferencias de notificaciones (simulada)
  const handleSaveNotificationPreferences = async (preferences: any) => {
    // Simulación de guardado de preferencias
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateUserData({
      notificationPreferences: preferences,
    });
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

  // Función para cambiar tema
  const handleChangeTheme = (theme: string) => {
    // Aquí implementarías el cambio de tema
    toast.success(`Tema cambiado a ${theme}`);
  };

  return (
    <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
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
                  <button
                    onClick={() => handleChangeTheme("light")}
                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Claro
                  </button>
                  <button
                    onClick={() => handleChangeTheme("dark")}
                    className="px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-[#0f1b2d] hover:bg-[#1a2942] focus:outline-none"
                  >
                    Oscuro
                  </button>
                  <button
                    onClick={() => handleChangeTheme("system")}
                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                  >
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
                <select
                  onChange={(e) =>
                    toast.success(`Idioma cambiado a ${e.target.value}`)
                  }
                  defaultValue="es"
                  className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm rounded-md"
                >
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
                <select
                  onChange={(e) =>
                    toast.success(`Formato cambiado a ${e.target.value}`)
                  }
                  defaultValue="24h"
                  className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-[#ec7211] focus:border-[#ec7211] sm:text-sm rounded-md"
                >
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

      {/* Modales */}
      {isNotificationsModalOpen && (
        <NotificationsModal
          isOpen={isNotificationsModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
          preferences={userData.notificationPreferences}
          onSave={handleSaveNotificationPreferences}
        />
      )}

      {isDeleteAccountModalOpen && (
        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
          onDelete={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default PreferencesPanel;
