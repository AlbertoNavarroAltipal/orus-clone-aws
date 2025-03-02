import React, { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
  isSubmitting?: boolean;
  danger?: boolean;
}

/**
 * Componente base para modales, puede ser reutilizado en toda la aplicación
 */
const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = "Guardar",
  size = "md",
  isSubmitting = false,
  danger = false,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-md",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white dark:bg-[#0f1b2d] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full`}
        >
          <div className="bg-white dark:bg-[#0f1b2d] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className={`text-lg leading-6 font-medium ${
                danger
                  ? "text-red-600 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {title}
            </h3>
            {children}
          </div>
          <div className="bg-gray-50 dark:bg-[#121e33] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center rounded-md border ${
                  danger
                    ? "border-red-300 dark:border-red-700 text-red-700 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "border-transparent shadow-sm text-white bg-[#ec7211] hover:bg-[#dd6b10]"
                } px-4 py-2 text-base font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {isSubmitting ? "Procesando..." : submitLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
