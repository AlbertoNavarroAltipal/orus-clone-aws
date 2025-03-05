"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Componentes
import { PostTextArea } from "./PostTextArea/PostTextArea";
import { PostActions } from "./PostActions/PostActions";
import { MediaPreviews } from "./MediaPreviews/MediaPreviews";
import { PollCreator } from "./PollCreator/PollCreator";
import { EventCreator } from "./EventCreator/EventCreator";
import { MoodSelector } from "./MoodSelector/MoodSelector";
import { CelebrationSelector } from "./CelebrationSelector/CelebrationSelector";
import { PrivacySelector } from "./PrivacySelector/PrivacySelector";
import { TaggedUsers } from "./TaggedUsers/TaggedUsers";
import { LocationDisplay } from "./LocationDisplay/LocationDisplay";
import { DocumentDisplay } from "./DocumentDisplay/DocumentDisplay";
import { GifSelector } from "./GifSelector/GifSelector";

// Constantes y tipos
import {
  privacyOptions,
  EVENT_CATEGORIES,
  WEATHER_POLICIES,
  VIRTUAL_PLATFORMS,
} from "./constants";
import type {
  PostType,
  MediaFile,
  PollOption,
  TaggedPerson,
  PostLocation,
  Mood,
  Celebration,
  PostPrivacy,
  Hashtag,
  EventData,
} from "./types";

// Estado inicial para eventData
const DEFAULT_EVENT_DATA: EventData = {
  title: "",
  date: "",
  endDate: "",
  time: "",
  endTime: "",
  location: "",
  address: "",
  city: "",
  country: "",
  description: "",
  category: "",
  isOnline: false,
  image: null,

  // Configuración básica
  requireRegistration: false,
  maxAttendees: null,
  frequency: null,
  tags: [],
  isPrivate: false,

  // Gestión de invitados
  showGuestList: false,
  guestsCanInvite: false,
  guestsCanSeeList: false,
  coHosts: [],

  // Tickets y registro
  ticketPrice: null,
  ticketUrl: "",

  // Restricciones y políticas
  ageRestriction: {
    hasRestriction: false,
    minAge: null,
  },
  dress_code: null,
  weatherPolicy: null,

  // Configuración virtual
  virtualPlatform: {
    type: null,
    url: "",
  },

  // Contenido adicional
  sponsors: [],
  faq: [],
  agenda: [],
  socialSharing: {
    enabled: false,
    platforms: [],
  },
  files: [],
};

