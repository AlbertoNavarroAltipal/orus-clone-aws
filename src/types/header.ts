// src/types/header.ts
export interface Tab {
  id: string;
  title: string;
  path: string;
  icon?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "problem" | "change" | "other";
  read: boolean;
  timestamp: string;
}

export type ThemeOption = "light" | "dark" | "system";
export type LanguageOption = "es" | "en";

export interface UserSettings {
  language: LanguageOption;
  theme: ThemeOption;
}
