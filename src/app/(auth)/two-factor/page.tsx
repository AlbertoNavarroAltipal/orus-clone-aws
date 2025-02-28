"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Loader2,
  Lock,
  Shield,
  Smartphone,
  ShieldCheck,
  KeyRound,
  AlertCircle,
} from "lucide-react";

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const isCodeComplete = code.every((digit) => digit !== "");

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) {
      setError("Solo se permiten números");
      return;
    }

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);
    inputsRef.current[5]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    setError(null);

    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(code === "123456");
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const isValid = await verifyCode(code.join(""));

      if (isValid) {
        router.push("/home");
      } else {
        setError("Código incorrecto, intenta nuevamente.");
        setCode(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    } catch (error) {
      setError("Error al verificar el código. Inténtalo de nuevo.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

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
                  <Shield className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Verificación en Dos Pasos
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Mantén tu cuenta segura con una capa adicional de
                    protección. Ingresa el código enviado a tu dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de seguridad */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Doble Seguridad",
                desc: "Protección adicional para tu cuenta",
              },
              {
                icon: Smartphone,
                title: "Verificación Móvil",
                desc: "Códigos seguros en tu dispositivo",
              },
              {
                icon: KeyRound,
                title: "Acceso Seguro",
                desc: "Control total de tu cuenta",
              },
              {
                icon: Lock,
                title: "Protección Avanzada",
                desc: "Estándares de seguridad robustos",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-blue-300 mb-3" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.desc}
                </p>
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
                <div className="absolute inset-4 bg-blue-100 rounded-full animate-pulse" />
                {/* Icono central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <Smartphone className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0">
                  <Shield className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>
                <div className="absolute bottom-0 left-0">
                  <Lock className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Encabezado */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Verificación de Seguridad
              </h2>
              <p className="text-gray-600 text-lg">
                Ingresa el código de 6 dígitos enviado a tu dispositivo
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Inputs de código */}
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-2xl font-semibold text-center border-2 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all duration-200
            bg-gray-50 hover:bg-white
            disabled:bg-gray-100 disabled:text-gray-400
            shadow-sm"
                    disabled={isLoading}
                    required
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!isCodeComplete || isLoading}
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
                    Verificando...
                  </>
                ) : (
                  <div className="flex items-center">
                    <span>Verificar código</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            {/* Link de ayuda */}
            <div className="text-center">
              <button
                onClick={() => setError("Función no implementada aún")}
                className="inline-flex items-center text-sm text-gray-500 
                       hover:text-gray-700 transition-colors duration-200 group"
              >
                <span
                  className="border-b border-dashed border-gray-500 
                             group-hover:border-gray-700"
                >
                  ¿No recibiste el código? Reenviar
                </span>
                <ArrowRight
                  className="ml-1 h-4 w-4 transition-transform 
                                  duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
