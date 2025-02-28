// src/types/auth.ts
export interface SessionUser {
  email: string;
  role: "admin" | "user";
  // otros campos necesarios
}

export interface AppSession {
  user?: SessionUser;
  expires: string;
}
