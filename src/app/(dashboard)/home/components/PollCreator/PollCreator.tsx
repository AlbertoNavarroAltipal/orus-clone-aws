"use client";

import { Icon } from "@/components/ui/Icon";
import { useState } from "react";
import { toast } from "sonner";

interface PollOption {
  id: string;
  text: string;
}

interface PollCreatorProps {
  pollOptions: PollOption[];
  setPollOptions: (options: PollOption[]) => void;
}

const MAX_OPTIONS = 10;
const MIN_OPTIONS = 2;
const MAX_OPTION_LENGTH = 100;
const POLL_DURATIONS = [
  { id: '1d', label: '1 día', description: 'La encuesta estará activa durante 24 horas' },
  { id: '3d', label: '3 días', description: 'La encuesta estará activa durante 3 días' },
  { id: '7d', label: '1 semana', description: 'La encuesta estará activa durante 7 días' },
  { id: '14d', label: '2 semanas', description: 'La encuesta estará activa durante 14 días' },
  { id: 'custom', label: 'Personalizado', description: 'Elige una duración personalizada (máximo 90 días)' },
];

export const PollCreator: React.FC<PollCreatorProps> = ({
  pollOptions,
  setPollOptions,
}) => {
  // Estados
  const [duration, setDuration] = useState(POLL_DURATIONS[0].id);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [customDays, setCustomDays] = useState(1);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  // Funciones auxiliares
  const generateOptionId = () => Math.random().toString(36).substr(2, 9);

  const addOption = () => {
    if (pollOptions.length >= MAX_OPTIONS) {
      toast.error(`No puedes agregar más de ${MAX_OPTIONS} opciones`);
      return;
    }
    setPollOptions([...pollOptions, { id: generateOptionId(), text: '' }]);
  };

  const removeOption = (id: string) => {
    if (pollOptions.length <= MIN_OPTIONS) {
      toast.error(`Debes mantener al menos ${MIN_OPTIONS} opciones`);
      return;
    }
    setPollOptions(pollOptions.filter(opt => opt.id !== id));
  };

  const updateOptionText = (id: string, text: string) => {
    if (text.length > MAX_OPTION_LENGTH) return;
    setPollOptions(pollOptions.map(opt => 
      opt.id === id ? { ...opt, text: text } : opt
    ));
  };

  return (
    <div className="space-y-6 w-full mt-2">
      {/* Encabezado y Explicación */}
      <div className="rounded-xl overflow-hidden">
        {showExplanation && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Icon name="barChart2" className="h-5 w-5" />
                  Nueva Encuesta
                </h3>
                <div className="text-white/90 text-sm space-y-1">
                  <p>Configura tu encuesta:</p>
                  <ul className="space-y-1 list-inside">
                    <li className="flex items-center gap-2">
                      <Icon name="check" className="h-4 w-4 text-green-400" />
                      <span>Agrega de {MIN_OPTIONS} a {MAX_OPTIONS} opciones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check" className="h-4 w-4 text-green-400" />
                      <span>Define el tiempo de actividad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check" className="h-4 w-4 text-green-400" />
                      <span>Configura el tipo de respuesta</span>
                    </li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => setShowExplanation(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Opciones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium">Opciones de respuesta</h4>
          <span className="text-sm text-gray-400">
            {pollOptions.length} de {MAX_OPTIONS} opciones
          </span>
        </div>

        <div className="space-y-2">
          {pollOptions.map((option, index) => (
            <div
              key={option.id}
              className="group relative flex items-center gap-3 bg-[#2a3f59] rounded-xl p-3 hover:bg-[#35495e] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div 
                className="relative flex-shrink-0"
                onMouseEnter={() => setShowInfo(`option-${option.id}`)}
                onMouseLeave={() => setShowInfo(null)}
              >
                {allowMultipleAnswers ? (
                  <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center">
                    {option.text && <Icon name="check" className="h-3 w-3 text-green-500" />}
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                    {option.text && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                  </div>
                )}
                {showInfo === `option-${option.id}` && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-black/90 text-white text-xs rounded-lg p-2 z-10">
                    {allowMultipleAnswers ? 'Se pueden seleccionar varias opciones' : 'Solo se puede seleccionar una opción'}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOptionText(option.id, e.target.value)}
                  placeholder={`Opción ${index + 1}`}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400"
                />
                <div className="h-0.5 bg-green-500/20 relative mt-1">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${(option.text.length / MAX_OPTION_LENGTH) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 min-w-[3rem] text-right">
                  {option.text.length}/{MAX_OPTION_LENGTH}
                </span>
                {pollOptions.length > MIN_OPTIONS && (
                  <button
                    onClick={() => removeOption(option.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/20 rounded-lg"
                  >
                    <Icon name="trash2" className="h-4 w-4 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botón agregar opción */}
        {pollOptions.length < MAX_OPTIONS && (
          <button
            onClick={addOption}
            className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-white bg-[#2a3f59]/50 hover:bg-[#2a3f59] rounded-xl transition-all duration-200"
          >
            <Icon name="plus" className="h-5 w-5" />
            <span>Agregar opción de respuesta</span>
          </button>
        )}
      </div>

      {/* Configuración */}
      <div className="space-y-4 pt-6 border-t border-[#2a3f59]">
        <h4 className="text-white font-medium">Configuración de la encuesta</h4>

        {/* Duración */}
        <div className="relative">
          <button
            onClick={() => setShowDurationPicker(!showDurationPicker)}
            className="w-full flex items-center justify-between p-4 bg-[#2a3f59] rounded-xl hover:bg-[#35495e] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Icon name="clock" className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <span className="text-white block">Duración</span>
                <span className="text-sm text-gray-400">
                  {duration === 'custom' 
                    ? `${customDays} día${customDays > 1 ? 's' : ''}`
                    : POLL_DURATIONS.find(d => d.id === duration)?.description
                  }
                </span>
              </div>
            </div>
            <Icon name="chevronDown" className="h-5 w-5 text-gray-400" />
          </button>

          {showDurationPicker && (
            <div className="absolute z-10 mt-2 w-full bg-[#2a3f59] rounded-xl shadow-lg overflow-hidden">
              {POLL_DURATIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setDuration(option.id);
                    setShowDurationPicker(false);
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-[#35495e] transition-colors"
                >
                  <div className="text-left">
                    <span className="text-white block">{option.label}</span>
                    <span className="text-sm text-gray-400">{option.description}</span>
                  </div>
                  {duration === option.id && (
                    <Icon name="check" className="h-5 w-5 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input personalizado para días */}
        {duration === 'custom' && (
          <div className="p-4 bg-[#2a3f59] rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={customDays}
                  onChange={(e) => setCustomDays(Math.min(90, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-20 bg-[#35495e] rounded-lg px-3 py-2 text-white text-center"
                />
                <span className="text-white">días</span>
              </div>
              <div 
                className="relative"
                onMouseEnter={() => setShowInfo('maxDays')}
                onMouseLeave={() => setShowInfo(null)}
              >
                <button className="p-2 hover:bg-[#35495e] rounded-lg transition-colors">
                  <Icon name="info" className="h-5 w-5 text-blue-400" />
                </button>
                {showInfo === 'maxDays' && (
                  <div className="absolute bottom-full right-0 mb-2 w-32 bg-black/90 text-white text-xs rounded-lg p-2 z-10">
                    Máximo 90 días
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Respuestas múltiples */}
        <button
          onClick={() => setAllowMultipleAnswers(!allowMultipleAnswers)}
          className="w-full flex items-center justify-between p-4 bg-[#2a3f59] rounded-xl hover:bg-[#35495e] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Icon name="layoutGrid" className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-left">
              <span className="text-white block">Respuestas múltiples</span>
              <span className="text-sm text-gray-400">
                Permite seleccionar más de una opción
              </span>
            </div>
          </div>
          <div className="relative">
            <div className={`w-12 h-6 rounded-full transition-colors ${
              allowMultipleAnswers ? 'bg-green-500' : 'bg-gray-600'
            }`}>
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                allowMultipleAnswers ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PollCreator;