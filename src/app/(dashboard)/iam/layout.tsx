"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { iamMenuItems } from "./constants/menuItems";
import { useTheme } from "@/hooks/useTheme";

/**
 * Layout principal para el módulo IAM
 * Integra el sidebar con el menú específico para IAM y maneja el contenido principal
 */
export default function IAMLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`flex h-[calc(100vh-72px)]`}>
      <Sidebar menuItems={iamMenuItems} />
      <div className="flex-1 overflow-auto bg-white dark:bg-[#0f1b2d] transition-colors duration-200">
        {children}
      </div>
    </div>
  );
}
