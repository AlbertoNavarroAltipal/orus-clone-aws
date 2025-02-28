"use client";

import { FC } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";

interface SettingsMenuProps {
  onClose: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: "light",
      label: "Tema Claro",
      description: "Mejor visibilidad con luz",
      icon: Sun,
      iconColor: "text-amber-500",
    },
    {
      value: "dark",
      label: "Tema Oscuro",
      description: "Reduce la fatiga visual",
      icon: Moon,
      iconColor: "text-indigo-500",
    },
    {
      value: "system",
      label: "Sistema",
      description: "Según preferencias del sistema",
      icon: Monitor,
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Preferencias
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            TEMA
          </label>
          <div className="space-y-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 
                  ${
                    theme === option.value
                      ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/50"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700 ${option.iconColor}`}
                >
                  <option.icon className="h-4 w-4" />
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {option.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
            IDIOMA
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/50">
              <span className="text-lg">🇪🇸</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Español
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
              <span className="text-lg">🇺🇸</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                English
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
