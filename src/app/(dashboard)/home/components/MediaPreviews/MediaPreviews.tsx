"use client";

import { FC, useState, useRef, useCallback } from "react";
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { toast } from "sonner";

// Constantes
const MAX_FILES = 6;
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_TYPES = {
  'image/jpeg': 'imagen',
  'image/png': 'imagen',
  'image/gif': 'GIF',
  'video/mp4': 'video',
  'video/quicktime': 'video',
};

// Interfaces
interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface MediaPreviewsProps {
  mediaFiles: MediaFile[];
  setMediaFiles: (files: MediaFile[]) => void;
}

export const MediaPreviews: FC<MediaPreviewsProps> = ({
  mediaFiles,
  setMediaFiles,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      toast.error(`Tipo de archivo no permitido. Solo se permiten imágenes y videos.`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`El archivo ${file.name} excede el límite de 25MB.`);
      return false;
    }

    return true;
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Calcular cuántos archivos se pueden agregar
    const remainingSlots = MAX_FILES - mediaFiles.length;
    
    if (remainingSlots <= 0) {
      toast.error(`Ya has alcanzado el límite de ${MAX_FILES} archivos.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Si intentan subir más archivos de los permitidos
    if (files.length > remainingSlots) {
      toast.error(`Solo puedes agregar ${remainingSlots} archivo${remainingSlots === 1 ? '' : 's'} más.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Filtrar archivos válidos
    const validFiles = files.filter(validateFile);

    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image"
    }));

    setMediaFiles(prev => [...prev, ...newFiles]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [mediaFiles.length, setMediaFiles, validateFile]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setMediaFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter(f => f.id !== fileId);
    });

    if (selectedMedia?.id === fileId) {
      setSelectedMedia(null);
    }
  }, [selectedMedia, setMediaFiles]);

  const getGridClassName = () => {
    switch (mediaFiles.length) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-2";
      case 4: return "grid-cols-2";
      default: return "grid-cols-3";
    }
  };

  const getSpanClassName = (index: number) => {
    if (mediaFiles.length === 3 && index === 0) return "col-span-2 row-span-2";
    if (mediaFiles.length === 4 && index < 2) return "col-span-1 row-span-1";
    return "";
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia || mediaFiles.length <= 1) return;

    const currentIndex = mediaFiles.findIndex(file => file.id === selectedMedia.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : mediaFiles.length - 1;
    } else {
      newIndex = currentIndex < mediaFiles.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedMedia(mediaFiles[newIndex]);
  };

  return (
    <>
      <div className={`grid ${getGridClassName()} gap-1 mt-4`}>
        {mediaFiles.map((file, index) => (
          <div 
            key={file.id} 
            className={`relative group ${getSpanClassName(index)}`}
          >
            <div 
              className="relative cursor-pointer"
              onClick={() => setSelectedMedia(file)}
            >
              {file.type === "video" ? (
                <div className="relative aspect-square">
                  <video
                    src={file.preview}
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    playsInline
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white flex items-center">
                    <Icon name="play" className="w-4 h-4 mr-1" />
                    Video
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square">
                  <Image
                    src={file.preview}
                    alt="Media preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  {file.file.type === "image/gif" && (
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                      GIF
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleRemoveFile(file.id)}
                className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para agregar más archivos */}
      {mediaFiles.length < MAX_FILES && (
        <div className="mt-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-300"
          >
            <Icon name="plus" className="w-5 h-5" />
            Agregar {mediaFiles.length > 0 ? 'más ' : ''}
            {MAX_FILES - mediaFiles.length} {MAX_FILES - mediaFiles.length === 1 ? 'archivo' : 'archivos'}
          </button>
        </div>
      )}

      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept={Object.keys(ALLOWED_TYPES).join(",")}
        multiple
        onClick={(e) => {
          e.currentTarget.value = '';
        }}
      />

      {/* Modal de preview */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative w-full max-w-6xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <Icon name="x" className="w-6 h-6" />
            </button>

            <div className="relative">
              {selectedMedia.type === "video" ? (
                <video
                  key={selectedMedia.id}
                  src={selectedMedia.preview}
                  className="w-full h-full max-h-[80vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={selectedMedia.preview}
                  alt="Preview"
                  width={1200}
                  height={800}
                  className="max-h-[80vh] object-contain rounded-lg mx-auto"
                  priority
                />
              )}
            </div>

            {/* Navegación */}
            {mediaFiles.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateMedia('prev');
                    }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <Icon name="chevronLeft" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateMedia('next');
                    }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <Icon name="chevronRight" className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                  {mediaFiles.findIndex(f => f.id === selectedMedia.id) + 1} / {mediaFiles.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MediaPreviews;