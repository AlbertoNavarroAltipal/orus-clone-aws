"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { clsx } from "clsx";

// Componentes de la página de cuenta
import AccountHeader from "./components/AccountHeader";
import ProfilePanel from "./components/ProfilePanel";
import SecurityPanel from "./components/SecurityPanel";
import PreferencesPanel from "./components/PreferencesPanel";


// Definición de pestañas
const TABS = [
  { id: "profile", label: "Información de Perfil" },
  { id: "security", label: "Seguridad" },
  { id: "preferences", label: "Preferencias" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white dark:bg-[#0f1b2d]">
      {/* Contenido principal */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AccountHeader />

        {/* Pestañas */}
        <Tab.Group
          as="div"
          selectedIndex={activeTab}
          onChange={setActiveTab}
          className="mb-8"
        >
          <Tab.List className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {TABS.map((tab, index) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  clsx(
                    "py-3 px-4 text-sm font-medium border-b-2 focus:outline-none",
                    selected
                      ? "border-[#004f9f] text-[#004f9f]"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  )
                }
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {/* Panel de Información de Perfil */}
            <Tab.Panel>
              <ProfilePanel />
            </Tab.Panel>

            {/* Panel de Seguridad */}
            <Tab.Panel>
              <SecurityPanel />
            </Tab.Panel>

            {/* Panel de Preferencias */}
            <Tab.Panel>
              <PreferencesPanel />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
