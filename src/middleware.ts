import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { APP_CONFIG } from "@/config/constants";
import { isCompanyEmail, isPublicRoute } from "@/utils/auth";
import type { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    id: string;
    dni: string;
    email: string;
    nombre_completo: string;
    estado: boolean;
    cargo?: string;
  } & Session["user"];
}

type MiddlewareLogDetails = {
  pathname?: string;
  session?: boolean;
  user?: {
    email?: string;
    cargo?: string;
    estado?: boolean;
  };
  error?: unknown;
  [key: string]: unknown;
};

const logMiddlewareAction = (action: string, details: MiddlewareLogDetails) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Middleware] ${action}:`, details);
  }
};

export async function middleware(request: NextRequest) {
  try {
    // Extraer la URL actual y el pathname
    const { pathname } = request.nextUrl;

    // Verificar si la URL tiene parámetros callbackUrl (común en autenticación)
    const searchParams = request.nextUrl.searchParams;
    const callbackUrl = searchParams.get("callbackUrl");

    // Si estamos en /login y hay callbackUrl, dejamos que el flujo de autenticación continúe
    if (pathname === "/login" && callbackUrl) {
      return NextResponse.next();
    }

    // Obtener la sesión
    const session = (await auth()) as ExtendedSession;

    logMiddlewareAction("Request", {
      pathname,
      session: !!session,
      user: {
        email: session?.user?.email,
        cargo: session?.user?.cargo,
        estado: session?.user?.estado,
      },
    });

    // Si no hay sesión y no es una ruta pública
    if (!session?.user && !isPublicRoute(pathname)) {
      logMiddlewareAction("Unauthenticated Access", { pathname });
      const signInUrl = new URL("/login", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Si hay sesión
    if (session?.user) {
      // Si el usuario está inactivo y no está en account-pending
      if (session.user.estado === false && pathname !== "/account-pending") {
        logMiddlewareAction("Inactive User Access", {
          email: session.user.email,
          estado: session.user.estado,
        });
        return NextResponse.redirect(new URL("/account-pending", request.url));
      }

      // Si el usuario está activo y trata de acceder a account-pending
      if (session.user.estado === true && pathname === "/account-pending") {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      // Si el usuario está activo y trata de acceder a rutas públicas (excepto al procesar callbacks)
      if (
        session.user.estado === true &&
        isPublicRoute(pathname) &&
        !callbackUrl
      ) {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      // Verificar tipo de usuario (interno/externo)
      const isCompanyUser = isCompanyEmail(session.user.email);

      if (
        !isCompanyUser &&
        !pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL)
      ) {
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL, request.url)
        );
      }

      if (
        isCompanyUser &&
        pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL)
      ) {
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME, request.url)
        );
      }

      // Verificar permisos de admin
      if (
        pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.ADMIN) &&
        session.user.cargo?.toLowerCase() !== "admin"
      ) {
        return NextResponse.redirect(new URL("/forbidden", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|_next/data|favicon.ico|logos).*)",
  ],
};
