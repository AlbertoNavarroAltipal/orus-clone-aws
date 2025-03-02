"use client";

// import RolesMenu from "./components/RolesMenu";

/**
 * Layout específico para la sección de roles
 * Incluye el menú lateral específico y el contenido principal
 */
export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      {/* <RolesMenu /> */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
