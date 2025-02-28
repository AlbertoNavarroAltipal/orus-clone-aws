"use client";

import { FC, RefObject } from 'react';
import { Icon } from "@/components/ui/Icon";
import type { PostType } from '../types';

interface PostActionsProps {
  postType: PostType;
  setPostType: (type: PostType) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  documentInputRef: RefObject<HTMLInputElement>;
  showMoreActions: boolean;
  setShowMoreActions: (show: boolean) => void;
}

const postActions = [
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

export const PostActions: FC<PostActionsProps> = ({
  postType,
  setPostType,
  fileInputRef,
  documentInputRef,
  showMoreActions,
  setShowMoreActions,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {postActions.slice(0, showMoreActions ? undefined : 4).map((action) => (
        <button
          key={action.id}
          onClick={() => {
            switch (action.id) {
              case "photo":
                fileInputRef.current?.click();
                break;
              case "file":
                documentInputRef.current?.click();
                break;
              default:
                setPostType(
                  postType === (action.id as PostType) ? "regular" : (action.id as PostType)
                );
                break;
            }
          }}
          className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${action.bgColor}
          ${postType === action.id ? "bg-[#2a3f59] text-white" : "text-gray-400"}`}
        >
          <Icon name={action.icon} className={`h-5 w-5 ${action.color}`} />
          <span className="text-sm">{action.label}</span>
        </button>
      ))}

      {/* Botón Más */}
      <button
        onClick={() => setShowMoreActions(!showMoreActions)}
        className="flex items-center justify-center gap-2 p-2 rounded-lg text-gray-400 hover:bg-[#2a3f59] transition-colors"
      >
        <Icon
          name={showMoreActions ? "chevronUp" : "chevronDown"}
          className="h-5 w-5"
        />
        <span className="text-sm">
          {showMoreActions ? "Menos" : "Más"}
        </span>
      </button>
    </div>
  );
};

export default PostActions;