// src/app/api/debug-session/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    // Solo mostrar información de la sesión en desarrollo
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        status: "success",
        session: session,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      });
    }

    // En producción, solo indicar si hay sesión activa
    return NextResponse.json({
      status: "success",
      authenticated: !!session,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al obtener información de sesión:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Error al obtener información de sesión",
      },
      { status: 500 }
    );
  }
}
