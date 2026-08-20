import React from "react";
import { ShieldCheck, Network, Layout, Palette } from "lucide-react";

export default function CompetencyMatrix() {
  const skillCategories = [
    {
      title: "Analysis & Systems",
      icon: Network,
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      skills: [
        "UML & BPMN Workflows",
        "System Architecture Design",
        "Product Requirements Docs (PRD)",
        "API Contract Specifications",
        "Relational & TimeSeries Databases",
        "Agile Methodology & Jira",
        "Draw.io & Lucidchart",
      ],
    },
    {
      title: "UI/UX & Prototyping",
      icon: Layout,
      color: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5",
      skills: [
        "Figma Design Systems",
        "Interactive High-Fi Prototypes",
        "Wireframing & Site Mapping",
        "Usability Testing & Audits",
        "Tailwind CSS & CSS v4",
        "Astro & Next.js Frameworks",
        "React Component Libraries",
      ],
    },
    {
      title: "Graphic Design & Creative Suite",
      icon: Palette,
      color: "border-violet-500/20 text-violet-400 bg-violet-500/5",
      skills: [
        "Visual Brand Identities",
        "Adobe Illustrator & Photoshop",
        "Typography & Type Pairing",
        "Packaging mechanical design",
        "Social & Marketing Collateral",
        "Layout design & typography",
        "Brand Guidelines & Manuals",
      ],
    },
  ];

  return (
    <section className="py-20 border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            Core Competency Matrix
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A comprehensive mapping of my interdisciplinary skillset spanning
            technical systems engineering, product design, and creative
            execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-zinc-900/20 border border-zinc-800 rounded-xl p-6 lg:p-8 hover:border-zinc-700 transition-colors duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border ${category.color} mb-6`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-400"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
