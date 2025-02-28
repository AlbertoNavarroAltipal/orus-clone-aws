// src/hooks/useTheme.ts
'use client'

import { useEffect, useState } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

export const useTheme = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useNextTheme()

  // Evita problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return { theme: 'system', setTheme: () => null, systemTheme: null }
  }

  return { theme, setTheme, systemTheme }
}