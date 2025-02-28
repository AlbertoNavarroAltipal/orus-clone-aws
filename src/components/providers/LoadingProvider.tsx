// src/components/providers/LoadingProvider.tsx
"use client";

import { useEffect } from 'react';
import { useLoadingStore } from '@/store/useLoadingStore';
import AppLoader from '@/components/loaders/AppLoader';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { isLoading, setIsLoading } = useLoadingStore();

  useEffect(() => {
    // Simular tiempo de carga inicial o esperar recursos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return <AppLoader />;
  }

  return <>{children}</>;
}