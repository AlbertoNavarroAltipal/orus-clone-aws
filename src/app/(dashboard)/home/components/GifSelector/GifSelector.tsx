"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from "@/components/ui/Icon";
import { toast } from "sonner";
import debounce from 'lodash/debounce';

// Reemplaza esto con tu API key de GIPHY
const GIPHY_API_KEY = 'oDmEqURU33VPk3Ce4FOJxW3fPgdKLJ7i';
const GIPHY_ENDPOINT = 'https://api.giphy.com/v1/gifs';

interface GifSelectorProps {
  onGifSelect: (gifUrl: string) => void;
}

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
      width: string;
      height: string;
    };
    original: {
      url: string;
    };
  };
}

export const GifSelector: React.FC<GifSelectorProps> = ({ onGifSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [trendingGifs, setTrendingGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar GIFs tendencia al inicio
  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${GIPHY_ENDPOINT}/trending?api_key=${GIPHY_API_KEY}&limit=20`
        );
        const data = await response.json();
        setTrendingGifs(data.data);
      } catch (error) {
        console.error('Error fetching trending GIFs:', error);
        toast.error('Error al cargar los GIFs tendencia');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGifs();
  }, []);

  // Búsqueda de GIFs
  const searchGifs = useCallback(async (term: string, reset = false) => {
    if (!term.trim()) {
      setGifs([]);
      return;
    }

    const currentPage = reset ? 0 : page;

    try {
      setLoading(true);
      const response = await fetch(
        `${GIPHY_ENDPOINT}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          term
        )}&limit=20&offset=${currentPage * 20}`
      );
      const data = await response.json();
      
      setGifs(prev => reset ? data.data : [...prev, ...data.data]);
      setHasMore(data.data.length === 20);
      if (!reset) setPage(currentPage + 1);
    } catch (error) {
      console.error('Error searching GIFs:', error);
      toast.error('Error al buscar GIFs');
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Debounce para la búsqueda
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setPage(0);
      searchGifs(term, true);
    }, 500),
    []
  );

  // Observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && searchTerm) {
          searchGifs(searchTerm);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [searchGifs, hasMore, loading, searchTerm]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Manejar selección de GIF
  const handleGifSelect = (gif: Gif) => {
    onGifSelect(gif.images.original.url);
    toast.success('GIF seleccionado');
  };

  // Renderizar grid de GIFs
  const renderGifGrid = (gifsToRender: Gif[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {gifsToRender.map((gif) => (
        <button
          key={gif.id}
          onClick={() => handleGifSelect(gif)}
          className="relative group aspect-video bg-[#35495e] rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
        >
          <img
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Icon name="plus" className="h-6 w-6 text-white" />
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-4 bg-[#2a3f59] rounded-xl overflow-hidden">
      {/* Header con búsqueda */}
      <div className="p-4 border-b border-[#35495e]">
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar GIFs..."
            className="w-full bg-[#35495e] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="loader2" className="h-5 w-5 text-gray-400 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Contenedor de GIFs con scroll */}
      <div
        ref={containerRef}
        className="p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#35495e] scrollbar-track-transparent"
      >
        {/* Cuando no hay búsqueda, mostrar tendencias */}
        {!searchTerm && (
          <>
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Icon name="trendingUp" className="h-5 w-5 text-pink-500" />
              Tendencias
            </h3>
            {renderGifGrid(trendingGifs)}
          </>
        )}

        {/* Resultados de búsqueda */}
        {searchTerm && (
          <>
            {gifs.length > 0 ? (
              renderGifGrid(gifs)
            ) : (
              <div className="text-center py-8 text-gray-400">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="loader2" className="h-5 w-5 animate-spin" />
                    <span>Buscando GIFs...</span>
                  </div>
                ) : (
                  <p>No se encontraron GIFs</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Target para infinite scroll */}
        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  );
};

export default GifSelector;