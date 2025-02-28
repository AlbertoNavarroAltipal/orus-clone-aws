import { Icon } from "@/components/ui/Icon";
import { PostLocation } from '../types';

interface LocationDisplayProps {
  location: PostLocation;
  onRemoveLocation: () => void;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({
  location,
  onRemoveLocation,
}) => {
  return (
    <div className="flex items-center gap-2 mt-2 bg-[#2a3f59] rounded-lg p-2">
      <Icon name="mapPin" className="h-5 w-5 text-red-500" />
      <span className="text-white">{location.name}</span>
      <button
        onClick={onRemoveLocation}
        className="ml-auto text-gray-400 hover:text-white"
      >
        <Icon name="x" className="h-4 w-4" />
      </button>
    </div>
  );
};