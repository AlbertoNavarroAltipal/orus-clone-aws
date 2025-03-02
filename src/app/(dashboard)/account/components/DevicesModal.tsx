import React from "react";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import BaseModal from "./BaseModal";
import { ConnectedDevice } from "@/types/UserData";

interface DevicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: readonly ConnectedDevice[];
  onRevokeDevice: (deviceId: number) => void;
}

/**
 * Modal que muestra los dispositivos conectados y permite revocar el acceso
 */
const DevicesModal: React.FC<DevicesModalProps> = ({
  isOpen,
  onClose,
  devices,
  onRevokeDevice,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      title="Dispositivos Conectados"
      onClose={onClose}
      size="xl"
    >
      <div className="mt-4">
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
              {devices.map((device) => (
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
                        onClick={() => onRevokeDevice(device.id)}
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
    </BaseModal>
  );
};

export default DevicesModal;
