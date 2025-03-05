import React from "react";
import { Icon } from "@/components/ui/Icon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface PostTextAreaProps {
  postContent: string;
  isExpanded: boolean;
  isEmojiOpen: boolean;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onEmojiClick: (emoji: any) => void;
  setIsEmojiOpen: (isOpen: boolean) => void;
}

export const PostTextArea: React.FC<PostTextAreaProps> = ({
  postContent,
  isExpanded,
  isEmojiOpen,
  onContentChange,
  onFocus,
  onEmojiClick,
  setIsEmojiOpen,
}) => {
  return (
    <div className="relative">
      <textarea
        value={postContent}
        onChange={onContentChange}
        onFocus={onFocus}
        placeholder="¿Qué quieres compartir?"
        className="w-full min-h-[60px] bg-[#2a3f59] rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-[#004f9f]"
        style={{ height: "auto" }}
      />

      {isExpanded && (
        <button
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          className="absolute bottom-2 right-2 text-gray-400 hover:text-white"
        >
          <Icon name="smile" className="h-6 w-6" />
        </button>
      )}

      {isEmojiOpen && (
        <div className="absolute bottom-full right-0 mb-2 z-50">
          <Picker
            data={data}
            onEmojiSelect={onEmojiClick}
            theme="dark"
            previewPosition="none"
          />
        </div>
      )}
    </div>
  );
};
