// src/components/ui/Icon.tsx
"use client";

import * as LucideIcons from "lucide-react";

// Convertimos PascalCase a camelCase
const toPascalCase = (str: string): string => {
  return (
    str.charAt(0).toUpperCase() +
    str.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase())
  );
};

type IconName = Lowercase<keyof typeof LucideIcons>;

interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  // Convertimos el nombre del icono a PascalCase para encontrarlo en LucideIcons
  const pascalCaseName = toPascalCase(name) as keyof typeof LucideIcons;
  const IconComponent = LucideIcons[pascalCaseName];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return <IconComponent className={className} />;
};

// Helper para mostrar todos los iconos disponibles en la consola
export const listAvailableIcons = () => {
  return Object.keys(LucideIcons)
    .filter(
      (key) =>
        typeof LucideIcons[key as keyof typeof LucideIcons] === "function"
    )
    .map((key) => key.toLowerCase());
};

export type { IconName };
