import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Menu,
  X,
  Github,
  Instagram,
  Linkedin,
  FileText,
} from "lucide-react";
import profileData from "../data/profile.json";

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
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
            <span className="text-[10px] text-zinc-400 tracking-wider">
              PORTFOLIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-violet-400 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (Socials + Email Clipboard Utility + Resume) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-violet-400 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-violet-400 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-violet-400 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Copy-to-Clipboard Email */}
          <button
            onClick={copyEmail}
            className="flex items-center space-x-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-violet-500 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-all duration-200"
            title="Copy Email to Clipboard"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="max-w-[120px] truncate">
              {profileData.socials.email}
            </span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-violet-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
            )}
          </button>

          {/* Quick Resume Download */}
          <a
            href="https://drive.google.com/file/d/1kliVRxG9P86tZ19SGhcQ_yTxuGOJVpJD/view?usp=drive_link"
            download
            className="flex items-center space-x-2 text-xs font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 px-3 py-1.5 rounded-lg shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={copyEmail}
            className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-zinc-900 rounded-lg"
            title="Copy Email"
          >
            {copied ? (
              <Check className="w-5 h-5 text-violet-400" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-zinc-900 rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base font-medium text-zinc-300 hover:text-violet-400 py-1 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-4 flex flex-col sm:flex-row gap-3 items-stretch justify-between">
            <div className="flex items-center space-x-4">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 p-2 hover:bg-zinc-900 rounded-lg"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 p-2 hover:bg-zinc-900 rounded-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-violet-400 p-2 hover:bg-zinc-900 rounded-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center space-x-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 py-2.5 px-4 rounded-lg shadow-lg shadow-violet-500/10 transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
