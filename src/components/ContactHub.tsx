import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Github,
  Instagram,
  Linkedin,
  Compass,
  BookOpen,
} from "lucide-react";
import profileData from "../data/profile.json";

export default function ContactHub() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "LinkedIn",
      url: profileData.socials.linkedin,
      icon: Linkedin,
      color: "hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-500/5",
      description: "Professional network",
    },
    {
      name: "GitHub",
      url: profileData.socials.github,
      icon: Github,
      color: "hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-900/30",
      description: "Code & repositories",
    },
    {
      name: "Instagram",
      url: profileData.socials.instagram,
      icon: Instagram,
      color: "hover:text-pink-400 hover:border-pink-500/20 hover:bg-pink-500/5",
      description: "Design portfolios",
    },
    {
      name: "Pinterest",
      url: profileData.socials.pinterest,
      icon: Compass,
      color: "hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5",
      description: "Visual moodboards",
    },
    {
      name: "Medium",
      url: profileData.socials.medium,
      icon: BookOpen,
      color:
        "hover:text-violet-400 hover:border-violet-500/20 hover:bg-violet-500/5",
      description: "Case study writeups",
    },
  ];

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Headline and integrated Email widget */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 block mb-2.5">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Let's discuss your next project
              </h2>
              <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                Open to design contracts, system architecture alignments, or
                creative collaborations. Write to my direct mailbox or connect
                via socials.
              </p>
            </div>

            {/* Integrated Email/Copy Widget */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                Direct Email
              </span>
              <div className="flex items-center bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 rounded-lg overflow-hidden transition-all group">
                <div className="flex items-center gap-2.5 px-3.5 py-3 flex-grow min-w-0">
                  <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-300 truncate">
                    {profileData.socials.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="border-l border-zinc-800/80 px-4 py-3 bg-zinc-900 hover:bg-zinc-850 hover:text-violet-400 text-zinc-400 font-semibold text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-violet-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Compact Social Rows */}
          <div className="lg:col-span-7 space-y-3.5">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider block">
              Connect Channels
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 bg-zinc-900/15 border border-zinc-850 hover:border-zinc-700 rounded-lg p-3 transition-all duration-200 group ${social.color}`}
                  >
                    {/* Compact Icon Box */}
                    <div className="w-8.5 h-8.5 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center flex-shrink-0 text-zinc-400 group-hover:text-inherit transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Typography */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-inherit transition-colors truncate">
                        {social.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 truncate mt-0.5">
                        {social.description}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
