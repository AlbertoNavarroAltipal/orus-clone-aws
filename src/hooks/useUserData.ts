"use client";

import { useState } from "react";
import { UserData } from "@/types/UserData";

/**
 * Hook personalizado para gestionar los datos del usuario
 * En un entorno real, este hook realizaría peticiones a la API
 */
const useUserData = () => {
  // Datos simulados del usuario
  const [userData, setUserData] = useState<UserData>({
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@altipal.com",
    phone: "+57 301 234 5678",
    jobTitle: "Gerente de Ventas",
    department: "Comercial",
    location: "Bogotá",
    country: "Colombia",
    timezone: "(GMT-5) Bogotá, Lima, Quito",
    language: "Español",
    lastAccess: "2025-02-27T14:30:00Z",
    accountCreated: "2023-05-15T09:00:00Z",
    mfaEnabled: false,
    notificationPreferences: {
      email: {
        security: true,
        marketing: false,
        updates: true,
        reports: true,
      },
      push: {
        security: true,
        marketing: true,
        updates: true,
        reports: false,
      },
    },
  });

  /**
   * Actualiza los datos del usuario
   * @param newData Nuevos datos para actualizar
   */
  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  /**
   * Actualiza las preferencias de notificaciones
   * @param type Tipo de notificación (email o push)
   * @param key Clave de la preferencia
   * @param value Nuevo valor
   */
  const updateNotificationPreference = (
    type: "email" | "push",
    key: string,
    value: boolean
  ) => {
    setUserData((prevData) => ({
      ...prevData,
      notificationPreferences: {
        ...prevData.notificationPreferences,
        [type]: {
          ...prevData.notificationPreferences[type],
          [key]: value,
        },
      },
    }));
  };

  return {
    userData,
    updateUserData,
    updateNotificationPreference,
  };
};

export default useUserData;
