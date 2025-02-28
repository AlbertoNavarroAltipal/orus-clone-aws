// src/app/(dashboard)/home/components/QuickAccess.tsx
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

interface QuickAccessItem {
 id: string;
 title: string;
 description: string;
 icon: string;
 href: string;
 shortcut?: string;
 badge?: string;
 isNew?: boolean;
 color: {
   light: {
     bg: string;
     text: string;
     accent: string;
     border: string;
     hover: string;
   },
   dark: {
     bg: string; 
     text: string;
     accent: string;
     border: string;
     hover: string;
   }
 };
}

const quickAccessItems: QuickAccessItem[] = [
 {
   id: "1",
   title: "Recursos Humanos",
   description: "Gestión de personal, solicitudes y beneficios",
   icon: "users",
   href: "/hr",
   shortcut: "Alt + H",
   badge: "2 pendientes",
   color: {
     light: {
       bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
       text: "text-blue-600",
       accent: "bg-blue-500",
       border: "border-blue-100",
       hover: "hover:from-blue-100/70 hover:to-indigo-100/70"
     },
     dark: {
       bg: "dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-indigo-950/40",
       text: "dark:text-blue-400",
       accent: "dark:bg-blue-500",
       border: "dark:border-blue-900/50",
       hover: "dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50"
     }
   }
 },
 // ... otros items con estructura similar
];

export function QuickAccess() {
 return (
   <div className="bg-white dark:bg-[#232f3e] rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-200">
     {/* Header con patrón decorativo */}
     <div className="relative bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-900/50 p-6">
       <div className="absolute inset-0 opacity-20">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-slate-700/50"></div>
       </div>
       
       <div className="relative flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="p-3 bg-white dark:bg-[#2a3f59] rounded-xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
             <Icon 
               name="zap" 
               className="h-6 w-6 text-amber-500 dark:text-amber-400" 
             />
           </div>
           <div>
             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
               Accesos Rápidos
             </h2>
             <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
               Accede rápidamente a tus herramientas favoritas
             </p>
           </div>
         </div>

         {/* <div className="flex items-center gap-2">
           <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors duration-200">
             <Icon name="search" className="h-5 w-5" />
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a3f59] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#35495e] transition-all duration-200 shadow-sm">
             <Icon name="plus" className="h-4 w-4" />
             <span>Añadir acceso</span>
           </button>
         </div> */}
       </div>
     </div>

     {/* Lista de accesos */}
     <div className="p-6">
       <div className="space-y-3">
         {quickAccessItems.map((item) => (
           <Link
             key={item.id}
             href={item.href}
             className={`group relative block p-4 rounded-xl transition-all duration-300 ${item.color.light.bg} ${item.color.dark.bg} ${item.color.light.hover} ${item.color.dark.hover}`}
           >
             <div className="flex items-start gap-4">
               {/* Icono con animación */}
               <div className="relative">
                 <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                 <div className="relative p-3 bg-white dark:bg-[#2a3f59] rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                   <Icon 
                     name={item.icon}
                     className={`h-6 w-6 ${item.color.light.text} ${item.color.dark.text}`}
                   />
                 </div>
               </div>

               {/* Contenido */}
               <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-3 mb-1">
                   <h3 className="text-gray-900 dark:text-white font-medium">
                     {item.title}
                   </h3>
                   {item.badge && (
                     <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                       {item.badge}
                     </span>
                   )}
                   {item.isNew && (
                     <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                       Nuevo
                     </span>
                   )}
                 </div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                   {item.description}
                 </p>
                 {item.shortcut && (
                   <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                     <Icon name="keyboard" className="h-3 w-3" />
                     <span>{item.shortcut}</span>
                   </div>
                 )}
               </div>

               {/* Flecha con animación */}
               <div className="flex items-center self-center">
                 <div className="p-2 rounded-full opacity-0 group-hover:opacity-100 bg-white/60 dark:bg-gray-800/60 transition-all duration-300">
                   <Icon 
                     name="chevronRight"
                     className={`h-5 w-5 ${item.color.light.text} ${item.color.dark.text}`}
                   />
                 </div>
               </div>
             </div>

             {/* Borde animado */}
             <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 dark:ring-gray-700/50 group-hover:ring-2 group-hover:ring-blue-500/20 dark:group-hover:ring-blue-500/20 transition-all duration-300" />
           </Link>
         ))}
       </div>

       {/* Footer */}
       <div className="mt-8 flex items-center gap-4">
         <button className="flex-1 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200">
           Ver todos los accesos
         </button>
         <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
           Configurar
         </button>
       </div>
     </div>
   </div>
 );
}