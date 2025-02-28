import { PostPrivacy, Mood, Celebration } from '../types';

// Opciones de privacidad existentes
export const privacyOptions: PostPrivacy[] = [
  {
    id: "public",
    icon: "globe",
    label: "Público",
    description: "Cualquier persona dentro o fuera",
  },
  {
    id: "private",
    icon: "lock",
    label: "Privado",
    description: "Solo tú",
  },
  {
    id: "specific-person",
    icon: "user",
    label: "Persona específica",
    description: "Selecciona personas específicas",
  },
  {
    id: "specific-role",
    icon: "briefcase",
    label: "Cargo específico",
    description: "Personas con un cargo específico",
  },
  {
    id: "gender",
    icon: "users",
    label: "Género",
    description: "Basado en género",
  },
  {
    id: "city",
    icon: "mapPin",
    label: "Ciudad",
    description: "Personas en una ubicación específica",
  },
];

// Estados de ánimo
export const moods: Mood[] = [
  { id: "happy", icon: "smile", label: "Feliz" },
  { id: "blessed", icon: "heart", label: "Bendecido" },
  { id: "loved", icon: "heartHandshake", label: "Amado" },
  { id: "excited", icon: "partyPopper", label: "Emocionado" },
  { id: "thankful", icon: "flower2", label: "Agradecido" },
  { id: "inLove", icon: "heart", label: "Enamorado" },
  { id: "crazy", icon: "zap", label: "Loco" },
  { id: "relaxed", icon: "coffee", label: "Relajado" },
];

// Celebraciones
export const celebrations: Celebration[] = [
  {
    id: "graduation",
    icon: "graduationCap",
    label: "Graduación",
    description: "Celebrando un logro académico",
  },
  {
    id: "newJob",
    icon: "briefcase",
    label: "Nuevo trabajo",
    description: "Iniciando una nueva etapa profesional",
  },
  {
    id: "birthday",
    icon: "cake",
    label: "Cumpleaños",
    description: "Celebrando un año más de vida",
  },
  {
    id: "anniversary",
    icon: "gift",
    label: "Aniversario",
    description: "Conmemorando una fecha especial",
  },
  {
    id: "achievement",
    icon: "trophy",
    label: "Logro",
    description: "Celebrando un logro importante",
  },
];

// Acciones del post
export const postActions = [
  {
    id: "photo",
    icon: "image",
    label: "Foto/video",
    color: "text-green-500",
    bgColor: "hover:bg-green-500/10",
  },
  {
    id: "poll",
    icon: "barChart2",
    label: "Encuesta",
    color: "text-blue-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    id: "event",
    icon: "calendar",
    label: "Evento",
    color: "text-purple-500",
    bgColor: "hover:bg-purple-500/10",
  },
  {
    id: "gif",
    icon: "play",
    label: "GIF",
    color: "text-pink-500",
    bgColor: "hover:bg-pink-500/10",
  },
  {
    id: "checkin",
    icon: "mapPin",
    label: "Check-in",
    color: "text-red-500",
    bgColor: "hover:bg-red-500/10",
  },
  {
    id: "mood",
    icon: "smile",
    label: "Estado",
    color: "text-yellow-500",
    bgColor: "hover:bg-yellow-500/10",
  },
  {
    id: "tag",
    icon: "users",
    label: "Etiquetar",
    color: "text-indigo-500",
    bgColor: "hover:bg-indigo-500/10",
  },
  {
    id: "file",
    icon: "fileText",
    label: "Documento",
    color: "text-orange-500",
    bgColor: "hover:bg-orange-500/10",
  },
  {
    id: "celebrate",
    icon: "party",
    label: "Celebración",
    color: "text-teal-500",
    bgColor: "hover:bg-teal-500/10",
  },
];

// Nuevas constantes para eventos
export const EVENT_CATEGORIES = [
  { id: 'social', label: 'Social', icon: 'users' },
  { id: 'business', label: 'Negocios', icon: 'briefcase' },
  { id: 'education', label: 'Educación', icon: 'graduationCap' },
  { id: 'entertainment', label: 'Entretenimiento', icon: 'music' },
  { id: 'food', label: 'Comida y Bebida', icon: 'coffee' },
  { id: 'health', label: 'Salud y Bienestar', icon: 'heart' },
  { id: 'sports', label: 'Deportes', icon: 'trophy' },
  { id: 'other', label: 'Otro', icon: 'plus' },
];

export const WEATHER_POLICIES = [
  { value: 'any', label: 'El evento se realiza con cualquier clima' },
  { value: 'cancel', label: 'Se cancela en caso de mal tiempo' },
  { value: 'reschedule', label: 'Se reprograma en caso de mal tiempo' },
];

export const VIRTUAL_PLATFORMS = [
  { value: 'zoom', label: 'Zoom', icon: 'video' },
  { value: 'meet', label: 'Google Meet', icon: 'video' },
  { value: 'teams', label: 'Microsoft Teams', icon: 'video' },
  { value: 'custom', label: 'Otra plataforma', icon: 'link' },
];