"use client";

// import UsersMenu from "./components/UsersMenu";

/**
 * Layout específico para la sección de usuarios
 * Incluye el menú lateral específico y el contenido principal
 */
export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      {/* <UsersMenu /> */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
