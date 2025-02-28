import { Icon } from "@/components/ui/Icon";
import { Mood } from '../types';
import { moods } from '../constants';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodSelect,
}) => {
  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          className={`flex flex-col items-center p-3 rounded-lg transition-colors
            ${selectedMood?.id === mood.id ? "bg-[#35495e]" : "hover:bg-[#2a3f59]"}`}
        >
          <Icon name={mood.icon} className="h-8 w-8 text-yellow-500" />
          <span className="mt-1 text-sm text-white">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};