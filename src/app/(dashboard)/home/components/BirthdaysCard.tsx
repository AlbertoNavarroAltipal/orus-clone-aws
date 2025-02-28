// src/app/(dashboard)/home/components/BirthdaysCard.tsx
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";

interface Birthday {
 name: string;
 date: string;
 image: string;
 department?: string;
 daysUntil?: number;
}

const birthdays: Birthday[] = [
 { 
   name: 'Carlos Ruiz', 
   date: 'Hoy', 
   image: '/avatars/3.png',
   department: 'Desarrollo',
   daysUntil: 0
 },
 { 
   name: 'Ana López', 
   date: 'Mañana', 
   image: '/avatars/4.png',
   department: 'Diseño',
   daysUntil: 1
 },
 { 
   name: 'Miguel Ángel', 
   date: '23 Oct', 
   image: '/avatars/5.png',
   department: 'Marketing',
   daysUntil: 5
 },
];

export function BirthdaysCard() {
 return (
   <div className="bg-white dark:bg-[#232f3e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-200">
     {/* Header with decorative pattern */}
     <div className="relative bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 p-4">
       <div className="absolute inset-0 opacity-10 dark:opacity-5">
         <div className="absolute inset-0 pattern-dots pattern-pink-500 pattern-bg-transparent pattern-size-2 pattern-opacity-10" />
       </div>
       
       <div className="relative flex items-center justify-between">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-white dark:bg-[#2a3f59] rounded-lg shadow-sm">
             <Icon 
               name="cake" 
               className="h-5 w-5 text-pink-500 dark:text-pink-400" 
             />
           </div>
           <div>
             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
               Cumpleaños
             </h2>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Celebraciones del mes
             </p>
           </div>
         </div>
         
         <button className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-[#2a3f59] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#35495e] transition-colors duration-200 shadow-sm">
           <Icon name="calendar" className="h-4 w-4" />
           <span>Ver calendario</span>
         </button>
       </div>
     </div>

     {/* Birthday List */}
     <div className="p-4">
       <div className="space-y-3">
         {birthdays.map((birthday, index) => (
           <div 
             key={index}
             className="group relative flex items-center gap-4 p-3 rounded-xl hover:bg-pink-50/50 dark:hover:bg-pink-900/10 transition-all duration-200"
           >
             {/* Avatar with animated border */}
             <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/50 dark:to-purple-900/50 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
               <div className="relative">
                 <Image
                   src={birthday.image}
                   alt={birthday.name}
                   width={48}
                   height={48}
                   className="rounded-full border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-105 transition-transform duration-200"
                 />
                 <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#232f3e] rounded-full shadow-sm p-1">
                   <div className="relative p-1 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-500 dark:to-purple-500 rounded-full animate-pulse">
                     <Icon 
                       name="gift" 
                       className="h-3 w-3 text-white" 
                     />
                   </div>
                 </div>
               </div>
             </div>

             {/* Info Section */}
             <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                 <p className="font-medium text-gray-900 dark:text-white truncate">
                   {birthday.name}
                 </p>
                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                   ${birthday.daysUntil === 0 
                     ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' 
                     : birthday.daysUntil === 1 
                       ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                       : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                   }`}
                 >
                   {birthday.date}
                 </span>
               </div>
               {birthday.department && (
                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                   <Icon name="briefcase" className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                   <span className="truncate">{birthday.department}</span>
                 </div>
               )}
             </div>

             {/* Action Buttons */}
             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
               <button className="p-2 hover:bg-white dark:hover:bg-[#2a3f59] rounded-full transition-colors duration-200">
                 <Icon 
                   name="gift" 
                   className="h-4 w-4 text-pink-500 dark:text-pink-400" 
                 />
               </button>
               <button className="p-2 hover:bg-white dark:hover:bg-[#2a3f59] rounded-full transition-colors duration-200">
                 <Icon 
                   name="messageCircle" 
                   className="h-4 w-4 text-purple-500 dark:text-purple-400" 
                 />
               </button>
             </div>
           </div>
         ))}
       </div>

       {/* Empty State */}
       {birthdays.length === 0 && (
         <div className="py-12 text-center">
           <div className="relative mx-auto w-16 h-16 mb-4">
             <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900 rounded-full animate-pulse blur-sm" />
             <div className="relative bg-white dark:bg-[#2a3f59] rounded-full w-full h-full flex items-center justify-center">
               <Icon 
                 name="cake" 
                 className="h-8 w-8 text-pink-500 dark:text-pink-400" 
               />
             </div>
           </div>
           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
             No hay cumpleaños próximos
           </h3>
           <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
             Te notificaremos cuando se acerquen nuevas celebraciones para que puedas felicitar a tus compañeros
           </p>
         </div>
       )}
     </div>
   </div>
 );
}