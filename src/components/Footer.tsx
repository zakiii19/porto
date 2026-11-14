import React from 'react';
import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t py-6 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
      <div className="max-w-[1180px] mx-auto px-6 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} {profile.name} — {profile.location}</span>
        <div className="flex flex-wrap items-center gap-4 font-semibold">
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#9333ea]">
            Instagram
          </a>
          <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="hover:text-[#9333ea]">
            Medium
          </a>
          <a href={profile.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-[#9333ea]">
            Pinterest
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#9333ea]">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#9333ea]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
