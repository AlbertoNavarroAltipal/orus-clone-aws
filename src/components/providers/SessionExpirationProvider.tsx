// src/components/providers/SessionExpirationProvider.tsx
"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const LAST_ACTIVE_KEY = "lastActiveTime";
const INACTIVITY_TIMEOUT = parseInt(
  process.env.NEXT_PUBLIC_INACTIVITY_TIMEOUT || "180000",
  10
);
const CHECK_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_CHECK_INTERVAL || "10000",
  10
);

interface SessionExpirationProviderProps {
  children: React.ReactNode;
}

export function SessionExpirationProvider({
  children,
}: SessionExpirationProviderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.expires) return;

    // Actualizar último tiempo activo
    const updateLastActive = () => {
      if (session) {
        localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
        // Sincronizar entre pestañas
        localStorage.setItem("sessionSync", Date.now().toString());
      }
    };

    // Verificar sesión
    const checkSession = () => {
      const expiresAt = new Date(session.expires).getTime();
      const now = Date.now();
      const lastActive = Number(localStorage.getItem(LAST_ACTIVE_KEY)) || now;

      // Verificar tanto la expiración como la inactividad
      if (now >= expiresAt || now - lastActive > INACTIVITY_TIMEOUT) {
        if (pathname !== "/session-expired") {
          console.log("Session expired, redirecting to /session-expired");
          // alert("Sesión expirada, redirigiendo a /session-expired");
          // signOut({ redirect: false });
          // router.push("/session-expired");
        }
        return true;
      }
      return false;
    };

    // Sincronización entre pestañas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sessionSync") {
        checkSession();
      }
    };

    // Eventos de usuario
    const activityEvents = [
      "mousedown",
      "keydown",
      "mousemove",
      "touchstart",
      "scroll",
      "click",
    ];

    const handleActivity = () => {
      updateLastActive();
    };

    // Verificar al cambiar visibilidad
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
        updateLastActive();
      }
    };

    // Inicializar
    updateLastActive();

    // Configurar listeners
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Intervalos de verificación
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    }, CHECK_INTERVAL);

    // Timeout exacto para expiración
    const timeUntilExpiration =
      new Date(session.expires).getTime() - Date.now();
    const expirationTimeout = setTimeout(() => {
      checkSession();
    }, timeUntilExpiration);

    return () => {
      clearInterval(interval);
      clearTimeout(expirationTimeout);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [session, router, pathname]);

  return <>{children}</>;
}
