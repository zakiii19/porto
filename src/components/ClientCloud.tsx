import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileData from "../data/profile.json";

export default function ClientCloud() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 border-b border-zinc-900 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-550 mb-8">
          Trusted by Collaborators & Brands
        </h2>

        {/* Clean, centered logo cloud */}
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 max-w-4xl mx-auto">
          {profileData.collaborations.map((collab, index) => (
            <div
              key={collab.name}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute -top-16 z-20 w-44 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-lg py-2 px-3 shadow-2xl text-center pointer-events-none"
                  >
                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900/95 border-r border-b border-zinc-800 rotate-45"></div>
                    <p className="text-[11px] font-bold text-zinc-100 truncate">
                      {collab.name}
                    </p>
                    <p className="text-[9px] text-violet-400 font-semibold mt-0.5">
                      {collab.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimalist Logo Image directly */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer py-2 px-4 flex items-center justify-center"
              >
                <img
                  src={collab.logo}
                  alt={collab.name}
                  className="h-6 sm:h-7 w-auto object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 rounded"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
