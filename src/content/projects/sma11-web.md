---
title: "SMAN 11 Semarang: UI/UX Redesign & Usability Evaluation Using SUS & UCD"
category: "UI/UX"
featured: true
date: "2025-06"
summary: "Undergraduate thesis research focused on evaluating and redesigning a high school website to improve usability, user satisfaction, and frontend performance."
thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
role: "UI/UX Researcher & Frontend Developer"
tools: ["Figma", "React JS", "Vite", "Bootstrap", "SPSS", "System Usability Scale (SUS)"]
deliverables:
  ["User Persona & Journey Maps", "Interactive Figma Prototype", "React JS Web Application", "Statistical Usability Evaluation Report"]
liveUrl: "https://react-sma11.vercel.app/"
figmaUrl: null
---

## 1. Project Background & Challenge

School websites serve as crucial hubs for communicating academic programs, administrative announcements, and student achievements. However, an initial evaluation of the SMAN 11 Semarang website revealed significant usability challenges an outdated visual layout, confusing navigation structures, non-functional links, and slow response times caused by legacy static HTML/CSS infrastructure.

The initial baseline usability evaluation yielded a System Usability Scale (SUS) score of **45.3** (categorized as *Poor / Grade F*), indicating high user frustration and low task completion efficiency. The objective of this research was to apply User-Centered Design (UCD) principles to architect a modern, intuitive, and responsive web experience that meets acceptable usability standards.

---

## 2. Methodology & Research Execution

The project followed the standard four-stage User-Centered Design (UCD) framework according to ISO 9241-210:

### Context of Use & User Requirements

- **Usability Testing & Baseline SUS**: Evaluated 47 student and teacher participants performing real-world tasks (finding announcements, accessing downloadable forms, checking student achievements).
- **Artifacts Created**: Developed user personas, Hook Model canvases, and User Journey Maps to pinpoint friction areas across the information architecture.

### Design Solutions & Implementation

- **Interface Redesign**: Crafted a clean, modern UI system in Figma utilizing responsive grids, high-contrast visual hierarchy, and intuitive dropdown menus.
- **Modern Web Stack**: Rebuilt the frontend using **React JS**, **React Router**, and **Vite** for optimized page rendering, deployed via Vercel.

---

## 3. Key Usability Impact & Results

Post-redesign evaluation with the same cohort demonstrated substantial measurable improvements across all usability dimensions:

- **SUS Score Surge**: Increased by **+29.6 points** (from 45.3 to **74.9**), a **65.34% improvement** that shifted the platform rating from *Poor / Grade F* to *Acceptable / Good (Grade B)*.
- **Statistical Significance**: Paired Samples T-Test confirmed the score increase was statistically significant ($p = 0.000 < 0.05, t = -8.180$).
- **Normalized Gain (N-Gain)**: Achieved a moderate-to-high overall gain average of **44.65%**, confirming effective usability enhancement across target users.