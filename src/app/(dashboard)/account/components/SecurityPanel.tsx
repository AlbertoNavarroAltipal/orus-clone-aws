"use client";

import { useState } from "react";
import {
  Shield,
  Clock,
  Laptop,
  Check,
  AlertCircle,
  Lock,
  Eye,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

import useUserData from "@/hooks/useUserData";
import ChangePasswordModal from "./ChangePasswordModal";
import MfaModal from "./MfaModal";
import LoginHistoryModal from "./LoginHistoryModal";
import DevicesModal from "./DevicesModal";
import ScreenLockConfigModal from "./ScreenLockConfigModal";

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
] as const;

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
] as const;

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
] as const;

/**
 * Panel de seguridad que muestra opciones de seguridad
 * para la cuenta del usuario, incluyendo bloqueo de pantalla
 */
const SecurityPanel: React.FC = () => {
  const { userData, updateUserData } = useUserData();

  // Configuración inicial del bloqueo de pantalla (si no existe)
  const screenLock = userData.screenLock || {
    enabled: false,
    timeoutMinutes: 5,
    requirePin: false,
    pin: "",
    showClock: true,
    message: "Esta pantalla ha sido bloqueada por inactividad",
  };

  // Estado para controlar los modales
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
  const [isLoginHistoryModalOpen, setIsLoginHistoryModalOpen] = useState(false);
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false);
  const [isScreenLockModalOpen, setIsScreenLockModalOpen] = useState(false);

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
    updateUserData({
      mfaEnabled: true,
    });
    toast.success("Autenticación de dos factores habilitada correctamente");
  };

  // Función para revocar acceso a un dispositivo (simulada)
  const handleRevokeDevice = (deviceId: number) => {
    // Simulación de revocación de acceso
    toast.success("Acceso revocado correctamente");
  };

  // Función para guardar la configuración de bloqueo de pantalla
  const handleSaveScreenLock = (lockConfig: any) => {
    updateUserData({
      screenLock: lockConfig,
    });
    setIsScreenLockModalOpen(false);
    toast.success("Configuración de bloqueo guardada correctamente");
  };

  // Función para activar/desactivar rápidamente el bloqueo de pantalla
  const handleToggleScreenLock = () => {
    const newConfig = {
      ...screenLock,
      enabled: !screenLock.enabled,
    };

    updateUserData({
      screenLock: newConfig,
    });

    toast.success(
      `Bloqueo de pantalla ${newConfig.enabled ? "activado" : "desactivado"}`
    );
  };

  return (
    <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
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
                  Actualice su contraseña regularmente para mayor seguridad
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
                      updateUserData({
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

          {/* Bloqueo de pantalla (NUEVA SECCIÓN INTEGRADA) */}
          <li className="py-5">
            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-gray-400" />
                  Bloqueo de pantalla por inactividad
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Bloquee automáticamente la pantalla después de un período de
                  inactividad
                </p>
                <div className="mt-2 flex items-center">
                  {screenLock.enabled ? (
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <Check className="mr-1 h-3 w-3" />
                        Activado ({screenLock.timeoutMinutes} min)
                      </span>
                      {screenLock.requirePin && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Lock className="mr-1 h-3 w-3" />
                          PIN requerido
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Desactivado
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-2 items-end">
                <button
                  onClick={() => setIsScreenLockModalOpen(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                >
                  Configurar
                </button>
                <button
                  onClick={handleToggleScreenLock}
                  className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded focus:outline-none ${
                    screenLock.enabled
                      ? "border-red-300 dark:border-red-700 text-red-700 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                      : "border-transparent text-white bg-[#ec7211] hover:bg-[#dd6b10]"
                  }`}
                >
                  {screenLock.enabled ? "Desactivar" : "Activar"}
                </button>
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
                  Administre los dispositivos que tienen acceso a su cuenta
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

      {/* Modales */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSave={handleChangePassword}
        />
      )}

      {isMfaModalOpen && (
        <MfaModal
          isOpen={isMfaModalOpen}
          onClose={() => setIsMfaModalOpen(false)}
          onSave={handleEnableMfa}
        />
      )}

      {isLoginHistoryModalOpen && (
        <LoginHistoryModal
          isOpen={isLoginHistoryModalOpen}
          onClose={() => setIsLoginHistoryModalOpen(false)}
          loginHistoryData={loginHistoryData}
          activityHistoryData={activityHistoryData}
        />
      )}

      {isDevicesModalOpen && (
        <DevicesModal
          isOpen={isDevicesModalOpen}
          onClose={() => setIsDevicesModalOpen(false)}
          devices={connectedDevicesData}
          onRevokeDevice={handleRevokeDevice}
        />
      )}

      {isScreenLockModalOpen && (
        <ScreenLockConfigModal
          isOpen={isScreenLockModalOpen}
          onClose={() => setIsScreenLockModalOpen(false)}
          initialConfig={screenLock}
          onSave={handleSaveScreenLock}
        />
      )}
    </div>
  );
};

export default SecurityPanel;
