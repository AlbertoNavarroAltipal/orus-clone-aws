// src/app/(dashboard)/home/page.tsx
"use client";

import { CreatePost } from "./components/CreatePost";
import { ActivityCard } from "./components/ActivityCard";
import { ProfileCard } from "./components/ProfileCard";
import { QuickAccess } from "./components/QuickAccess";
import { AppDrawer } from "./components/AppDrawer";
import { BirthdaysCard } from "./components/BirthdaysCard";
import { UpcomingEvents } from "./components/UpcomingEvents";

// Los datos de activities se mantienen igual
const activities = [
  {
    id: "1",
    title: "Nuevo proyecto lanzado: Sistema de Gestión v2.0",
    time: "Hace 2 horas",
    type: "announcement" as const,
    department: "Desarrollo",
    description: "Nos complace anunciar el lanzamiento exitoso de la versión 2.0 de nuestro Sistema de Gestión. Esta actualización incluye mejoras significativas en rendimiento y nuevas funcionalidades solicitadas por nuestros usuarios.",
    userImage: "/avatars/1.png",
    contentImage: "/images/project-launch.jpg",
    likes: 24,
    comments: 5,
    isLiked: true,
  },
  {
    id: "2",
    title: "Actualización de Políticas de Seguridad",
    time: "Hace 4 horas",
    type: "update" as const,
    department: "IT Security",
    description: "Se han actualizado las políticas de seguridad corporativa. Por favor, revise los nuevos protocolos de acceso y gestión de datos sensibles.",
    userImage: "/avatars/2.png",
    likes: 15,
    comments: 3,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f1b2d] transition-colors duration-200">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-gray-900 dark:text-white mb-2 transition-colors">
              Feed Corporativo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Mantente al día con las últimas actualizaciones y noticias de la empresa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              <CreatePost />
              
              {activities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <ProfileCard />
              <QuickAccess />
              <AppDrawer />
              <BirthdaysCard />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}