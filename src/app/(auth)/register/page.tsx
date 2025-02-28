"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  UserPlus,
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  User,
  CreditCard,
  Phone,
  Eye,
  EyeOff,
  Check,
  ChevronDown,
} from "lucide-react";
import client from "@/config/aws-config";
import { toast } from "sonner";
import { SHA256 } from "crypto-js";

interface FormData {
  fullName: string;
  email: string;
  dni: string;
  password: string;
  confirmPassword: string;
  phone: string;
  countryCode: string;
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  dial_code: string;
}

interface GraphQLResponse {
  data?: {
    getMaestroUsuariosByEmail?: {
      dni: string;
      email: string;
      estado: boolean;
      numero_contacto: string;
      nombre_completo: string;
    };
    createMaestroUsuarios?: {
      dni: string;
      email: string;
    };
    listMaestroUsuarios?: {
      items: Array<{
        dni: string;
        email: string;
        numero_contacto: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
    path?: string[];
    errorType?: string;
  }>;
}

// Actualizar las interfaces existentes y añadir nuevas
interface GraphQLResult<T> {
  data?: T;
  errors?: Array<{
    message: string;
    path?: string[];
    errorType?: string;
  }>;
}

interface UserData {
  dni: string;
  email: string;
  estado?: boolean;
  numero_contacto: string;
  nombre_completo?: string;
}

interface MaestroUsuariosResponse {
  getMaestroUsuariosByEmail?: UserData;
  createMaestroUsuarios?: UserData;
  listMaestroUsuarios?: {
    items: UserData[];
  };
}

const COUNTRY_CODES: CountryCode[] = [
  { code: "CO", name: "Colombia", flag: "🇨🇴", dial_code: "+57" },
  { code: "PE", name: "Perú", flag: "🇵🇪", dial_code: "+51" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", dial_code: "+593" },
];

const CHECK_DNI_QUERY = `
  query GetByDni($dni: String) {
    listMaestroUsuarios(filter: {dni: {eq: $dni}}) {
      items {
        dni
        email
        numero_contacto
      }
    }
  }
`;

const CHECK_EMAIL_QUERY = `
  query GetByEmail($email: String) {
    listMaestroUsuarios(filter: {email: {eq: $email}}) {
      items {
        dni
        email
        numero_contacto
      }
    }
  }
`;

const CHECK_PHONE_QUERY = `
  query GetByNumeroContacto($numero_contacto: String) {
    listMaestroUsuarios(filter: {numero_contacto: {eq: $numero_contacto}}) {
      items {
        dni
        email
        numero_contacto
      }
    }
  }
`;

const REGISTER_USER_MUTATION = `
  mutation RegistroUsuario(
    $contrasena: String!, 
    $dni: String!, 
    $email: AWSEmail!, 
    $estado: Boolean!, 
    $fecha_creacion: AWSDateTime!, 
    $nombre_completo: String!, 
    $numero_contacto: AWSPhone!
  ) {
    createMaestroUsuarios(
      input: {
        dni: $dni, 
        email: $email, 
        nombre_completo: $nombre_completo, 
        numero_contacto: $numero_contacto, 
        contrasena: $contrasena, 
        fecha_creacion: $fecha_creacion, 
        estado: $estado
      }
    ) {
      dni
      email
    }
  }
`;

const passwordChecks = {
  minLength: (password: string) => password.length >= 6,
  hasUpperLower: (password: string) => /(?=.*[a-z])(?=.*[A-Z])/.test(password),
  hasNumber: (password: string) => /\d/.test(password),
  hasSpecial: (password: string) => /[$&#@*]/.test(password),
};

// Añadir esta función después de las constantes
const encryptPassword = (password: string): string => {
  return SHA256(password).toString();
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dni: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: COUNTRY_CODES[0].dial_code,
  });

  // Verificar si el formulario está completo
  useEffect(() => {
    const allFieldsFilled =
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.dni.trim().length === 10 &&
      formData.phone.trim().length === 10 &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      passwordChecks.minLength(formData.password) &&
      passwordChecks.hasUpperLower(formData.password) &&
      passwordChecks.hasNumber(formData.password) &&
      passwordChecks.hasSpecial(formData.password);

    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  // Función para capitalizar nombres
  const capitalizeNames = (name: string) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const checkExistingData = async () => {
    try {
      // Verificar DNI
      const dniResponse = await client.graphql<
        GraphQLResult<MaestroUsuariosResponse>
      >({
        query: CHECK_DNI_QUERY,
        variables: { dni: formData.dni },
        authMode: "apiKey",
      });

      if (dniResponse.data?.listMaestroUsuarios?.items?.length > 0) {
        toast.error("Este número de documento ya está registrado");
        return false;
      }

      // Verificar Email
      const emailResponse = await client.graphql<
        GraphQLResult<MaestroUsuariosResponse>
      >({
        query: CHECK_EMAIL_QUERY,
        variables: { email: formData.email.toLowerCase() },
        authMode: "apiKey",
      });

      if (emailResponse.data?.listMaestroUsuarios?.items.length > 0) {
        toast.error("Este correo electrónico ya está registrado");
        return false;
      }

      // Verificar Número de contacto
      const phoneNumber = `${formData.countryCode}${formData.phone}`;
      const phoneResponse = await client.graphql({
        query: CHECK_PHONE_QUERY,
        variables: { numero_contacto: phoneNumber },
        authMode: "apiKey",
      });

      if (phoneResponse.data?.listMaestroUsuarios?.items?.length > 0) {
        toast.error("Este número de teléfono ya está registrado");
        return false;
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al verificar datos:", error);
        toast.error(error.message || "Error al verificar los datos");
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "fullName") {
      newValue = capitalizeNames(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const selectCountry = (country: CountryCode) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: country.dial_code,
      phone: prev.phone.replace(prev.countryCode, country.dial_code),
    }));
    setShowCountrySelector(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormComplete) {
      toast.error("Por favor, completa todos los campos correctamente");
      return;
    }

    setIsLoading(true);

    try {
      const isUnique = await checkExistingData();
      if (!isUnique) {
        setIsLoading(false);
        return;
      }

      const registerVariables = {
        nombre_completo: formData.fullName.trim(),
        dni: formData.dni.trim(),
        numero_contacto: `${formData.countryCode}${formData.phone.trim()}`,
        email: formData.email.toLowerCase().trim(),
        contrasena: encryptPassword(formData.password), // Encriptación añadida
        estado: false,
        fecha_creacion: new Date().toISOString(),
      };

      const response = await client.graphql<GraphQLResponse>({
        query: REGISTER_USER_MUTATION,
        variables: registerVariables,
        authMode: "apiKey",
      });

      if (response.data?.createMaestroUsuarios) {
        toast.success("Cuenta creada exitosamente");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error("No se pudo crear la cuenta");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Error al crear la cuenta");
      } else {
        toast.error("Error inesperado al crear la cuenta");
      }
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
            <h1 className="text-4xl font-bold text-white mb-4">
              Únete a la Plataforma Líder en Gestión Empresarial
            </h1>
            <p className="text-blue-100 text-lg">
              Optimiza tus procesos y mejora la eficiencia de tu empresa con
              nuestras soluciones integrales.
            </p>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                title: "Gestión Centralizada",
                desc: "Todo en un solo lugar",
              },
              {
                title: "Reportes en Tiempo Real",
                desc: "Toma decisiones informadas",
              },
              {
                title: "Soporte Premium",
                desc: "Asistencia personalizada",
              },
              {
                title: "Actualizaciones Continuas",
                desc: "Mejoras constantes",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Crear una cuenta
            </h2>
            <p className="text-gray-500 text-center">
              Completa tus datos para comenzar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Nombre Completo */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  autoComplete="new-name"
                  className="block w-full pl-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* DNI */}
              <div className="space-y-2">
                <label
                  htmlFor="dni"
                  className="text-sm font-medium text-gray-700"
                >
                  Número de documento
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    value={formData.dni}
                    onChange={handleInputChange}
                    autoComplete="new-dni"
                    className="block w-full pl-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    maxLength={10}
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="new-email"
                    className="block w-full pl-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="nombre@empresa.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <div className="flex gap-4">
                <div className="relative w-1/3">
                  <button
                    type="button"
                    onClick={() => setShowCountrySelector(!showCountrySelector)}
                    className="flex items-center justify-between w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled
                  >
                    {
                      COUNTRY_CODES.find(
                        (c) => c.dial_code === formData.countryCode
                      )?.flag
                    }
                    <span className="mx-2">{formData.countryCode}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showCountrySelector && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                          onClick={() => selectCountry(country)}
                        >
                          <span className="mr-2">{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="ml-auto">{country.dial_code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="new-phone"
                    className="block w-full pl-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    placeholder="9999999999"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contraseñas en grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    className="block w-full pl-10 pr-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    required
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
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirmar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    className="block w-full pl-10 pr-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Requisitos de contraseña */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Requisitos de la contraseña
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    check: passwordChecks.minLength(formData.password),
                    text: "Mínimo 6 caracteres",
                  },
                  {
                    check: passwordChecks.hasUpperLower(formData.password),
                    text: "Al menos una mayúscula y una minúscula",
                  },
                  {
                    check: passwordChecks.hasNumber(formData.password),
                    text: "Al menos un número",
                  },
                  {
                    check: passwordChecks.hasSpecial(formData.password),
                    text: "Al menos un carácter especial ($&#@*)",
                  },
                ].map((requirement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 text-sm ${
                      requirement.check ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {requirement.check ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-gray-300" />
                    )}
                    <span>{requirement.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={!isFormComplete || isLoading}
              className="w-full flex items-center justify-center px-4 py-3 
                         bg-blue-600 text-white rounded-lg font-medium
                         disabled:bg-blue-300 disabled:cursor-not-allowed
                         transition-colors duration-200
                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
