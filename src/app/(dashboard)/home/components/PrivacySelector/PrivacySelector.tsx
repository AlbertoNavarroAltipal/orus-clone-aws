"use client"

import { FC, useState } from 'react';
import { Icon } from "@/components/ui/Icon";

interface PostPrivacy {
  id: string;
  icon: string;
  label: string;
  description: string;
}

interface PrivacySelectorProps {
  selectedPrivacy: PostPrivacy;
  isPrivacyOpen: boolean;
  setSelectedPrivacy: (privacy: PostPrivacy) => void;
  setIsPrivacyOpen: (isOpen: boolean) => void;
}

const privacyOptions: PostPrivacy[] = [
  {
    id: "public",
    icon: "globe",
    label: "Público",
    description: "Cualquier persona dentro o fuera",
  },
  {
    id: "private",
    icon: "lock",
    label: "Privado",
    description: "Solo tú",
  },
  {
    id: "specific-person",
    icon: "user",
    label: "Persona específica",
    description: "Selecciona personas específicas",
  },
  {
    id: "specific-role",
    icon: "briefcase",
    label: "Cargo específico",
    description: "Personas con un cargo específico",
  },
  {
    id: "gender",
    icon: "users",
    label: "Género",
    description: "Basado en género",
  },
  {
    id: "city",
    icon: "mapPin",
    label: "Ciudad",
    description: "Personas en una ubicación específica",
  },
];

export const PrivacySelector: FC<PrivacySelectorProps> = ({
  selectedPrivacy,
  isPrivacyOpen,
  setSelectedPrivacy,
  setIsPrivacyOpen,
}) => {
  const [searchText, setSearchText] = useState("");

  const filteredOptions = privacyOptions.filter(option => 
    option.label.toLowerCase().includes(searchText.toLowerCase()) ||
    option.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-[#2a3f59] hover:bg-[#35495e] transition-colors"
      >
        <Icon name={selectedPrivacy.icon} className="h-5 w-5" />
        <span>{selectedPrivacy.label}</span>
        <Icon name="chevronDown" className="h-4 w-4" />
      </button>

      {isPrivacyOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#2a3f59] rounded-lg shadow-lg z-10 p-2">
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Buscar nivel de privacidad..."
                className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white placeholder-gray-400 mb-2"
              />
              <Icon 
                name="search" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              />
            </div>
            
            {filteredOptions.length === 0 ? (
              <div className="py-2 text-center text-sm text-gray-400">
                No se encontraron opciones.
              </div>
            ) : (
              <div className="space-y-1 max-h-[250px] overflow-y-auto">
                {filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedPrivacy(option);
                      setIsPrivacyOpen(false);
                      setSearchText("");
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-[#35495e] rounded-lg transition-colors"
                  >
                    <Icon name={option.icon} className="h-5 w-5 text-gray-400" />
                    <div className="text-left flex-1">
                      <p className="text-white text-sm">{option.label}</p>
                      <p className="text-gray-400 text-xs">{option.description}</p>
                    </div>
                    {selectedPrivacy.id === option.id && (
                      <Icon name="check" className="h-4 w-4 text-[#ec7211]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySelector;