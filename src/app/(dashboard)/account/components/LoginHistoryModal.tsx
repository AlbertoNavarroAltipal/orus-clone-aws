import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import BaseModal from "./BaseModal";
import { ActivityHistoryItem, LoginHistoryItem } from "@/types/UserData";

interface LoginHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginHistoryData: readonly LoginHistoryItem[];
  activityHistoryData: readonly ActivityHistoryItem[];
}

/**
 * Modal que muestra el historial de inicios de sesión y actividades
 */
const LoginHistoryModal: React.FC<LoginHistoryModalProps> = ({
  isOpen,
  onClose,
  loginHistoryData,
  activityHistoryData,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BaseModal
      isOpen={isOpen}
      title="Historial de Actividad"
      onClose={onClose}
      size="xl"
    >
      <div className="mt-4">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-4">
            <Tab
              className={({ selected }) =>
                clsx(
                  "py-2 px-4 text-sm font-medium border-b-2 focus:outline-none",
                  selected
                    ? "border-[#004f9f] text-[#004f9f]"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                )
              }
            >
              Inicios de sesión
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  "py-2 px-4 text-sm font-medium border-b-2 focus:outline-none",
                  selected
                    ? "border-[#004f9f] text-[#004f9f]"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                )
              }
            >
              Actividades
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Panel de inicios de sesión */}
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#121e33]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Fecha y hora
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Dirección IP
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
                        Dispositivo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#0f1b2d] divide-y divide-gray-200 dark:divide-gray-700">
                    {loginHistoryData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.device}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.status === "success" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Exitoso
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Fallido
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>

            {/* Panel de actividades */}
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-[#121e33]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Fecha y hora
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Acción
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Dirección IP
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#0f1b2d] divide-y divide-gray-200 dark:divide-gray-700">
                    {activityHistoryData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </BaseModal>
  );
};

export default LoginHistoryModal;
