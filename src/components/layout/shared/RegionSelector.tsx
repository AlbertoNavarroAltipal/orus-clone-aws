"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Lock,
  Building,
  MapPin,
  Settings,
  Check,
} from "lucide-react";

interface CEDI {
  city: string;
  code: string;
  disabled?: boolean;
  status?: "active" | "maintenance" | "offline";
  address?: string;
}

interface CountryGroup {
  country: string;
  flag?: string;
  cedis: CEDI[];
}

const cediLocations: CountryGroup[] = [
  {
    country: "Colombia",
    flag: "🇨🇴",
    cedis: [
      {
        city: "Bogotá",
        code: "BOG-01",
        status: "active",
        address: "Calle 13 #27-00",
      },
      {
        city: "Medellín",
        code: "MED-01",
        status: "active",
        address: "Carrera 48 #32-45",
      },
      {
        city: "Cali",
        code: "CAL-01",
        status: "maintenance",
        address: "Av. 3N #23DN-85",
      },
      {
        city: "Barranquilla",
        code: "BAQ-01",
        status: "active",
        address: "Calle 30 #30-17",
      },
      {
        city: "Bucaramanga",
        code: "BUC-01",
        disabled: true,
        status: "offline",
        address: "Carrera 15 #14-45",
      },
      {
        city: "Cartagena",
        code: "CTG-01",
        status: "active",
        address: "Av. Pedro de Heredia #59-30",
      },
    ],
  },
  {
    country: "Panamá",
    flag: "🇵🇦",
    cedis: [
      {
        city: "Ciudad de Panamá",
        code: "PTY-01",
        status: "active",
        address: "Av. Balboa, Calle 42",
      },
      {
        city: "Colón",
        code: "COL-01",
        status: "maintenance",
        address: "Calle 13, Santa Isabel",
      },
      {
        city: "David",
        code: "DAV-01",
        disabled: true,
        status: "offline",
        address: "Av. Central",
      },
    ],
  },
];

export const RegionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCedi, setSelectedCedi] = useState(cediLocations[0].cedis[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target?.closest(".region-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "maintenance":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return "Operativo";
      case "maintenance":
        return "En mantenimiento";
      case "offline":
        return "Fuera de servicio";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="relative region-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all duration-200"
      >
        <div className="relative">
          <Building className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
          <div
            className={`absolute -bottom-1 -right-1 h-2 w-2 rounded-full ${getStatusColor(
              selectedCedi.status
            )} ring-2 ring-white dark:ring-gray-800`}
          />
        </div>
        <span className="text-sm text-white font-medium">
          {selectedCedi.city}
        </span>
        <span className="text-xs text-white/70">({selectedCedi.code})</span>
        <ChevronDown className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-200" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Seleccionar CEDI
              </h3>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Selecciona el centro de distribución con el que deseas trabajar
            </p>
          </div>

          {/* Lista de CEDIs */}
          <div className="max-h-[400px] overflow-y-auto">
            {cediLocations.map((countryGroup) => (
              <div
                key={countryGroup.country}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="px-4 py-2 flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-lg">{countryGroup.flag}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {countryGroup.country}
                  </span>
                </div>

                <div className="p-2">
                  {countryGroup.cedis.map((cedi) => (
                    <button
                      key={cedi.code}
                      onClick={() => {
                        if (!cedi.disabled) {
                          setSelectedCedi(cedi);
                          setIsOpen(false);
                        }
                      }}
                      disabled={cedi.disabled}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 group
                       ${
                         cedi.disabled
                           ? "opacity-60 cursor-not-allowed"
                           : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                       } ${
                        selectedCedi.code === cedi.code
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      {/* Estado */}
                      <div
                        className={`flex-shrink-0 mt-1 w-2 h-2 rounded-full ${getStatusColor(
                          cedi.status
                        )}`}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {cedi.city}
                          </span>
                          {selectedCedi.code === cedi.code && (
                            <Check className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{cedi.code}</span>
                          <span>•</span>
                          <span>{getStatusText(cedi.status)}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />
                          <span>{cedi.address}</span>
                        </div>
                      </div>

                      {/* Indicador disabled */}
                      {cedi.disabled && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          <Lock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Bloqueado
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700/50">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors duration-200">
              <Settings className="h-4 w-4" />
              <span>Administrar CEDIs</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
