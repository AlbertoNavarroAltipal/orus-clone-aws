import { Icon } from "@/components/ui/Icon";
import { Celebration } from '../types';
import { celebrations } from '../constants';

interface CelebrationSelectorProps {
  selectedCelebration: Celebration | null;
  onCelebrationSelect: (celebration: Celebration) => void;
}

export const CelebrationSelector: React.FC<CelebrationSelectorProps> = ({
  selectedCelebration,
  onCelebrationSelect,
}) => {
  return (
    <div className="mt-4 space-y-2">
      {celebrations.map((celebration) => (
        <button
          key={celebration.id}
          onClick={() => onCelebrationSelect(celebration)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left
            ${selectedCelebration?.id === celebration.id ? "bg-[#35495e]" : "hover:bg-[#2a3f59]"}`}
        >
          <Icon name={celebration.icon} className="h-6 w-6 text-teal-500" />
          <div>
            <p className="text-white">{celebration.label}</p>
            <p className="text-sm text-gray-400">{celebration.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
