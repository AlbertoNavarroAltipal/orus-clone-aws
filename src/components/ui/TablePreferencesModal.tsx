// src/components/ui/TablePreferencesModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: "servicio", label: "Servicio" },
  { key: "region", label: "Región" },
  { key: "limiteUso", label: "Límite de uso de capa gratuita de AWS" },
  { key: "usoActual", label: "Uso actual" },
  { key: "usoPrevisto", label: "Uso previsto" },
  { key: "porcentajeReal", label: "Porcentaje de uso real de MTD" },
  { key: "porcentajePrevisto", label: "Porcentaje de uso previsto de MTD" },
];

interface TablePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TablePreferencesModal = ({
  isOpen,
  onClose,
}: TablePreferencesModalProps) => {
  const [selectedSize, setSelectedSize] = useState("10");
  const [adjustLines, setAdjustLines] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  if (!isOpen) return null;

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0f1b2d] rounded-lg w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl text-white">Preferencias</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className="text-white mb-4">Tamaño de la tabla</h3>
              <div className="space-y-3">
                {["10", "20", "40", "60"].map((size) => (
                  <label
                    key={size}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <input
                      type="radio"
                      name="tableSize"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="form-radio text-blue-500 border-gray-600 bg-transparent"
                    />
                    <span>{size} líneas</span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={adjustLines}
                    onChange={(e) => setAdjustLines(e.target.checked)}
                    className="form-checkbox text-blue-500 border-gray-600 bg-transparent"
                  />
                  <span>Ajustar líneas</span>
                </label>
                <p className="text-sm text-gray-500 mt-1 ml-6">
                  Seleccione para ajustar líneas y ver todos los textos
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-white mb-4">Seleccionar columnas visibles</h3>
              <div className="space-y-3">
                <h4 className="text-gray-400 font-medium">Propiedades</h4>
                {columns.map((column) => (
                  <label
                    key={column.key}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <span>{column.label}</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={visibleColumns.includes(column.key)}
                        onChange={() => toggleColumn(column.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#0073bb] hover:text-blue-400"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ec7211] text-white rounded hover:bg-[#ec7211]/90"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePreferencesModal;
