"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Clock, 
  ArrowRight, 
  UserCog, 
  Shield, 
  CheckCircle2, 
  Mail,
  ClipboardCheck
} from "lucide-react";

export default function AccountPendingPage() {
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
                  <UserCog className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Verificación de Cuenta
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Tu cuenta está siendo revisada por nuestro equipo administrativo
                    para garantizar la seguridad de nuestra plataforma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del proceso */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: ClipboardCheck,
                title: "Revisión Manual",
                desc: "Verificación detallada de datos",
              },
              {
                icon: Shield,
                title: "Seguridad Primero",
                desc: "Protección de la plataforma",
              },
              {
                icon: Mail,
                title: "Notificación Email",
                desc: "Aviso inmediato de activación",
              },
              {
                icon: CheckCircle2,
                title: "Acceso Total",
                desc: "Funcionalidad completa al aprobar",
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
                <div className="absolute inset-0 bg-yellow-50 rounded-full" />
                {/* Círculo animado */}
                <div className="absolute inset-4 bg-yellow-100 rounded-full animate-pulse" />
                {/* Icono central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <Clock className="w-12 h-12 text-yellow-500" />
                  </div>
                </div>
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0">
                  <UserCog className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
                <div className="absolute bottom-0 left-0">
                  <CheckCircle2 className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Encabezado */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Cuenta Pendiente de Activación
              </h2>
              <p className="text-gray-600 text-lg">
                Tu registro ha sido recibido y está siendo revisado
              </p>
            </div>

            {/* Mensaje informativo */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
              <div className="space-y-3">
                <h4 className="font-medium text-yellow-800 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Estado de tu cuenta
                </h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Tu cuenta está siendo verificada por nuestro equipo administrativo. 
                  Este proceso puede tomar hasta 24 horas hábiles. Recibirás un 
                  correo electrónico cuando tu cuenta sea activada.
                </p>
              </div>
            </div>

            {/* Pasos del proceso */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm">Registro completado</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-600">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm">Verificación en proceso</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-400">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm">Cuenta activada</p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full group flex items-center justify-center px-6 py-3 
                       text-blue-600 rounded-lg font-medium
                       border-2 border-blue-600
                       transition-all duration-200
                       hover:bg-blue-50
                       focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex items-center">
                  <span>Volver al inicio de sesión</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>

              {/* Cerrar sesión */}
              <button
                onClick={handleLogin}
                className="w-full group flex items-center justify-center px-6 py-3 
                       text-white rounded-lg font-medium
                       bg-blue-600
                       transition-all duration-200
                       hover:bg-blue-700
                       focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex items-center">
                  <span>Cerrar sesión</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
              


              <div className="text-center">
                <p className="text-sm text-gray-500">
                  ¿Necesitas ayuda? {" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center hover:underline"
                  >
                    Contacta a soporte
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}