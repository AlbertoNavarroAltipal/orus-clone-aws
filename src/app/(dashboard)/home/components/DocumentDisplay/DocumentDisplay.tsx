import { Icon } from "@/components/ui/Icon";

interface DocumentDisplayProps {
  document: File;
  onRemoveDocument: () => void;
}

export const DocumentDisplay: React.FC<DocumentDisplayProps> = ({
  document,
  onRemoveDocument,
}) => {
  return (
    <div className="mt-4 bg-[#2a3f59] rounded-lg p-3">
      <div className="flex items-center gap-3">
        <Icon name="fileText" className="h-8 w-8 text-orange-500" />
        <div className="flex-1">
          <p className="text-white truncate">{document.name}</p>
          <p className="text-sm text-gray-400">
            {(document.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          onClick={onRemoveDocument}
          className="text-gray-400 hover:text-white"
        >
          <Icon name="x" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};