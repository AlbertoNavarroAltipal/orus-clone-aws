"use client";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Stats {
  label: string;
  value: string | number;
  icon: string;
  color: {
    icon: string;
    bg: string;
    ring: string;
  };
}

export function ProfileCard() {
  const { data: session } = useSession();
  const defaultUser = {
    name: "Usuario",
    role: "Invitado",
    team: "Sin equipo",
    image: "/avatars/default.png",
    badges: ["Pro User", "Admin"],
    status: "Online",
    location: "Madrid, ES",
  };

  const stats: Stats[] = [
    {
      label: "Conexiones",
      value: "128",
      icon: "users",
      color: {
        icon: "text-blue-500 dark:text-blue-400",
        bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40",
        ring: "ring-blue-100 dark:ring-blue-900/50",
      },
    },
    {
      label: "Proyectos",
      value: "12",
      icon: "folder",
      color: {
        icon: "text-emerald-500 dark:text-emerald-400",
        bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
        ring: "ring-emerald-100 dark:ring-emerald-900/50",
      },
    },
    {
      label: "Rating",
      value: "4.8",
      icon: "star",
      color: {
        icon: "text-amber-500 dark:text-amber-400",
        bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
        ring: "ring-amber-100 dark:ring-amber-900/50",
      },
    },
  ];

  return (
    <div className="group bg-white dark:bg-[#232f3e] rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300">
      {/* Header con gradiente */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse blur opacity-75" />
            <div className="relative">
              <Image
                src={session?.user?.image || defaultUser.image}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-white dark:border-gray-800 shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-white dark:border-gray-800
                ${
                  defaultUser.status === "Online"
                    ? "bg-emerald-500"
                    : "bg-gray-400"
                }`}
              >
                <span className="block w-full h-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Información del Usuario */}
        <div className="mt-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {session?.user?.name || defaultUser.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {defaultUser.role}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Icon name="mapPin" className="h-4 w-4" />
              <span>{defaultUser.location}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-2 mt-3">
            {defaultUser.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Team */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium">
            <Icon name="briefcase" className="h-4 w-4" />
            <span>{defaultUser.team}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group/stat relative rounded-lg p-4 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`absolute inset-0 rounded-lg ${stat.color.bg} ring-1 ${stat.color.ring} transition-all duration-300 group-hover/stat:shadow-lg`}
              />
              <div className="relative flex flex-col items-center">
                <Icon
                  name={stat.icon}
                  className={`h-6 w-6 ${stat.color.icon} mb-2`}
                />
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg">
            Ver perfil
          </button>
          <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
