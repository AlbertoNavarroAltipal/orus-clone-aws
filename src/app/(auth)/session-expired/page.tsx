"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, ArrowRight, Clock, ShieldAlert, AlertCircle, Shield, Lock } from "lucide-react";

export default function SessionExpiredPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel lateral */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative w-full h-full flex flex-col justify-between p-12">
          <div>
            <Image
              src="/logos/logo_letra_blanco.png"
              alt="Logo ORUS"
              width={250}
              height={40}
              className="mb-12"
              priority
            />
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <ShieldAlert className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Seguridad y Protección de Datos
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Las sesiones expiran automáticamente para proteger tu información y
                    mantener tus datos seguros en todo momento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de seguridad */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: "Control de Sesiones",
                desc: "Gestión automática de tiempos de conexión",
              },
              {
                icon: Shield,
                title: "Cierre Seguro",
                desc: "Protección automática de tu cuenta",
              },
              {
                icon: LogOut,
                title: "Datos Protegidos",
                desc: "Información asegurada en todo momento",
              },
              {
                icon: ArrowRight,
                title: "Acceso Instantáneo",
                desc: "Vuelve a conectarte con un solo clic",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-blue-300 mb-3" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="space-y-8">
            {/* Ilustración animada */}
            <div className="w-full flex justify-center">
              <div className="relative w-48 h-48">
                {/* Círculo base */}
                <div className="absolute inset-0 bg-blue-50 rounded-full" />
                {/* Círculo animado */}
                <div className="absolute inset-4 bg-orange-100 rounded-full animate-pulse" />
                {/* Icono central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <Clock className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0">
                  <Lock className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>
                <div className="absolute bottom-0 left-0">
                  <Shield className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Encabezado */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                ¡Tu sesión ha expirado!
              </h2>
              <p className="text-gray-600 text-lg">
                Por tu seguridad, la sesión se ha cerrado automáticamente
              </p>
            </div>

            {/* Alerta con diseño mejorado */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-5 rounded-lg">
              <div className="flex space-x-4">
                <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-800">
                    Cierre automático de sesión
                  </h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Para mantener la seguridad de tu cuenta, cerramos automáticamente 
                    las sesiones después de un periodo de inactividad.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones con diseño mejorado */}
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full group flex items-center justify-center px-6 py-4 
                       bg-gradient-to-r from-blue-600 to-blue-700 
                       text-white rounded-lg font-medium text-lg
                       transition-all duration-200
                       hover:from-blue-700 hover:to-blue-800 
                       focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500
                       transform hover:-translate-y-0.5
                       shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center">
                  <span>Volver a iniciar sesión</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>

              <div className="text-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 
                         transition-colors duration-200 group"
                >
                  <span className="border-b border-dashed border-gray-500 group-hover:border-gray-700">
                    ¿Necesitas ayuda? Contacta a soporte
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}