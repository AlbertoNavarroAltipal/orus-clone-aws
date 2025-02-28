import { FC } from "react";
import {
  MessageSquare,
  Phone,
  FileText,
  Book,
  Users,
  ExternalLink,
  LifeBuoy,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

interface SupportMenuProps {
  onClose: () => void;
}

interface SupportItem {
  icon: typeof MessageSquare;
  title: string;
  description: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
  color: {
    light: string;
    dark: string;
  };
}

const supportItems: SupportItem[] = [
  {
    icon: MessageSquare,
    title: "Centro de soporte",
    description: "Chat en vivo y tickets",
    href: "#",
    badge: "En línea",
    color: {
      light: "text-blue-600 bg-blue-50",
      dark: "dark:text-blue-400 dark:bg-blue-900/20",
    },
  },
  {
    icon: Phone,
    title: "Soporte técnico",
    description: "Línea de soporte técnico",
    href: "#",
    badge: "24/7",
    color: {
      light: "text-green-600 bg-green-50",
      dark: "dark:text-green-400 dark:bg-green-900/20",
    },
  },
  {
    icon: FileText,
    title: "Release Note",
    description: "Notas de la versión",
    href: "#",
    color: {
      light: "text-purple-600 bg-purple-50",
      dark: "dark:text-purple-400 dark:bg-purple-900/20",
    },
  },
  {
    icon: Book,
    title: "Base de conocimiento",
    description: "Artículos y recursos",
    href: "#",
    color: {
      light: "text-amber-600 bg-amber-50",
      dark: "dark:text-amber-400 dark:bg-amber-900/20",
    },
  },
  {
    icon: Users,
    title: "Crear caso Salesforce",
    description: "Seguimiento especializado",
    href: "#",
    isExternal: true,
    color: {
      light: "text-rose-600 bg-rose-50",
      dark: "dark:text-rose-400 dark:bg-rose-900/20",
    },
  },
];

export const SupportMenu: FC<SupportMenuProps> = () => {
  return (
    <div className="absolute right-0 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500 text-white">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Centro de Ayuda
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ¿Cómo podemos ayudarte?
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-3">
        <div className="space-y-1">
          {supportItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-all duration-200"
            >
              <div
                className={`p-2 rounded-lg ${item.color.light} ${item.color.dark} transition-colors duration-200`}
              >
                <item.icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {item.badge}
                    </span>
                  )}
                  {item.isExternal && (
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.description}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700/50">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
            <span>Contacto</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Clock className="h-4 w-4" />
            <span>Historial</span>
          </a>
        </div>
      </div>
    </div>
  );
};
