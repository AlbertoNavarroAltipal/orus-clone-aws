"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  KeyRound, 
  ArrowRight, 
  Loader2, 
  Mail, 
  ShieldCheck, 
  LockKeyhole,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido");
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Error al enviar el correo de recuperación. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
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
                  <ShieldCheck className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Recuperación Segura de Cuenta
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Nuestro proceso de recuperación de contraseña está diseñado
                    para garantizar la seguridad de tu cuenta en todo momento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de seguridad */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: Mail,
                title: "Correo Verificado",
                desc: "Envío seguro de instrucciones",
              },
              {
                icon: ShieldCheck,
                title: "Proceso Seguro",
                desc: "Múltiples capas de protección",
              },
              {
                icon: LockKeyhole,
                title: "Enlaces Únicos",
                desc: "Tokens de un solo uso",
              },
              {
                icon: CheckCircle2,
                title: "Acceso Rápido",
                desc: "Recupera tu cuenta al instante",
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
          {!success ? (
            <div className="space-y-8">
              {/* Ilustración animada */}
              <div className="w-full flex justify-center">
                <div className="relative w-48 h-48">
                  {/* Círculo base */}
                  <div className="absolute inset-0 bg-blue-50 rounded-full" />
                  {/* Círculo animado */}
                  <div className="absolute inset-4 bg-blue-100 rounded-full animate-pulse" />
                  {/* Icono central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                      <KeyRound className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                  {/* Elementos decorativos */}
                  <div className="absolute top-0 right-0">
                    <Mail className="w-8 h-8 text-blue-400 animate-bounce" />
                  </div>
                  <div className="absolute bottom-0 left-0">
                    <LockKeyhole className="w-8 h-8 text-blue-400 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Encabezado */}
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  ¿Olvidaste tu contraseña?
                </h2>
                <p className="text-gray-600 text-lg">
                  No te preocupes, te ayudamos a recuperar tu cuenta
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex">
                    <ShieldAlert className="h-5 w-5 text-red-500" />
                    <p className="ml-3 text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 px-3 py-3 border rounded-lg
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               text-gray-900 placeholder-gray-400"
                      placeholder="nombre@empresa.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full group flex items-center justify-center px-6 py-4 
                         bg-gradient-to-r from-blue-600 to-blue-700
                         text-white rounded-lg font-medium text-lg
                         transition-all duration-200
                         hover:from-blue-700 hover:to-blue-800
                         focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500
                         transform hover:-translate-y-0.5
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando instrucciones...
                    </>
                  ) : (
                    <div className="flex items-center">
                      <span>Enviar instrucciones</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Ilustración de éxito */}
              <div className="w-full flex justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-green-50 rounded-full" />
                  <div className="absolute inset-4 bg-green-100 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                      <Mail className="w-12 h-12 text-green-500" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <CheckCircle2 className="w-8 h-8 text-green-400 animate-bounce" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  ¡Revisa tu correo!
                </h2>
                <p className="text-gray-600 text-lg">
                  Hemos enviado las instrucciones de recuperación a
                  <br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full text-blue-600 hover:text-blue-700 
                         font-medium text-sm focus:outline-none"
                >
                  ¿No recibiste el correo? Reenviar
                </button>
              </div>
            </div>
          )}

          {/* Botón de volver */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center text-sm text-gray-500 
                     hover:text-gray-700 transition-colors duration-200 group"
            >
              <span className="border-b border-dashed border-gray-500 
                           group-hover:border-gray-700">
                Volver al inicio de sesión
              </span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform 
                                duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}