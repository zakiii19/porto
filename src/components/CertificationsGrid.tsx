import React, { useState } from "react";
import { Award, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
}

interface Props {
  certifications: Certification[];
}

export default function CertificationsGrid({ certifications }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show 9 by default (3 rows of 3 cols)
  const visibleCertifications = isExpanded
    ? certifications
    : certifications.slice(0, 9);

  return (
    <div className="space-y-12">
      {/* Grid container with animate layouts */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleCertifications.map((cert, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={cert.title + index}
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full mb-4 inline-block">
                  {cert.year}
                </span>
                <h3 className="text-base font-bold text-zinc-100 mb-2 leading-snug line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-xs text-zinc-550 leading-relaxed truncate">
                  {cert.issuer}
                </p>
              </div>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-8 self-start group"
              >
                <span>Verify Credential Link</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expand / Collapse Button */}
      {certifications.length > 9 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-violet-400 px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-violet-500/5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 duration-200"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show All Certifications ({certifications.length})</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
