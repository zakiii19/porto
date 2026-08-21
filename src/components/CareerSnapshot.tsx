import React from "react";
import { Calendar, Briefcase, Award, ArrowUpRight } from "lucide-react";
import profileData from "../data/profile.json";

export default function CareerSnapshot() {
  // Take first 2 experiences and first 2 certifications for snapshot
  const snapshotExperiences = profileData.experiences.slice(0, 2);
  const snapshotCertifications = profileData.certifications.slice(0, 2);

  return (
    <section className="py-20 border-b border-zinc-900 bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Career Snapshot */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-display">
                <Briefcase className="w-5 h-5 text-violet-400" />
                <span>Career Experience Snapshot</span>
              </h2>
              <a
                href="/about"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center group"
              >
                <span>View Full Timeline</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="relative border-l border-zinc-800 ml-3 pl-6 space-y-8">
              {snapshotExperiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-400 border-4 border-zinc-950"></div>

                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-555 mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                    {exp.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-violet-400 font-semibold mb-3">
                    {exp.company}
                  </p>

                  <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-450">
                    {exp.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Snapshot */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-display">
                <Award className="w-5 h-5 text-violet-400" />
                <span>Credentials & Certifications</span>
              </h2>
              <a
                href="/about#credentials"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center group"
              >
                <span>See All Licenses</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {snapshotCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                      {cert.year}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-100 mb-1 leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{cert.issuer}</p>
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-6"
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