export function CreatePost() {
  // Session
  const { data: session } = useSession();

  // Referencias
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Estados principales
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Estados de contenido
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);

  // Estados de tipo y privacidad
  const [postType, setPostType] = useState<PostType>("regular");
  const [selectedPrivacy, setSelectedPrivacy] = useState<PostPrivacy>(
    privacyOptions[0]
  );

  // Estados de características específicas
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);

  const [eventData, setEventData] = useState<EventData>(DEFAULT_EVENT_DATA);
  const [location, setLocation] = useState<PostLocation | null>(null);
  const [taggedUsers, setTaggedUsers] = useState<TaggedPerson[]>([]);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedCelebration, setSelectedCelebration] =
    useState<Celebration | null>(null);
  const [searchText, setSearchText] = useState("");

  // Procesamiento de Hashtags
  const processHashtags = (text: string) => {
    const hashtagRegex = /#[\w\u0080-\uFFFF]+/g;
    const matches = [];
    let match;

    while ((match = hashtagRegex.exec(text)) !== null) {
      matches.push({
        text: match[0],
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    setHashtags(matches);
    return matches;
  };

  // Manejadores de eventos
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setPostContent(textarea.value);
    processHashtags(textarea.value);

    // Auto-height
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const type = file.type.startsWith("image/") ? "image" : "video";
      const preview = URL.createObjectURL(file);
      return { id, file, preview, type };
    });

    setMediaFiles((prev) => [...prev, ...newFiles]);
    setPostType("regular");
    setIsExpanded(true);
  };

  const handleDocumentSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    setSelectedDocument(files[0]);
    setPostType("file");
  };

  const handleTagUser = (person: TaggedPerson) => {
    if (!taggedUsers.some((u) => u.id === person.id)) {
      setTaggedUsers((prev) => [...prev, person]);
      setPostContent((prev) => `${prev} @${person.name} `);
      setSearchText("");
    }
  };

  const removeTaggedUser = (personId: string) => {
    setTaggedUsers((prev) => prev.filter((u) => u.id !== personId));
  };

  const handleCheckIn = (place: PostLocation) => {
    setLocation(place);
    setSearchText("");
    setPostType("checkin");
  };

  const removeLocation = () => {
    setLocation(null);
    setPostType("regular");
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setPostType("mood");
  };

  const handleCelebrationSelect = (celebration: Celebration) => {
    setSelectedCelebration(celebration);
    setPostType("celebrate");
  };

  // Validación del post
  const isPostValid = () => {
    if (postType === "regular") {
      return postContent.trim() || mediaFiles.length > 0;
    }
    if (postType === "poll") {
      return pollOptions.every((opt) => opt.text.trim());
    }
    if (postType === "event") {
      return eventData.title.trim() && eventData.date && eventData.time;
    }
    return true;
  };

  const handlePost = async () => {
    try {
      if (!isPostValid()) {
        toast.error("Por favor completa todos los campos requeridos");
        return;
      }

      // Crear el objeto de datos del post
      const postData = {
        content: postContent.trim(),
        type: postType,
        privacy: selectedPrivacy.id,
        hashtags: hashtags.map((tag) => tag.text),
        mediaFiles,
        pollOptions: postType === "poll" ? pollOptions : undefined,
        eventData: postType === "event" ? eventData : undefined,
        location,
        taggedUsers: taggedUsers.map((user) => user.id),
        mood: selectedMood,
        celebration: selectedCelebration,
        document: selectedDocument,
        gif: selectedGif,
      };

      console.log("Enviando post:", postData);
      // Aquí iría la llamada al API

      // Resetear el formulario
      setPostContent("");
      setMediaFiles([]);
      setSelectedDocument(null);
      setSelectedGif(null);
      setHashtags([]);
      setPostType("regular");
      setSelectedPrivacy(privacyOptions[0]);
      setPollOptions([
        { id: "1", text: "" },
        { id: "2", text: "" },
      ]);
      setEventData(DEFAULT_EVENT_DATA);
      setLocation(null);
      setTaggedUsers([]);
      setSelectedMood(null);
      setSelectedCelebration(null);
      setIsExpanded(false);
      setSearchText("");

      toast.success("Post publicado exitosamente");
    } catch (error) {
      console.error("Error al publicar:", error);
      toast.error("Error al publicar el post");
    }
  };

  return (
    <div className="bg-[#232f3e] rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <Image
            src={session?.user?.image || "/avatars/default.png"}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <PostTextArea
              postContent={postContent}
              isExpanded={isExpanded}
              isEmojiOpen={isEmojiOpen}
              onContentChange={handleTextAreaChange}
              onFocus={() => setIsExpanded(true)}
              onEmojiClick={(emoji) => {
                setPostContent((prev) => prev + emoji.native);
                setIsEmojiOpen(false);
              }}
              setIsEmojiOpen={setIsEmojiOpen}
            />

            {taggedUsers.length > 0 && (
              <TaggedUsers
                taggedUsers={taggedUsers}
                onRemoveUser={removeTaggedUser}
              />
            )}

            {location && (
              <LocationDisplay
                location={location}
                onRemoveLocation={removeLocation}
              />
            )}

            {selectedMood && (
              <div className="mt-2 flex items-center gap-2 text-white">
                <span>Sintiéndome {selectedMood.label}</span>
              </div>
            )}

            {selectedCelebration && (
              <div className="mt-2 flex items-center gap-2 text-white">
                <span>{selectedCelebration.label}</span>
              </div>
            )}

            {mediaFiles.length > 0 && (
              <MediaPreviews
                mediaFiles={mediaFiles}
                setMediaFiles={setMediaFiles}
              />
            )}

            {postType === "poll" && (
              <PollCreator
                pollOptions={pollOptions}
                setPollOptions={setPollOptions}
              />
            )}

            {postType === "event" && (
              <EventCreator eventData={eventData} setEventData={setEventData} />
            )}

            {postType === "mood" && (
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            )}

            {postType === "celebrate" && (
              <CelebrationSelector
                selectedCelebration={selectedCelebration}
                onCelebrationSelect={handleCelebrationSelect}
              />
            )}

            {postType === "gif" && (
              <GifSelector onGifSelect={(gifUrl) => setSelectedGif(gifUrl)} />
            )}

            {selectedDocument && (
              <DocumentDisplay
                document={selectedDocument}
                onRemoveDocument={() => setSelectedDocument(null)}
              />
            )}

            {isExpanded && (
              <div className="mt-4">
                <PostActions
                  postType={postType}
                  setPostType={setPostType}
                  fileInputRef={fileInputRef}
                  documentInputRef={documentInputRef}
                  showMoreActions={showMoreActions}
                  setShowMoreActions={setShowMoreActions}
                />

                <div className="mt-4 pt-4 border-t border-[#2a3f59] flex items-center gap-4">
                  <PrivacySelector
                    selectedPrivacy={selectedPrivacy}
                    isPrivacyOpen={isPrivacyOpen}
                    setSelectedPrivacy={setSelectedPrivacy}
                    setIsPrivacyOpen={setIsPrivacyOpen}
                  />

                  <button
                    onClick={handlePost}
                    className="flex-1 py-2 bg-[#004f9f] hover:bg-[#ff8c3a] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isPostValid()}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inputs ocultos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
        accept="image/*,video/*"
      />
      <input
        type="file"
        ref={documentInputRef}
        onChange={handleDocumentSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
      />
    </div>
  );
}

export default CreatePost;
