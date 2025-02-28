// src/types/layout.ts
export interface LayoutProps {
  children: React.ReactNode;
}

// src/types/navigation.ts
export interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface MenuSection {
  [key: string]: MenuItem[];
}

// src/types/search.ts
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
}

export interface ResultSearchProps {
  onClose: () => void;
}
