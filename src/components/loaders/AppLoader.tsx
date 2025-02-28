// src/components/loaders/AppLoader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto p-8">
        {/* Logo container con animación de rebote suave */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/logos/logo_letra_blanco.png"
            alt="Logo"
            width={250}
            height={40}
            priority
            className="animate-pulse"
          />
        </motion.div>

        {/* Círculos animados */}
        <div className="relative h-4 w-full bg-blue-900/20 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>

        {/* Mensaje de carga con animación de fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">
            Cargando tu espacio de trabajo
          </h2>
          <p className="text-blue-100">Estamos preparando todo para ti...</p>
        </motion.div>

        {/* Indicadores de carga */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-2 rounded-full bg-white/30"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
                className="h-full rounded-full bg-white"
              />
            </motion.div>
          ))}
        </div>

        {/* Tips rotativos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-sm text-blue-100 italic">
            Sabías que... puedes usar atajos de teclado para navegar más rápido
          </p>
        </motion.div>

        {/* Elementos decorativos */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-24 h-24 rounded-full border-4 border-white/10"
            />
          </div>
          <div className="absolute bottom-0 left-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-16 h-16 rounded-full border-4 border-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
