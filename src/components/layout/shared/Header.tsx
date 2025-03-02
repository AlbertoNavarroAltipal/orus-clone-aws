"use client";

import { FC, useState, useEffect, useCallback, KeyboardEvent } from "react";
import Link from "next/link";
import { Bell, HelpCircle, LayoutGrid, X, Settings, Plus } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { NotificationsMenu } from "./NotificationsMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SupportMenu } from "./SupportMenu";
import { RegionSelector } from "./RegionSelector";
import { MegaMenu } from "./MegaMenu";
import SearchBar from "@/components/layout/shared/SearchBar";
import UserMenu from "@/components/layout/shared/UserMenu";
import { mockNotifications } from "@/data/mockData";
import type { Tab } from "@/types/header";

export const Header: FC = () => {
  // Estados
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session } = useSession();

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler para el shortcut de búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        const searchInput = document.querySelector(
          ".search-input"
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);
    return () => document.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".notifications-menu")) setIsNotificationsOpen(false);
    if (!target.closest(".settings-menu")) setIsSettingsOpen(false);
    if (!target.closest(".support-menu")) setIsSupportOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Manejadores de pestañas
  const addNewTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: "Nueva pestaña",
      path: "/home",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  // estado de true o false mientras carga la sesión de usuario usando useSession();
  const validateSession = () => {
    if (session) {
      return false;
    }
    return true;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200
      ${isScrolled ? "shadow-lg" : ""}
      bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800`}
    >
      <div className="h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Sección Izquierda */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link
              href="/home"
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/logos/logo_orus_blanco_fondo_transparente.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Botón de Menú */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="group p-2 rounded-lg bg-white/10 hover:bg-white/20 
                transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <LayoutGrid className="h-5 w-5 text-white transition-transform duration-200 group-hover:rotate-90" />
            </button>

            {/* Barra de Búsqueda */}
            <SearchBar />
          </div>

          {/* Sección Derecha */}
          {session?.user && (
            <div className="flex items-center space-x-6">
              {/* Notificaciones */}
              <div className="relative notifications-menu">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="group p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative">
                    <Bell className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                    {mockNotifications.some((n) => !n.read) && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
                {isNotificationsOpen && (
                  <NotificationsMenu
                    onClose={() => setIsNotificationsOpen(false)}
                  />
                )}
              </div>

              {/* Configuración */}
              <div className="relative settings-menu">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <Settings className="h-5 w-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
                {isSettingsOpen && (
                  <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
                )}
              </div>

              {/* Selector de Región */}
              <RegionSelector />

              {/* Menú de Usuario */}
              <UserMenu session={session} isLoading={validateSession()} />

              {/* Ayuda */}
              <div className="relative support-menu">
                <button
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <HelpCircle className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </button>
                {isSupportOpen && (
                  <SupportMenu onClose={() => setIsSupportOpen(false)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Pestañas */}
      <div className="h-10 px-2 bg-white/10 dark:bg-black/10 border-t border-white/10">
        <div className="flex h-full items-center space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center h-8 px-4 rounded-lg cursor-pointer 
                transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
            >
              <span className="text-sm">{tab.title}</span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="h-4 w-4 hover:text-red-400" />
              </button>
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="flex items-center h-8 px-4 space-x-2 text-white/70 
              hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Nueva pestaña</span>
          </button>
        </div>
      </div>

      {/* Mega Menú */}
      {isMegaMenuOpen && (
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
