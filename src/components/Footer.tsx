import React from "react";
import { Github, Instagram, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import profileData from "../data/profile.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo & Headline */}
          {/* <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center font-bold text-white">
                JD
              </div>
              <span className="font-semibold text-zinc-100">
                {profileData.personal.name}
              </span>
            </div>
            <p className="mt-3 text-xs text-zinc-400 max-w-xs leading-relaxed">
              {profileData.personal.headline}
            </p>
          </div> */}
          <a href="/" className="flex items-center space-x-2 group">
          <img
            src="/my-icon.png"
            alt="Qolbul Muzaki Logo"
            className="w-9 h-9 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight text-zinc-100 group-hover:text-violet-400 transition-colors duration-200">
              {profileData.personal.name}
            </span>
          </div>
        </a>

          {/* Site Directory Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/"
                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
              >
                Home
              </a>
              <a
                href="/projects"
                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="/about"
                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors"
              >
                About
              </a>
              <a
                href="https://drive.google.com/file/d/1xIIly5694LFxl7aY197WUXQ841p-FK_h/view?usp=drive_link"
                download
                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors flex items-center"
              >
                Resume <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Socials & Contact Info */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Connect
            </span>
            <div className="flex items-center space-x-4">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profileData.socials.email}`}
                className="text-zinc-400 hover:text-violet-400 transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <span className="text-xs text-zinc-500">
              Email:{" "}
              <a
                href={`mailto:${profileData.socials.email}`}
                className="text-zinc-400 hover:text-violet-400 transition-colors underline"
              >
                {profileData.socials.email}
              </a>
            </span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} {profileData.personal.name}. All rights
            reserved.
          </p>
          <p className="text-[10px] text-zinc-600">
            Built with Astro, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
