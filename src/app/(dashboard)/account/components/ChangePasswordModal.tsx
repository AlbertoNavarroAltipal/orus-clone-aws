import React, { useState } from "react";
import BaseModal from "./BaseModal";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

/**
 * Modal para cambiar la contraseña del usuario
 */
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!currentPassword) {
      newErrors.currentPassword = "La contraseña actual es requerida";
    }

    if (!newPassword) {
      newErrors.newPassword = "La nueva contraseña es requerida";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "La confirmación es requerida";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Cambiar contraseña"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="Cambiar contraseña"
    >
      <div className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Contraseña actual
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.currentPassword
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-[#004f9f] focus:border-[#004f9f]"
            } dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nueva contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.newPassword
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-[#004f9f] focus:border-[#004f9f]"
            } dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.confirmPassword
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-[#004f9f] focus:border-[#004f9f]"
            } dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ChangePasswordModal;
