// src/components/ui/Sidebar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem, SidebarProps } from "@/types/sidebar";
import { Icon } from "@/components/ui/Icon";

interface CollapsedSubmenuProps {
  items: MenuItem[];
  parentTitle: string;
  parentRect: DOMRect | null;
}

const CollapsedSubmenu: React.FC<CollapsedSubmenuProps> = ({
  items,
  parentTitle,
  parentRect,
}) => {
  if (!parentRect) return null;

  return (
    <div
      className="fixed bg-[#1b2532] border border-gray-700 rounded-md shadow-lg py-2 min-w-[200px] z-50"
      style={{
        top: parentRect.top,
        left: parentRect.right + 8,
      }}
    >
      <div className="px-3 py-2 text-sm font-semibold text-gray-400 border-b border-gray-700 mb-2">
        {parentTitle}
      </div>
      {items.map((item) => (
        <div key={item.href || item.title}>
          {item.href && !item.children ? (
            <Link
              href={item.href}
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#2a3f59] hover:text-white"
            >
              {item.icon && <Icon name={item.icon} className="h-4 w-4 mr-2" />}
              {item.dot && (
                <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
              )}
              <span>{item.title}</span>
              {item.badge && (
                <span
                  className={`ml-2 ${
                    item.badge.color || "bg-[#004f9f]"
                  } text-white text-xs px-1.5 py-0.5 rounded-full`}
                >
                  {item.badge.text}
                </span>
              )}
              {item.external && (
                <Icon name="externalLink" className="h-3 w-3 ml-1" />
              )}
            </Link>
          ) : (
            <div className="relative group">
              <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#2a3f59] hover:text-white cursor-pointer">
                <div className="flex items-center">
                  {item.icon && (
                    <Icon name={item.icon} className="h-4 w-4 mr-2" />
                  )}
                  {item.dot && (
                    <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  )}
                  <span>{item.title}</span>
                </div>
                {item.children && (
                  <Icon name="chevronRight" className="h-3 w-3 ml-2" />
                )}
              </div>
              {item.children && (
                <div className="absolute left-full top-0 ml-0.5 hidden group-hover:block">
                  <CollapsedSubmenu
                    items={item.children}
                    parentTitle={item.title}
                    parentRect={null}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const pathname = usePathname();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const handleItemHover = (item: MenuItem, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    clearTimeout(hoverTimeoutRef.current);
    setHoveredRect(rect);
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setHoveredRect(null);
    }, 100);
  };

  const toggleItem = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  useEffect(() => {
    const expandParentItems = (
      items: MenuItem[],
      targetPath: string
    ): string[] => {
      const expandedPaths: string[] = [];

      const findAndExpand = (items: MenuItem[], targetPath: string) => {
        for (const item of items) {
          if (
            item.href &&
            (targetPath === item.href || targetPath.startsWith(item.href + "/"))
          ) {
            if (item.href !== "/") {
              expandedPaths.push(item.href);
            }
          }
          if (item.children) {
            findAndExpand(item.children, targetPath);
          }
        }
      };

      findAndExpand(items, targetPath);
      return expandedPaths;
    };

    const expandedPaths = expandParentItems(menuItems, pathname);
    setExpandedItems(expandedPaths);
  }, [pathname, menuItems]);

  const renderMenuItem = (
    item: MenuItem,
    level: number = 0,
    collapsed: boolean = false
  ) => {
    if (item.type === "subtitle" && !collapsed) {
      return (
        <div
          key={item.title}
          className="text-xs font-semibold text-gray-400 px-3 pt-4 pb-2"
        >
          {item.title}
        </div>
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.href;
    const isExpanded = expandedItems.includes(item.href || "");

    if (collapsed) {
      if (item.type === "subtitle") return null;

      return (
        <div
          key={item.href || item.title}
          className="relative py-1"
          onMouseEnter={(e) => handleItemHover(item, e)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex items-center justify-center h-10 mx-2 rounded-md ${
              isActive
                ? "bg-[#2a3f59] text-white"
                : "text-gray-300 hover:bg-[#2a3f59] hover:text-white"
            } cursor-pointer`}
            onClick={() => (hasChildren ? toggleItem(item.href!) : null)}
          >
            {item.icon && (
              <div className="relative">
                <Icon name={item.icon} className="h-5 w-5" />
                {item.badge && (
                  <span
                    className={`absolute -top-2 -right-2 ${
                      item.badge.color || "bg-[#004f9f]"
                    } text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </div>
            )}
            {item.dot && (
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={item.href || item.title} className="relative">
        <div
          className={`flex items-center px-3 py-2 text-sm rounded-md mx-2 ${
            isActive
              ? "bg-[#2a3f59] text-white"
              : "text-gray-300 hover:bg-[#2a3f59] hover:text-white"
          } cursor-pointer`}
          style={{ paddingLeft: level ? `${level * 12 + 16}px` : "16px" }}
          onClick={() => {
            if (hasChildren) {
              toggleItem(item.href!);
            } else if (item.href && !item.external) {
              window.location.href = item.href;
            }
          }}
        >
          {item.icon && <Icon name={item.icon} className="h-4 w-4 mr-2" />}
          {item.dot && (
            <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
          )}
          <span className="flex-1">{item.title}</span>
          {hasChildren && (
            <span className="ml-2">
              <Icon
                name={isExpanded ? "chevronDown" : "chevronRight"}
                className="h-3 w-3"
              />
            </span>
          )}
          {item.badge && (
            <span
              className={`ml-2 ${
                item.badge.color || "bg-[#004f9f]"
              } text-white text-xs px-1.5 py-0.5 rounded-full`}
            >
              {item.badge.text}
            </span>
          )}
          {item.external && (
            <Icon name="externalLink" className="h-3 w-3 ml-1" />
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-[#232f3e] border-r border-gray-700 transition-all duration-300 ease-in-out relative ${
        isExpanded ? "w-64" : "w-16"
      } flex flex-col`}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute -right-3 top-4 bg-[#232f3e] border border-gray-700 rounded-full p-1 hover:bg-[#2a3f59] text-gray-400 hover:text-white z-10 ${
          isExpanded ? "-mr-1" : "rotate-180 -mr-0"
        }`}
      >
        <Icon name="chevronRight" className="h-4 w-4" />
      </button>

      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => renderMenuItem(item, 0, !isExpanded))}
      </nav>

      {!isExpanded && hoveredItem && hoveredItem.children && (
        <CollapsedSubmenu
          items={hoveredItem.children}
          parentTitle={hoveredItem.title}
          parentRect={hoveredRect}
        />
      )}
    </div>
  );
};
