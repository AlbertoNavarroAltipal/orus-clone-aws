"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Layout,
  BarChart,
  Shield,
  HeadphonesIcon,
  UserCheck,
  Loader2,
} from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Formato de correo electrónico inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Login error:", result.error);
        toast.error("Credenciales inválidas");
        return;
      }

      if (result?.ok) {
        toast.success("Inicio de sesión exitoso");

        // Verificamos si hay una URL específica en el resultado
        if (result.url && result.url.includes("/account-pending")) {
          router.push("/account-pending");
          return;
        }

        // Usar router.replace en lugar de router.push para una redirección completa
        router.replace("/home");
        // Aseguramos que la UI se actualice
        router.refresh();
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Error inesperado al iniciar sesión");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/home",
      });

      if (result?.error) {
        toast.error("Error al iniciar sesión con Google");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
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
                  <UserCheck className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Bienvenido a nuestra super app de gestión empresarial ORUS
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Accede a todas las herramientas y aplicativos desde un solo
                    lugar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: Layout,
                title: "Gestión Integral",
                desc: "Control total de tu negocio",
              },
              {
                icon: BarChart,
                title: "Reportes en tiempo real",
                desc: "Datos actualizados al instante",
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                desc: "Protección de datos garantizada",
              },
              {
                icon: HeadphonesIcon,
                title: "Soporte 24/7",
                desc: "Asistencia cuando la necesites",
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
        <div className="w-full max-w-md space-y-8">
          {/* Logo versión móvil */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/logos/logo_orus_azul_fondo_transparente.png"
              alt="Logo ORUS"
              width={120}
              height={40}
              priority
            />
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-8">
              {/* Ilustración animada */}
              <div className="w-full flex justify-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-blue-50 rounded-full" />
                  <div className="absolute inset-3 bg-blue-100 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                      <UserCheck className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <Mail className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                  <div className="absolute bottom-0 left-0">
                    <Lock className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Encabezado */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Iniciar sesión
                </h2>
                <p className="text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>

              {/* Formulario */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                autoComplete="off"
              >
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      className={`block w-full pl-10 px-3 py-3 text-gray-900 placeholder-gray-400 
                               bg-gray-50 border rounded-lg transition-all duration-200 sm:text-sm
                               ${
                                 errors.email
                                   ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                   : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                               }`}
                      placeholder="nombre@empresa.com"
                      autoComplete="new-email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className={`block w-full pl-10 pr-10 px-3 py-3 text-gray-900 
                               placeholder-gray-400 bg-gray-50 border rounded-lg 
                               transition-all duration-200 sm:text-sm
                               ${
                                 errors.password
                                   ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                   : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                               }`}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Recordarme y Olvidé contraseña */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      {...register("rememberMe")}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                               border-gray-300 rounded transition-colors"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 
                             transition-colors hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón de submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
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
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>Iniciar sesión</span>
                      <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform 
                                         duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  )}
                </button>

                {/* Separador */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      O continúa con
                    </span>
                  </div>
                </div>

                {/* Botón de Google */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 
                           bg-white text-gray-700 text-sm font-medium rounded-lg 
                           border border-gray-300 hover:bg-gray-50 
                           transition-all duration-200
                           focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-500
                           transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  <Image
                    src="/logos/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Continuar con Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
