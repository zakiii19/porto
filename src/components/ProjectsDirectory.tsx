import React, { useState } from "react";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  data: {
    title: string;
    category: string;
    summary: string;
    thumbnail: string;
    role: string;
    tools: string[];
    date: string;
  };
}

interface Props {
  projects: Project[];
}

export default function ProjectsDirectory({ projects }: Props) {
  const categories = ["All", "System Analysis", "UI/UX", "Graphic Design"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.data.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12 items-center justify-start border-b border-zinc-900 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? "bg-gradient-to-r from-violet-600 to-blue-600 border-transparent text-white shadow-lg shadow-violet-500/10"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
        <span className="text-[11px] text-zinc-500 ml-auto font-medium hidden sm:inline">
          Showing {filteredProjects.length} of {projects.length} case studies
        </span>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={project.id}
            >
              <a
                href={`/projects/${project.id}`}
                className="group flex flex-col h-full bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-zinc-950">
                  <img
                    src={project.data.thumbnail}
                    alt={project.data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-violet-400 bg-zinc-950/80 border border-violet-500/20 backdrop-blur px-2 py-0.5 rounded-md">
                      {project.data.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-550 text-xs mb-3 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.data.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors mb-2.5 leading-snug line-clamp-2">
                      {project.data.title}
                    </h3>

                    {/* Role Badge */}
                    <span className="inline-block text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded mb-4 font-medium">
                      Role: {project.data.role}
                    </span>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 mb-6 leading-relaxed">
                      {project.data.summary}
                    </p>
                  </div>

                  <div>
                    {/* Tool Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-850">
                      {project.data.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center text-[9px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded"
                        >
                          <Tag className="w-2.5 h-2.5 mr-0.5 opacity-60" />
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-violet-400 group-hover:text-violet-300 mt-6 transition-colors">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
