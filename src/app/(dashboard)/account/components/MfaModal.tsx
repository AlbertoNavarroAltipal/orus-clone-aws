import React, { useState } from "react";
import BaseModal from "./BaseModal";

interface MfaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

/**
 * Modal para configurar la autenticación de dos factores
 */
const MfaModal: React.FC<MfaModalProps> = ({ isOpen, onClose, onSave }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!verificationCode) {
      setError("El código de verificación es requerido");
      return;
    }

    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError("El código debe ser de 6 dígitos");
      return;
    }

    setIsSubmitting(true);
    // Simulamos la verificación
    setTimeout(() => {
      setIsSubmitting(false);
      onSave();
    }, 1000);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Configurar autenticación de dos factores"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="Verificar y activar"
      isSubmitting={isSubmitting}
    >
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Escanee el siguiente código QR con su aplicación de autenticación
          (como Google Authenticator, Microsoft Authenticator o Authy).
        </p>

        <div className="flex justify-center my-6">
          <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
              [Código QR simulado]
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="verificationCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Ingrese el código de verificación
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
              setError("");
            }}
            maxLength={6}
            className={`mt-1 block w-full border ${
              error
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-[#004f9f] focus:border-[#004f9f]"
            } dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Código de recuperación
          </h4>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
            <p className="text-sm font-mono text-gray-800 dark:text-gray-300">
              ABCD-EFGH-IJKL-MNOP
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Guarde este código en un lugar seguro. Lo necesitará si pierde
            acceso a su aplicación de autenticación.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

export default MfaModal;
