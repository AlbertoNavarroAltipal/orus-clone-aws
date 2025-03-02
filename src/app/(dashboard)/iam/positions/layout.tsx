"use client";

// import PositionsMenu from "./components/PositionsMenu";

/**
 * Layout específico para la sección de cargos
 * Incluye el menú lateral específico y el contenido principal
 */
export default function PositionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      {/* <PositionsMenu /> */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
