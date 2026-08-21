import React from "react";
import { ArrowRight, Calendar, Tag } from "lucide-react";

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

export default function FeaturedProjects({ projects }: Props) {
  return (
    <section className="py-20 border-b border-zinc-900 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Featured Case Studies
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              A curated selection of my top projects demonstrating system
              requirements engineering, wireframe testing, and creative brand
              design.
            </p>
          </div>
          <a
            href="/projects"
            className="text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center group whitespace-nowrap"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
          // {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex flex-col bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
            >
              {/* Thumbnail Container */}
              <div className="aspect-[16/10] w-full overflow-hidden relative bg-zinc-950">
                <img
                  src={project.data.thumbnail}
                  alt={project.data.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 ease-out"
                />

                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-violet-400 bg-zinc-950/80 border border-violet-500/20 backdrop-blur px-2.5 py-1 rounded-md">
                    {project.data.category}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.data.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors mb-2.5 leading-snug line-clamp-2">
                    {project.data.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 mb-5 leading-relaxed">
                    {project.data.summary}
                  </p>
                </div>

                <div>
                  {/* Tool Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-850">
                    {project.data.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded"
                      >
                        <Tag className="w-2.5 h-2.5 mr-1 opacity-60" />
                        {tool}
                      </span>
                    ))}
                    {project.data.tools.length > 3 && (
                      <span className="inline-flex items-center text-[10px] font-medium text-zinc-500 bg-zinc-900/50 border border-zinc-850 px-2 py-0.5 rounded">
                        +{project.data.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
