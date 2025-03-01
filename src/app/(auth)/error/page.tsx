"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { authErrorMap } from "@/lib/auth-errors";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMessage, setErrorMessage] = useState<string>(
    "Error de autenticación"
  );
  const [errorDescription, setErrorDescription] = useState<string>(
    "Ha ocurrido un problema durante el proceso de autenticación. Por favor intenta de nuevo."
  );

  useEffect(() => {
    if (error) {
      console.log("Error detectado:", error);

      // Verificar si es un error de dominio no autorizado
      if (
        error === "AccessDenied" ||
        error.includes("hd") ||
        error === "org_internal" ||
        error === "domain_unauthorized"
      ) {
        setErrorMessage("Dominio no autorizado");
        setErrorDescription(
          "Esta aplicación está restringida únicamente para empleados de Altipal SAS. Por favor, utiliza tu correo corporativo."
        );
      } else {
        // Obtener mensaje personalizado del mapa de errores
        const errorInfo = authErrorMap[error] || authErrorMap["Default"];

        setErrorMessage(errorInfo.title);
        setErrorDescription(errorInfo.description);
      }
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Logo de la empresa */}
        <div className="flex justify-center">
          <Image
            src="/logos/logo_orus_azul_fondo_transparente.png"
            alt="Altipal Logo"
            width={150}
            height={50}
            className="h-auto"
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{errorMessage}</h1>
          <div className="mt-2 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{errorDescription}</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              Si necesitas ayuda, contacta al equipo de soporte:
              <a
                href="mailto:soporte@altipal.com.co"
                className="text-blue-600 hover:underline ml-1"
              >
                soporte@altipal.com.co
              </a>
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver a inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
