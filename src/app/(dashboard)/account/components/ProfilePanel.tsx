"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";

import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import useUserData from "@/hooks/useUserData";

/**
 * Panel principal que gestiona la información del perfil del usuario
 * Permite visualizar y editar los datos personales
 */
const ProfilePanel: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Manejador para guardar los cambios del perfil
  const handleSaveProfile = async (data: any) => {
    setIsSaving(true);

    try {
      // Aquí se realizaría la llamada a la API para actualizar el perfil
      // Simulamos una llamada asíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar el estado local con los nuevos datos
      updateUserData(data);

      setIsEditingProfile(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f1b2d] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <div className="p-6 flex justify-between items-start border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Información de Perfil
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Administre su información personal y detalles de contacto
          </p>
        </div>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ec7211] hover:bg-[#dd6b10] focus:outline-none"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </button>
        )}
      </div>

      {isEditingProfile ? (
        <ProfileForm
          userData={userData}
          onSubmit={handleSaveProfile}
          onCancel={() => setIsEditingProfile(false)}
          isSaving={isSaving}
        />
      ) : (
        <ProfileCard userData={userData} />
      )}
    </div>
  );
};

export default ProfilePanel;
