"use client";

// import PoliciesMenu from "./components/PoliciesMenu";

/**
 * Layout específico para la sección de políticas
 * Incluye el menú lateral específico y el contenido principal
 */
export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      {/* <PoliciesMenu /> */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
