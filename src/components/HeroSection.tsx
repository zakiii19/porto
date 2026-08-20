import React from "react";
import { motion } from "framer-motion";
import { Network, PenTool, LayoutGrid, ArrowRight } from "lucide-react";
import profileData from "../data/profile.json";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const disciplines = [
    {
      title: "System Analysis",
      icon: Network,
      color: "from-blue-500/20 to-blue-500/0 hover:border-blue-500/40",
      iconColor: "text-blue-400",
      description:
        "Optimizing system workflows, crafting UML diagrams, and detailing robust system requirements.",
    },
    {
      title: "UI/UX Design",
      icon: LayoutGrid,
      color: "from-indigo-500/20 to-indigo-500/0 hover:border-indigo-500/40",
      iconColor: "text-indigo-400",
      description:
        "Developing scalable design systems in Figma, creating interactive wireframes, and building user-centric flows.",
    },
    {
      title: "Graphic Design",
      icon: PenTool,
      color: "from-violet-500/20 to-violet-500/0 hover:border-violet-500/40",
      iconColor: "text-violet-400",
      description:
        "Crafting visual brand identities, customized packaging layouts, typography guidelines, and digital collaterals.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 border-b border-zinc-900 bg-zinc-950">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/25 px-3 py-1 rounded-full text-violet-400 text-xs font-semibold tracking-wider uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            <span>Seeking a new opportunity</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight sm:leading-none"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-405 to-blue-400">
              {profileData.personal.name}
            </span>
          </motion.h1>

          {/* Bio Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-zinc-400 mb-10 leading-relaxed font-normal"
          >
            {profileData.personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="/projects"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 px-6 py-3.5 rounded-lg shadow-xl shadow-violet-500/10 transition-all duration-200"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/about"
              className="w-full sm:w-auto flex items-center justify-center text-sm font-semibold text-zinc-300 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 px-6 py-3.5 rounded-lg transition-all duration-200"
            >
              <span>Read Methodology</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Triple Role Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-4"
        >
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 lg:p-8 bg-gradient-to-br ${d.color} transition-all duration-300 group`}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center ${d.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-zinc-100 mb-3 group-hover:text-violet-400 transition-colors duration-200">
                  {d.title}
                </h3>
                <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">
                  {d.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
