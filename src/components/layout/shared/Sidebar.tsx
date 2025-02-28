"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
}

interface MenuSection {
  [key: string]: MenuItem[];
}

export const Sidebar: FC = () => {
  const pathname = usePathname();

  const menuItems: MenuSection = {
    "/home": [
      { name: "Dashboard", href: "/home" },
      { name: "Resources", href: "/home/resources" },
      { name: "Settings", href: "/home/settings" },
    ],
    "/ec2": [
      { name: "Instances", href: "/ec2" },
      { name: "Volumes", href: "/ec2/volumes" },
      { name: "Security Groups", href: "/ec2/security-groups" },
    ],
  };

  const currentPath =
    Object.keys(menuItems).find((path) => pathname.startsWith(path)) || "/home";

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-1">
        {menuItems[currentPath].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              pathname === item.href
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
