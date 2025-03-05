// src/hooks/useUserData.ts
"use client";

import { useState, useEffect } from "react";
import { UserData, ApiUserData } from "@/types/UserData";
import client from "@/config/aws-config";

/**
 * Hook personalizado para gestionar los datos del usuario
 * realizando peticiones a la API GraphQL
 */
const useUserData = (email: string = "alberto.navarro@altipal.com.co") => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Consulta GraphQL directamente en este archivo
        const GET_USER_BY_EMAIL = /* GraphQL */ `
          query GetUserByEmail($email: AWSEmail!) {
            getMaestroUsuariosByEmail(email: $email) {
              verificacion_correo
              sitio
              numero_contacto
              nombre_completo
              id_zona_ventas
              gerencia
              genero
              foto_perfil
              fecha_nacimiento
              fecha_creacion
              fecha_actualizacion
              estado
              email
              dni
              contrasena
              codigo_cedi
              cargo
              canal
            }
          }
        `;

        // Realizar la consulta GraphQL
        const response = await client.graphql({
          query: GET_USER_BY_EMAIL,
          variables: { email },
        });

        // Obtener los datos del usuario de la respuesta
        const apiUserData: ApiUserData =
          response.data.getMaestroUsuariosByEmail;

        if (apiUserData) {
          // Transformar datos de la API a nuestro formato UserData ajustado
          setUserData({
            nombreCompleto: apiUserData.nombre_completo || "Usuario sin nombre",
            dni: apiUserData.dni || undefined,
            fechaNacimiento: apiUserData.fecha_nacimiento || undefined,
            genero: apiUserData.genero || undefined,
            fotoPerfil: apiUserData.foto_perfil || undefined,
            email: apiUserData.email || "",
            numeroContacto: apiUserData.numero_contacto || undefined,
            cargo: apiUserData.cargo || undefined,
            gerencia: apiUserData.gerencia || undefined,
            idZonaVentas: apiUserData.id_zona_ventas || undefined,
            canal: apiUserData.canal || undefined,
            sitio: apiUserData.sitio || undefined,
            codigoCedi: apiUserData.codigo_cedi || undefined,
            fechaCreacion: apiUserData.fecha_creacion || undefined,
            fechaActualizacion: apiUserData.fecha_actualizacion || undefined,
            estado: apiUserData.estado || undefined,
            verificacionCorreo: apiUserData.verificacion_correo || undefined,
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  /**
   * Actualiza los datos del usuario
   * @param newData Nuevos datos para actualizar
   */
  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prevData) =>
      prevData
        ? {
            ...prevData,
            ...newData,
          }
        : null
    );

    // Aquí se implementaría la lógica para actualizar los datos en la API
    // Por ahora solo actualizamos el estado local
  };

  return {
    userData,
    updateUserData,
    loading,
    error,
  };
};

export default useUserData;
