import React, { useState } from "react";
import { Lock, Clock, Eye, MessageSquare } from "lucide-react";
import BaseModal from "./BaseModal";

interface ScreenLockConfig {
  enabled: boolean;
  timeoutMinutes: number;
  requirePin: boolean;
  pin?: string;
  showClock: boolean;
  message?: string;
}

interface ScreenLockConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig: ScreenLockConfig;
  onSave: (config: ScreenLockConfig) => void;
}

/**
 * Modal para configurar las opciones de bloqueo de pantalla
 */
const ScreenLockConfigModal: React.FC<ScreenLockConfigModalProps> = ({
  isOpen,
  onClose,
  initialConfig,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialConfig);
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Manejador para cambiar el estado del toggle
  const handleToggleChange = (field: keyof ScreenLockConfig) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  // Manejador para cambiar valores de formulario
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "number" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    setError("");
  };

  // Manejador para validar y guardar
  const handleSubmit = () => {
    // Validación del PIN
    if (formData.requirePin) {
      if (!formData.pin || formData.pin.length < 4) {
        setError("El PIN debe tener al menos 4 dígitos");
        return;
      }

      if (!/^\d+$/.test(formData.pin)) {
        setError("El PIN debe contener solo números");
        return;
      }
    }

    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Configuración de bloqueo de pantalla"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="Guardar configuración"
      isSubmitting={isSaving}
      size="lg"
    >
      <div className="mt-4 space-y-6">
        {/* Tiempo de inactividad */}
        <div className="bg-gray-50 dark:bg-[#121e33] p-4 rounded-lg">
          <div className="flex items-start mb-4">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <label
                htmlFor="timeoutMinutes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tiempo de inactividad antes de bloquear
              </label>
              <select
                id="timeoutMinutes"
                name="timeoutMinutes"
                value={formData.timeoutMinutes}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
              >
                <option value={1}>1 minuto</option>
                <option value={2}>2 minutos</option>
                <option value={5}>5 minutos</option>
                <option value={10}>10 minutos</option>
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                La pantalla se bloqueará automáticamente después de este tiempo
                de inactividad
              </p>
            </div>
          </div>

          {/* Requerir PIN */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start">
              <Lock className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requerir PIN para desbloquear
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Solicita un PIN numérico para desbloquear la pantalla
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="togglePin"
                checked={formData.requirePin}
                onChange={() => handleToggleChange("requirePin")}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="togglePin"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  formData.requirePin
                    ? "bg-[#ec7211]"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></label>
            </div>
          </div>

          {/* Campo para establecer PIN (visible solo si se requiere PIN) */}
          {formData.requirePin && (
            <div className="mb-4 ml-7">
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Establecer PIN (4-6 dígitos)
              </label>
              <div className="relative">
                <input
                  type={isPinVisible ? "text" : "password"}
                  id="pin"
                  name="pin"
                  value={formData.pin || ""}
                  onChange={handleInputChange}
                  maxLength={6}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={`shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 pr-10 ${
                    error
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Ingrese su PIN"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setIsPinVisible(!isPinVisible)}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
          )}

          {/* Mostrar reloj */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mostrar reloj en pantalla bloqueada
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Muestra la hora y fecha actual cuando la pantalla está
                  bloqueada
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="toggleClock"
                checked={formData.showClock}
                onChange={() => handleToggleChange("showClock")}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggleClock"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  formData.showClock
                    ? "bg-[#ec7211]"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></label>
            </div>
          </div>

          {/* Mensaje personalizado */}
          <div className="flex items-start">
            <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <div className="flex-1">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mensaje personalizado
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message || ""}
                onChange={handleInputChange}
                rows={2}
                className="shadow-sm focus:ring-[#ec7211] focus:border-[#ec7211] block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2"
                placeholder="Mensaje que se mostrará en la pantalla bloqueada"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Este mensaje se mostrará cuando la pantalla esté bloqueada
              </p>
            </div>
          </div>
        </div>

        {/* Previsualización */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            Vista previa
          </div>
          <div className="p-6 flex flex-col items-center justify-center bg-white dark:bg-[#0f1b2d] min-h-[180px]">
            {formData.showClock && (
              <div className="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              {formData.message ||
                "Esta pantalla ha sido bloqueada por inactividad"}
            </div>
            {formData.requirePin && (
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Ingrese su PIN para desbloquear
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ScreenLockConfigModal;
