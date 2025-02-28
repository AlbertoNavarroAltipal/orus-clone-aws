"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { MenuItem, MegaMenuProps } from "@/types/megaMenu";
import { quickAccessSection, mainMenuSections } from "@/data/menuData";

interface MenuSection {
  id: string;
  title: string;
  icon?: string;
  items: MenuItem[];
}

// Función auxiliar para renderizar el menú
const renderMenuItem = (
  item: MenuItem,
  isActive: boolean,
  iconClass: string
) => {
  return (
    <div className="flex items-center gap-3">
      {item.icon && (
        <Icon name={item.icon} className={`h-5 w-5 ${iconClass}`} />
      )}
      <span>{item.title}</span>
    </div>
  );
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState<string>("recent");
  const [activeItems, setActiveItems] = useState<MenuItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    updateActiveItems(selectedSection);
  }, [selectedSection]);

  const updateActiveItems = (sectionId: string) => {
    if (sectionId === "recent" || sectionId === "favorites") {
      const items = mainMenuSections.flatMap((section) =>
        section.items.filter((item) =>
          sectionId === "favorites" ? item.isFavorite : true
        )
      );
      setActiveItems(items);
      setBreadcrumbs([
        sectionId === "recent" ? "Visitados recientemente" : "Favoritos",
      ]);
      return;
    }

    for (const section of mainMenuSections) {
      for (const item of section.items) {
        if (item.id === sectionId && item.children) {
          setActiveItems(item.children);
          setBreadcrumbs([section.title, item.title]);
          return;
        }
      }
    }

    const mainSection = mainMenuSections.find(
      (section) => section.id === sectionId
    );
    if (mainSection) {
      setActiveItems(mainSection.items);
      setBreadcrumbs([mainSection.title]);
    }
  };

  const isPathActive = (itemHref: string) => {
    if (!itemHref) return false;
    return pathname.startsWith(itemHref);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Overlay con blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Contenedor principal */}
      <div className="flex relative w-[1280px] h-[90vh] mt-[5vh] rounded-xl overflow-hidden shadow-2xl animate-in slide-in-from-top duration-300">
        {/* Panel de Navegación Izquierdo */}
        <div className="w-[320px] bg-gradient-to-b from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800">
          <div className="h-full overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Sección de Acceso Rápido */}
              <div>
                <div className="flex items-center gap-2 px-3 mb-3">
                  <Icon
                    name="zap"
                    className="h-4 w-4 text-blue-200 dark:text-blue-400"
                  />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-100 dark:text-blue-300">
                    {quickAccessSection.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {quickAccessSection.items.map((item) => {
                    const isActive = isPathActive(item.href || "");
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          item.hasSubmenu ? setSelectedSection(item.id) : null
                        }
                        className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "text-blue-100 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && (
                            <Icon name={item.icon} className="h-5 w-5" />
                          )}
                          <span>{item.title}</span>
                        </div>
                        {item.hasSubmenu && (
                          <Icon
                            name="chevronRight"
                            className="h-4 w-4 opacity-50"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Separador con gradiente */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
              </div>

              {/* Secciones Principales */}
              {mainMenuSections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 px-3 mb-3">
                    <Icon
                      name={section.icon || "folder"}
                      className="h-4 w-4 text-blue-200 dark:text-blue-400"
                    />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-100 dark:text-blue-300">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = isPathActive(item.href || "");
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.hasSubmenu) {
                              setSelectedSection(item.id);
                            } else if (item.href) {
                              window.location.href = item.href; // Redirige si no tiene submenú
                            }
                          }}
                          className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-white/20 text-white"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }
  `}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <Icon name={item.icon} className="h-5 w-5" />
                            )}
                            <span>{item.title}</span>
                          </div>
                          {item.hasSubmenu && (
                            <Icon
                              name="chevronRight"
                              className="h-4 w-4 opacity-50"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de Contenido Derecho */}
        <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Icon name="chevronRight" className="h-4 w-4" />
                    )}
                    <span>{crumb}</span>
                  </React.Fragment>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                {breadcrumbs[breadcrumbs.length - 1]}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <Icon name="search" className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Grid de Contenido */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {activeItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    className="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      {item.icon && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon
                            name={item.icon}
                            className="h-6 w-6 text-white"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          {item.isFavorite && (
                            <Icon
                              name="star"
                              className="h-4 w-4 text-yellow-400"
                            />
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.hasSubmenu && (
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                            <Icon
                              name="chevronRight"
                              className="h-4 w-4 text-blue-500 dark:text-blue-400"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
