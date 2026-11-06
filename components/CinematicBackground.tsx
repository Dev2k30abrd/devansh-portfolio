"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface BackgroundScene {
  id: string;
  name: string;
  darkSrc: string;
  lightSrc: string;
  darkOpacity: number;
  lightOpacity: number;
}

const SCENES: BackgroundScene[] = [
  {
    id: "hero",
    name: "Brandon-Inspired 3D Cubes",
    darkSrc: "/backgrounds/hero-neural.svg",
    lightSrc: "/backgrounds/hero-neural-light.svg",
    darkOpacity: 0.95,
    lightOpacity: 0.85,
  },
  {
    id: "about",
    name: "Flowing Intelligent Nodes",
    darkSrc: "/backgrounds/about-nodes.svg",
    lightSrc: "/backgrounds/about-nodes-light.svg",
    darkOpacity: 0.85,
    lightOpacity: 0.75,
  },
  {
    id: "experience",
    name: "Software Architecture",
    darkSrc: "/backgrounds/experience-architecture.svg",
    lightSrc: "/backgrounds/experience-architecture-light.svg",
    darkOpacity: 0.82,
    lightOpacity: 0.72,
  },
  {
    id: "skills",
    name: "Computational Patterns",
    darkSrc: "/backgrounds/skills-algorithms.svg",
    lightSrc: "/backgrounds/skills-algorithms-light.svg",
    darkOpacity: 0.82,
    lightOpacity: 0.72,
  },
  {
    id: "projects",
    name: "Data Visualization & Analytics",
    darkSrc: "/backgrounds/projects-analytics.svg",
    lightSrc: "/backgrounds/projects-analytics-light.svg",
    darkOpacity: 0.88,
    lightOpacity: 0.78,
  },
  {
    id: "certifications",
    name: "Digital Knowledge Network",
    darkSrc: "/backgrounds/certifications-knowledge.svg",
    lightSrc: "/backgrounds/certifications-knowledge-light.svg",
    darkOpacity: 0.80,
    lightOpacity: 0.70,
  },
  {
    id: "contact",
    name: "Global Interconnected Nodes",
    darkSrc: "/backgrounds/contact-global.svg",
    lightSrc: "/backgrounds/contact-global-light.svg",
    darkOpacity: 0.85,
    lightOpacity: 0.75,
  },
];

interface CinematicBackgroundProps {
  activeSection: string;
}

export default function CinematicBackground({ activeSection }: CinematicBackgroundProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains("light"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* ── Background Canvas ── */}
      <div className="relative w-full h-full">
        {SCENES.map((scene, index) => {
          const isActive = activeSection === scene.id;
          const targetOpacity = isActive
            ? isDark
              ? scene.darkOpacity
              : scene.lightOpacity
            : 0;

          const currentSrc = isDark ? scene.darkSrc : scene.lightSrc;

          return (
            <div
              key={scene.id}
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: targetOpacity,
                visibility: isActive ? "visible" : "hidden",
                transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), visibility 700ms",
              }}
            >
              <Image
                src={currentSrc}
                alt=""
                fill
                unoptimized
                priority={index < 2}
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* ── Balanced Contrast Overlays ── */}
      {/* 1. Soft vignette framing screen edges */}
      <div
        className="absolute inset-0 opacity-25 dark:opacity-35 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, var(--bg-page) 98%)",
        }}
      />

      {/* 2. Delicate top/bottom blend gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)]/60 via-transparent to-[var(--bg-page)]/70 opacity-40 transition-opacity duration-300 pointer-events-none"
      />
    </div>
  );
}
