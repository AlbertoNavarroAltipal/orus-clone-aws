// src/app/test-errors/page.tsx
"use client";

import { useState } from "react";
import { ErrorModal } from "@/components/ui/ErrorModal";

export default function TestErrorsPage() {
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");

  const testScenario = async (scenario: string) => {
    try {
      switch (scenario) {
        case "unauthorized":
          document.cookie =
            "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/home";
          break;

        case "forbidden":
          document.cookie = "auth-token=user-token; path=/;";
          window.location.href = "/admin/protected";
          break;

        case "not-found":
          window.location.href = "/not-exist";
          break;

        case "server-error":
          try {
            const response = await fetch("/api/test-500");
            if (!response.ok) {
              const data = await response.json().catch(() => ({
                message: "An unexpected error occurred on the server.",
              }));
              setModalError(data.message || "Internal Server Error");
              setIsModalOpen(true);
            }
          } catch (error) {
            setModalError(
              error instanceof Error ? error.message : "Internal Server Error"
            );
            setIsModalOpen(true);
          }
          break;

        default:
          setMessage("Unknown scenario");
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Test Error Pages</h1>

          <div className="grid grid-cols-1 gap-4">
            <div className="border p-4 rounded">
              <button
                onClick={() => testScenario("unauthorized")}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test 401 Unauthorized
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Borra el token y trata de acceder a una ruta protegida (/home)
              </p>
            </div>

            <div className="border p-4 rounded">
              <button
                onClick={() => testScenario("forbidden")}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Test 403 Forbidden
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Intenta acceder a una ruta de admin (/admin/protected) sin
                permisos
              </p>
            </div>

            <div className="border p-4 rounded">
              <button
                onClick={() => testScenario("not-found")}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Test 404 Not Found
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Intenta acceder a una ruta que no existe (/not-exist)
              </p>
            </div>

            <div className="border p-4 rounded">
              <button
                onClick={() => testScenario("server-error")}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Test 500 Server Error
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Simula un error interno del servidor con modal
              </p>
            </div>
          </div>

          {message && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded">
              <pre className="text-sm text-red-600 whitespace-pre-wrap font-mono">
                {message}
              </pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded">
            <h3 className="font-medium mb-2">Instrucciones de prueba:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>
                Para probar 401: El botón borrará tu token y te llevará a una
                ruta protegida
              </li>
              <li>
                Para probar 403: El botón establecerá un token de usuario normal
                y tratará de acceder a una ruta de admin
              </li>
              <li>
                Para probar 404: El botón intentará acceder a una ruta
                inexistente
              </li>
              <li>
                Para probar 500: El botón mostrará un modal con el error del
                servidor
              </li>
            </ol>
          </div>
        </div>
      </div>

      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        error={modalError}
      />
    </>
  );
}
