"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function UnauthorizedDomain() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

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
          <h1 className="text-2xl font-bold text-gray-900">
            Acceso no autorizado
          </h1>
          <div className="mt-2 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">
              Esta aplicación está restringida únicamente para empleados de
              Altipal SAS.
            </p>
            {email && (
              <p className="mt-2 text-sm text-red-700">
                El correo <span className="font-medium">{email}</span> no
                pertenece al dominio autorizado.
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              Si eres empleado de Altipal, por favor inicia sesión con tu correo
              corporativo (@altipal.com.co).
            </p>
            <p className="mt-4 text-gray-600 text-sm">
              Para obtener ayuda, contacta al equipo de soporte:
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
