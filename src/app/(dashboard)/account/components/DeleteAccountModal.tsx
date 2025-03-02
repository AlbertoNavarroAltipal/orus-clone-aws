import React, { useState } from "react";
import BaseModal from "./BaseModal";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * Modal para confirmar la eliminación permanente de la cuenta
 */
const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (confirmation !== "ELIMINAR") {
      return;
    }

    setIsDeleting(true);
    // Simular eliminación
    setTimeout(() => {
      onDelete();
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Eliminar cuenta"
      onClose={onClose}
      onSubmit={handleDelete}
      submitLabel="Eliminar cuenta"
      danger={true}
      isSubmitting={isDeleting}
    >
      <div className="mt-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md mb-4">
          <p className="text-sm text-red-700 dark:text-red-400">
            <strong>Advertencia:</strong> Esta acción es irreversible. Se
            eliminarán permanentemente todos sus datos, incluyendo su perfil,
            configuraciones y acceso a los recursos de la plataforma.
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          ¿Está seguro de que desea eliminar permanentemente su cuenta? Escriba
          <strong className="text-gray-700 dark:text-gray-300">
            {" "}
            ELIMINAR{" "}
          </strong>
          para confirmar esta acción.
        </p>

        <div className="mb-4">
          <label
            htmlFor="confirmDelete"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirmación
          </label>
          <input
            type="text"
            id="confirmDelete"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className={`mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm`}
            placeholder="Escriba ELIMINAR para confirmar"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteAccountModal;
