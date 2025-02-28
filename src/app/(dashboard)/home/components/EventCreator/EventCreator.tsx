"use client";

import { FC, useState, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { toast } from "sonner";

// Tipos e Interfaces
interface EventLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

interface EventAgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

interface EventSponsor {
  name: string;
  logo?: string;
  website?: string;
}

interface EventFaq {
  question: string;
  answer: string;
}

interface EventFile {
  name: string;
  url: string;
  type: string;
}

interface EventImage {
  id: string;
  file: File;
  preview: string;
}

interface VirtualPlatform {
  type: 'zoom' | 'meet' | 'teams' | 'custom' | null;
  url: string;
}

interface AgeRestriction {
  hasRestriction: boolean;
  minAge: number | null;
}

interface SocialSharing {
  enabled: boolean;
  platforms: ('facebook' | 'twitter' | 'linkedin' | 'whatsapp')[];
}

interface EventData {
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

interface EventCreatorProps {
  eventData: EventData;
  setEventData: (data: EventData) => void;
}

// Constantes
const EVENT_CATEGORIES = [
  { id: 'social', label: 'Social', icon: 'users' },
  { id: 'business', label: 'Negocios', icon: 'briefcase' },
  { id: 'education', label: 'Educación', icon: 'graduationCap' },
  { id: 'entertainment', label: 'Entretenimiento', icon: 'music' },
  { id: 'food', label: 'Comida y Bebida', icon: 'coffee' },
  { id: 'health', label: 'Salud y Bienestar', icon: 'heart' },
  { id: 'sports', label: 'Deportes', icon: 'trophy' },
  { id: 'other', label: 'Otro', icon: 'plus' },
];

const WEATHER_POLICIES = [
  { value: 'any', label: 'El evento se realiza con cualquier clima' },
  { value: 'cancel', label: 'Se cancela en caso de mal tiempo' },
  { value: 'reschedule', label: 'Se reprograma en caso de mal tiempo' },
];

const VIRTUAL_PLATFORMS = [
  { value: 'zoom', label: 'Zoom', icon: 'video' },
  { value: 'meet', label: 'Google Meet', icon: 'video' },
  { value: 'teams', label: 'Microsoft Teams', icon: 'video' },
  { value: 'custom', label: 'Otra plataforma', icon: 'link' },
];

// Mock de servicio de búsqueda de lugares
const searchPlaces = async (query: string): Promise<EventLocation[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const mockPlaces: EventLocation[] = [
    { 
      id: '1', 
      name: 'Centro Comercial Santafé', 
      address: 'Calle 185 # 45-03', 
      city: 'Bogotá', 
      country: 'Colombia' 
    },
    { 
      id: '2', 
      name: 'Parque de la 93', 
      address: 'Cra. 93 con Calle 13', 
      city: 'Bogotá', 
      country: 'Colombia' 
    },
    { 
      id: '3', 
      name: 'Centro Comercial Andino', 
      address: 'Carrera 11 # 82-71', 
      city: 'Bogotá', 
      country: 'Colombia' 
    },
    { 
      id: '4', 
      name: 'Aeropuerto El Dorado', 
      address: 'Calle 26 #103-9', 
      city: 'Bogotá', 
      country: 'Colombia' 
    },
  ];

  return mockPlaces.filter(place => 
    place.name.toLowerCase().includes(query.toLowerCase()) ||
    place.address.toLowerCase().includes(query.toLowerCase())
  );
};

export const EventCreator: FC<EventCreatorProps> = ({
    eventData,
    setEventData,
  }) => {
    // Estados
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [locationSearch, setLocationSearch] = useState('');
    const [searchResults, setSearchResults] = useState<EventLocation[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    
    // Referencias
    const fileInputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout>();
  
    // Manejadores de eventos
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona una imagen válida');
        return;
      }
  
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('La imagen no debe superar los 5MB');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setEventData({
          ...eventData,
          image: {
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: reader.result as string
          }
        });
      };
      reader.readAsDataURL(file);
    };
  
    const handleLocationSearch = async (query: string) => {
      setLocationSearch(query);
      setEventData({ ...eventData, location: query });
  
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
  
      if (query.trim().length < 3) {
        setSearchResults([]);
        return;
      }
  
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchPlaces(query);
          setSearchResults(results);
        } catch (error) {
          console.error('Error buscando lugares:', error);
          toast.error('Error al buscar lugares');
        } finally {
          setIsSearching(false);
        }
      }, 300);
    };
  
    const selectPlace = (place: EventLocation) => {
      setEventData({
        ...eventData,
        location: place.name,
        address: place.address,
        city: place.city,
        country: place.country
      });
      setLocationSearch(place.name);
      setSearchResults([]);
    };
  
    const addAgendaItem = () => {
      setEventData({
        ...eventData,
        agenda: [
          ...eventData.agenda,
          { time: '', title: '', description: '', speaker: '' }
        ]
      });
    };
  
    const removeAgendaItem = (index: number) => {
      const newAgenda = [...eventData.agenda];
      newAgenda.splice(index, 1);
      setEventData({ ...eventData, agenda: newAgenda });
    };
  
    const updateAgendaItem = (index: number, field: keyof EventAgendaItem, value: string) => {
      const newAgenda = [...eventData.agenda];
      newAgenda[index] = { ...newAgenda[index], [field]: value };
      setEventData({ ...eventData, agenda: newAgenda });
    };
  
    return (
      <div className="space-y-6 mt-3">
        {/* Imagen del evento */}
        <div className="relative">
          <div className={`relative w-full rounded-xl overflow-hidden ${
            eventData.image ? 'h-64' : 'h-40 bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
            {eventData.image ? (
              <Image
                src={eventData.image.preview}
                alt="Event cover"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="image" className="h-12 w-12 text-white/50" />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-colors"
            >
              <Icon name="camera" className="h-5 w-5" />
              <span>{eventData.image ? 'Cambiar imagen' : 'Agregar imagen'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>
        </div>
  
        {/* Información básica */}
        <div className="space-y-4">
          {/* Título */}
          <div className="space-y-2">
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Nombre del evento *"
              className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400 px-1">
              Elige un nombre descriptivo
            </span>
          </div>
  
          {/* Categoría */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryPicker(!showCategoryPicker)}
              className="w-full flex items-center justify-between p-4 bg-[#2a3f59] rounded-xl hover:bg-[#35495e] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {eventData.category ? (
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon 
                      name={EVENT_CATEGORIES.find(c => c.id === eventData.category)?.icon || 'plus'}
                      className="h-5 w-5 text-blue-500"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center">
                    <Icon name="tag" className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <span className="block text-white">
                    {eventData.category 
                      ? EVENT_CATEGORIES.find(c => c.id === eventData.category)?.label 
                      : 'Categoría *'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {eventData.category 
                      ? 'Click para cambiar' 
                      : 'Selecciona una categoría'}
                  </span>
                </div>
              </div>
              <Icon name="chevronDown" className="h-5 w-5 text-gray-400" />
            </button>
  
            {showCategoryPicker && (
              <div className="absolute z-10 mt-2 w-full bg-[#2a3f59] rounded-xl shadow-lg">
                {EVENT_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setEventData({ ...eventData, category: category.id });
                      setShowCategoryPicker(false);
                    }}
                    className="w-full flex items-center gap-3 p-4 hover:bg-[#35495e] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Icon name={category.icon} className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-white">{category.label}</span>
                    {eventData.category === category.id && (
                      <Icon name="check" className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
  
          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1 px-1">
                Fecha de inicio *
              </label>
              <input
                type="date"
                value={eventData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 px-1">
                Hora de inicio *
              </label>
              <input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 px-1">
                Fecha de fin
              </label>
              <input
                type="date"
                value={eventData.endDate}
                min={eventData.date || new Date().toISOString().split('T')[0]}
                onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 px-1">
                Hora de fin
              </label>
              <input
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white"
              />
            </div>
          </div>
  
          {/* Ubicación */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400 px-1">Ubicación *</label>
              <button
                onClick={() => setEventData({ 
                  ...eventData, 
                  isOnline: !eventData.isOnline,
                  location: eventData.isOnline ? '' : 'Online'
                })}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors px-1"
              >
                {eventData.isOnline ? 'Agregar ubicación física' : 'Hacer evento online'}
              </button>
            </div>
            
            <div className="relative">
              <div className="flex items-center bg-[#2a3f59] rounded-xl overflow-hidden">
                <Icon 
                  name={eventData.isOnline ? "video" : "mapPin"} 
                  className="h-5 w-5 text-gray-400 ml-4"
                />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => handleLocationSearch(e.target.value)}
                  placeholder={eventData.isOnline ? "Enlace de la reunión" : "Buscar ubicación"}
                  className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none"
                />
                {isSearching && (
                  <div className="px-4">
                    <Icon name="loader2" className="h-5 w-5 text-gray-400 animate-spin" />
                  </div>
                )}
              </div>
  
              {/* Resultados de búsqueda */}
              {searchResults.length > 0 && !eventData.isOnline && (
                <div className="absolute z-10 mt-1 w-full bg-[#2a3f59] rounded-xl shadow-lg overflow-hidden">
                  {searchResults.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => selectPlace(place)}
                      className="w-full flex items-start gap-3 p-3 hover:bg-[#35495e] transition-colors text-left"
                    >
                      <Icon name="mapPin" className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <span className="block text-white">{place.name}</span>
                        <span className="text-sm text-gray-400">{place.address}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
  
          {/* Descripción */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 px-1">
              Descripción
            </label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              placeholder="Describe tu evento..."
              rows={4}
              className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none"
            />
          </div>
  
          {/* Configuración avanzada */}
          <div className="space-y-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Icon name={showAdvanced ? 'chevronDown' : 'chevronRight'} className="h-5 w-5" />
              <span>Configuración avanzada</span>
            </button>
  
            {showAdvanced && (
              <div className="space-y-6 pl-4 border-l-2 border-[#2a3f59]">
                {/* Privacidad */}
                <div>
                  <h4 className="font-medium text-white mb-3">Privacidad y Acceso</h4>
                  <button
                    onClick={() => setEventData({ ...eventData, isPrivate: !eventData.isPrivate })}
                    



                    className="w-full flex items-center justify-between p-4 bg-[#2a3f59] rounded-xl hover:bg-[#35495e] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Icon 
                        name={eventData.isPrivate ? 'lock' : 'globe'} 
                        className="h-5 w-5 text-purple-500" 
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-white block">{eventData.isPrivate ? 'Privado' : 'Público'}</span>
                      <span className="text-sm text-gray-400">
                        {eventData.isPrivate 
                          ? 'Solo pueden ver el evento las personas invitadas' 
                          : 'Cualquier persona puede ver este evento'}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      eventData.isPrivate ? 'bg-purple-500' : 'bg-gray-600'
                    }`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        eventData.isPrivate ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                </button>
              </div>

              {/* Registro y Capacidad */}
              <div className="space-y-3">
                <h4 className="font-medium text-white">Registro y Capacidad</h4>
                <div className="p-4 bg-[#2a3f59] rounded-xl space-y-4">
                  <button
                    onClick={() => setEventData({ 
                      ...eventData, 
                      requireRegistration: !eventData.requireRegistration,
                      maxAttendees: eventData.requireRegistration ? null : 0
                    })}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Icon name="userCheck" className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-left">
                        <span className="text-white block">Registro requerido</span>
                        <span className="text-sm text-gray-400">
                          Los asistentes deben registrarse para participar
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        eventData.requireRegistration ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          eventData.requireRegistration ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>
                  </button>

                  {eventData.requireRegistration && (
                    <div className="pt-4 border-t border-[#35495e]">
                      <label className="block text-sm text-gray-400 mb-2">
                        Límite de asistentes
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          value={eventData.maxAttendees || ''}
                          onChange={(e) => setEventData({ 
                            ...eventData, 
                            maxAttendees: e.target.value ? parseInt(e.target.value) : null 
                          })}
                          placeholder="Sin límite"
                          className="w-32 bg-[#35495e] rounded-xl px-4 py-3 text-white placeholder-gray-400"
                        />
                        <span className="text-gray-400">personas</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Deja en blanco para no establecer un límite
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Agenda del evento</h4>
                  <button
                    onClick={addAgendaItem}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-[#35495e] rounded-lg transition-colors"
                  >
                    <Icon name="plus" className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {eventData.agenda.map((item, index) => (
                    <div key={index} className="p-4 bg-[#2a3f59] rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                          className="bg-[#35495e] rounded-lg px-3 py-2 text-white"
                        />
                        <button
                          onClick={() => removeAgendaItem(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-[#35495e] rounded-lg transition-colors"
                        >
                          <Icon name="trash2" className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateAgendaItem(index, 'title', e.target.value)}
                        placeholder="Título de la actividad"
                        className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        value={item.speaker || ''}
                        onChange={(e) => updateAgendaItem(index, 'speaker', e.target.value)}
                        placeholder="Presentador (opcional)"
                        className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                      />
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => updateAgendaItem(index, 'description', e.target.value)}
                        placeholder="Descripción (opcional)"
                        className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white placeholder-gray-400 resize-none"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuración de plataforma virtual */}
              {eventData.isOnline && (
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Plataforma virtual</h4>
                  <div className="p-4 bg-[#2a3f59] rounded-xl space-y-3">
                    <select
                      value={eventData.virtualPlatform.type || ''}
                      onChange={(e) => setEventData({
                        ...eventData,
                        virtualPlatform: {
                          ...eventData.virtualPlatform,
                          type: e.target.value as typeof eventData.virtualPlatform.type
                        }
                      })}
                      className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Selecciona una plataforma</option>
                      {VIRTUAL_PLATFORMS.map(platform => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={eventData.virtualPlatform.url}
                      onChange={(e) => setEventData({
                        ...eventData,
                        virtualPlatform: {
                          ...eventData.virtualPlatform,
                          url: e.target.value
                        }
                      })}
                      placeholder="URL de la reunión"
                      className="w-full bg-[#35495e] rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Otras configuraciones */}
              <div className="space-y-3">
                <h4 className="font-medium text-white">Otras configuraciones</h4>
                <div className="space-y-3">
                  {/* Política de clima */}
                  <select
                    value={eventData.weatherPolicy || ''}
                    onChange={(e) => setEventData({
                      ...eventData,
                      weatherPolicy: e.target.value as typeof eventData.weatherPolicy
                    })}
                    className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white"
                  >
                    <option value="">Política de clima</option>
                    {WEATHER_POLICIES.map(policy => (
                      <option key={policy.value} value={policy.value}>
                        {policy.label}
                      </option>
                    ))}
                  </select>

                  {/* Código de vestimenta */}
                  <input
                    type="text"
                    value={eventData.dress_code || ''}
                    onChange={(e) => setEventData({
                      ...eventData,
                      dress_code: e.target.value
                    })}
                    placeholder="Código de vestimenta (opcional)"
                    className="w-full bg-[#2a3f59] rounded-xl px-4 py-3 text-white placeholder-gray-400"
                  />

                  {/* Restricción de edad */}
                  <div className="p-4 bg-[#2a3f59] rounded-xl space-y-3">
                    <button
                      onClick={() => setEventData({
                        ...eventData,
                        ageRestriction: {
                          hasRestriction: !eventData.ageRestriction.hasRestriction,
                          minAge: eventData.ageRestriction.hasRestriction ? null : 18
                        }
                      })}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="text-left">
                        <span className="text-white block">Restricción de edad</span>
                        <span className="text-sm text-gray-400">
                          Establecer edad mínima para asistir
                        </span>
                      </div>
                      <div className="relative">
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                          eventData.ageRestriction.hasRestriction ? 'bg-blue-500' : 'bg-gray-600'
                        }`}>
                          <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            eventData.ageRestriction.hasRestriction ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </div>
                      </div>
                    </button>

                    {eventData.ageRestriction.hasRestriction && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={eventData.ageRestriction.minAge || ''}
                          onChange={(e) => setEventData({
                            ...eventData,
                            ageRestriction: {
                              ...eventData.ageRestriction,
                              minAge: parseInt(e.target.value) || null
                            }
                          })}
                          placeholder="Edad mínima"
                          className="w-24 bg-[#35495e] rounded-lg px-3 py-2 text-white"
                        />
                        <span className="text-gray-400">años o más</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCreator;