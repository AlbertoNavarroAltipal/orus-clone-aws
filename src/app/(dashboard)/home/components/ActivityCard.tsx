"use client";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";

interface ActivityCardProps {
  id: string;
  title: string;
  time: string;
  description: string;
  userImage?: string;
  contentImage?: string;
  type: 'announcement' | 'update' | 'achievement' | 'project';
  department?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  userName?: string;
  userRole?: string;
  hasInteracted?: string[];
}

const typeConfig = {
  announcement: {
    icon: 'megaphone',
    label: 'Anuncio',
    gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    colors: {
      badge: 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300',
      icon: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-100 dark:ring-blue-900/50',
      hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }
  },
  update: {
    icon: 'refreshCcw',
    label: 'Actualización',
    gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    colors: {
      badge: 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300',
      icon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-100 dark:ring-emerald-900/50',
      hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
    }
  },
  achievement: {
    icon: 'trophy',
    label: 'Logro',
    gradient: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    colors: {
      badge: 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-300',
      icon: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-100 dark:ring-amber-900/50',
      hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/20'
    }
  },
  project: {
    icon: 'folder',
    label: 'Proyecto',
    gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    colors: {
      badge: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300',
      icon: 'text-purple-600 dark:text-purple-400',
      ring: 'ring-purple-100 dark:ring-purple-900/50',
      hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
    }
  }
};

export function ActivityCard({
  title,
  time,
  description,
  userImage = "/avatars/default.png",
  contentImage,
  department,
  likes,
  comments,
  isLiked,
  type,
  userName = "Usuario",
  userRole = "Miembro",
  hasInteracted = [],
}: ActivityCardProps) {
  const config = typeConfig[type];

  return (
    <div className="group bg-white dark:bg-[#232f3e] rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Header decorativo con gradiente */}
      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
      
      <div className="p-6">
        {/* Header con info del usuario */}
        <div className="flex items-start gap-4">
          {/* Avatar con efectos */}
          <div className="relative">
            <div className="relative inline-block">
              <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 blur transition-opacity duration-300`} />
              <div className="relative">
                <Image
                  src={userImage}
                  alt={userName}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className={`absolute -bottom-1 -right-1 p-2 rounded-full bg-white dark:bg-[#2a3f59] shadow-sm ${config.colors.ring} ring-1`}>
              <Icon 
                name={config.icon}
                className={`h-3.5 w-3.5 ${config.colors.icon}`}
              />
            </div>
          </div>

          {/* Info del usuario y post */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-gray-900 dark:text-white font-semibold">
                {title}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.colors.badge} shadow-sm`}>
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600 dark:text-gray-400 font-medium">{userName}</span>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <span className="text-gray-500 dark:text-gray-400">{userRole}</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span className="text-gray-500 dark:text-gray-400">{time}</span>
              {department && (
                <>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="briefcase" className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">{department}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Menú de acciones */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/60 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Icon name="bookmark" className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/60 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Icon name="moreVertical" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-4 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
          {contentImage && (
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
              <Image
                src={contentImage}
                alt={title}
                width={600}
                height={300}
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>

        {/* Footer con interacciones */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className={`group/btn flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 
                  ${isLiked 
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon 
                  name={isLiked ? "heartFill" : "heart"} 
                  className={`h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110 ${isLiked ? 'animate-pulse' : ''}`} 
                />
                <span>{likes}</span>
              </button>

              <button className="group/btn flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Icon 
                  name="messageCircle" 
                  className="h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110" 
                />
                <span>{comments}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {hasInteracted.length > 0 && (
                <div className="flex -space-x-2 mr-2">
                  {hasInteracted.slice(0, 3).map((user, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400"
                    >
                      {user[0]}
                    </div>
                  ))}
                  {hasInteracted.length > 3 && (
                    <div className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                      +{hasInteracted.length - 3}
                    </div>
                  )}
                </div>
              )}

              <button className="group/btn flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Icon 
                  name="share2" 
                  className="h-5 w-5 transition-transform duration-200 group-hover/btn:scale-110" 
                />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}