// src/data/mockData.ts
import { SearchResult, Notification } from "../types/header";

export const mockSearchResults: SearchResult[] = [
  {
    id: "chime-sdk",
    name: "Amazon Chime SDK",
    description: "Comunicación en tiempo real para las aplicaciones",
    icon: "SDK",
    color: "bg-red-600",
  },
  {
    id: "documentdb",
    name: "Amazon DocumentDB",
    description: "Servicio de base de datos compatible con MongoDB",
    icon: "DB",
    color: "bg-blue-600",
  },
  {
    id: "openshift",
    name: "Red Hat OpenShift Service on AWS",
    description: "Servicio OpenShift totalmente administrado",
    icon: "OS",
    color: "bg-orange-600",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Problema abierto",
    message: "Se detectó un problema en la región US-East-1",
    type: "problem",
    read: false,
    timestamp: "2024-03-10T10:00:00Z",
  },
];
