import React from "react";

/**
 * Componente que muestra el encabezado de la página de cuenta
 * con título y descripción de la sección
 */
const AccountHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-normal text-gray-900 dark:text-white">
          Mi Cuenta
        </h1>
        <span className="text-sm text-[#0073bb] hover:underline cursor-pointer">
          Información
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Administre su información personal, preferencias de seguridad y
        configuración de la cuenta.
      </p>
    </>
  );
};

export default AccountHeader;
