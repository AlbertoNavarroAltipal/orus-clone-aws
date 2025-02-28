import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { TaggedPerson } from '../types';

interface TaggedUsersProps {
  taggedUsers: TaggedPerson[];
  onRemoveUser: (userId: string) => void;
}

export const TaggedUsers: React.FC<TaggedUsersProps> = ({
  taggedUsers,
  onRemoveUser,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {taggedUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-1 bg-[#2a3f59] rounded-full px-2 py-1"
        >
          <Image
            src={user.image}
            alt={user.name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm text-white">{user.name}</span>
          <button
            onClick={() => onRemoveUser(user.id)}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};