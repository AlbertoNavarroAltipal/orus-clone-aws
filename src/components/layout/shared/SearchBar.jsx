// src/components/layout/shared/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const mockSearchResults = [
  {
    id: 1,
    name: "Reporte Mensual",
    description: "Reporte de ventas y métricas del mes de enero 2024",
    category: "Documentos",
  },
  {
    id: 2,
    name: "Juan Pérez",
    description: "Director de Ventas - Departamento Comercial",
    category: "Usuarios",
  },
  {
    id: 3,
    name: "Reunión de Equipo",
    description: "Planificación estratégica Q1 2024",
    category: "Calendario",
  },
  {
    id: 4,
    name: "Presentación Proyecto",
    description: "Documentación técnica del nuevo sistema",
    category: "Archivos",
  },
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "b") {
        e.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setIsSearchOpen(!!value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const filteredResults = mockSearchResults.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="group relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-all duration-200" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar en ORUS..."
            className="w-full h-11 pl-12 pr-20 rounded-xl bg-white/10 border-2 border-white/20 
                      text-white placeholder:text-white/60 
                      focus:bg-white/15 focus:border-white/30 focus:outline-none
                      hover:bg-white/15 hover:border-white/30
                      transition-all duration-200"
          />

          <div className="absolute right-4 flex items-center space-x-2">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4 text-white/60 hover:text-white" />
              </button>
            )}
            <kbd className="hidden md:flex items-center px-2 py-1 text-xs text-white/50 bg-white/10 rounded-lg border border-white/10">
              Alt+B
            </kbd>
          </div>
        </div>
      </div>

      {/* Lista de resultados simple */}
      {isSearchOpen && searchQuery && filteredResults.length > 0 && (
        <div
          className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 
                       rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 
                       overflow-hidden z-50"
        >
          <div className="max-h-80 overflow-y-auto">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="group flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                           cursor-pointer transition-all duration-200 border-b border-gray-100 
                           dark:border-gray-700/50 last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-base font-medium text-gray-900 dark:text-white 
                                 group-hover:text-blue-500 transition-colors duration-200"
                    >
                      {result.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full
                                   bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Mini footer con información del atajo */}
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t 
                         border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <kbd
                className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400
                            bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
              >
                ↵
              </kbd>
              <span>para seleccionar</span>
              <kbd
                className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400
                            bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
              >
                Esc
              </kbd>
              <span>para cerrar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
