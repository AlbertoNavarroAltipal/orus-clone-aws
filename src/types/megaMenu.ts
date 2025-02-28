// src/types/megaMenu.ts
import type { IconName } from "@/components/ui/Icon";

export interface MenuItem {
  id: string;
  title: string;
  href?: string;
  icon?: IconName;
  description?: string;
  isFavorite?: boolean;
  hasSubmenu?: boolean;
  parentId?: string;
  children?: MenuItem[];
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
