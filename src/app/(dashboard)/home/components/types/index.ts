// Tipos existentes
export interface PostPrivacy {
    id: string;
    icon: string;
    label: string;
    description: string;
  }
  
  export interface PollOption {
    id: string;
    text: string;
  }
  
  export type PostType =
    | "regular"
    | "poll"
    | "event"
    | "gif"
    | "checkin"
    | "mood"
    | "tag"
    | "file"
    | "celebrate";
  
  export interface MediaFile {
    id: string;
    file: File;
    preview: string;
    type: "image" | "video";
  }
  
  export interface Hashtag {
    text: string;
    start: number;
    end: number;
  }
  
  export interface PostLocation {
    name: string;
    lat?: number;
    lng?: number;
  }
  
  export interface TaggedPerson {
    id: string;
    name: string;
    image: string;
  }
  
  export interface Mood {
    id: string;
    icon: string;
    label: string;
  }
  
  export interface Celebration {
    id: string;
    icon: string;
    label: string;
    description: string;
  }
  
  // Nuevos tipos para eventos
  export interface EventImage {
    id: string;
    file: File;
    preview: string;
  }
  
  export interface VirtualPlatform {
    type: 'zoom' | 'meet' | 'teams' | 'custom' | null;
    url: string;
  }
  
  export interface AgeRestriction {
    hasRestriction: boolean;
    minAge: number | null;
  }
  
  export interface SocialSharing {
    enabled: boolean;
    platforms: ('facebook' | 'twitter' | 'linkedin' | 'whatsapp')[];
  }
  
  export interface EventAgendaItem {
    time: string;
    title: string;
    description?: string;
    speaker?: string;
  }
  
  export interface EventSponsor {
    name: string;
    logo?: string;
    website?: string;
  }
  
  export interface EventFaq {
    question: string;
    answer: string;
  }
  
  export interface EventFile {
    name: string;
    url: string;
    type: string;
  }
  
  // Interfaz principal para eventos
  export interface EventData {
    title: string;
    date: string;
    endDate: string;
    time: string;
    endTime: string;
    location: string;
    address?: string;
    city?: string;
    country?: string;
    description: string;
    category: string;
    isOnline: boolean;
    image: EventImage | null;
    
    // Configuración básica
    requireRegistration: boolean;
    maxAttendees: number | null;
    frequency: 'once' | 'weekly' | 'monthly' | null;
    tags: string[];
    isPrivate: boolean;
    
    // Gestión de invitados
    showGuestList: boolean;
    guestsCanInvite: boolean;
    guestsCanSeeList: boolean;
    coHosts: string[];
    
    // Tickets y registro
    ticketPrice: number | null;
    ticketUrl: string;
    
    // Restricciones y políticas
    ageRestriction: AgeRestriction;
    dress_code: string | null;
    weatherPolicy: 'any' | 'cancel' | 'reschedule' | null;
    
    // Configuración virtual
    virtualPlatform: VirtualPlatform;
    
    // Contenido adicional
    sponsors: EventSponsor[];
    faq: EventFaq[];
    agenda: EventAgendaItem[];
    socialSharing: SocialSharing;
    files: EventFile[];
  }