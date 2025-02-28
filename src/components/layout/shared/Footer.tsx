import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto w-full">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Altipal SAS, Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
