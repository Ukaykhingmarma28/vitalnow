"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const cards = [
  {
    category: "Privacy",
    title: "End-to-End Encryption",
    description:
      "Your health data is encrypted at rest using AES-256 and in transit via TLS. Every report, every conversation, every recommendation is protected.",
    badges: ["Encrypted", "HIPAA", "Private"],
    span: "col-span-1 md:col-span-2",
  },
  {
    category: "Clinical",
    title: "Evidence-Based Insights",
    description:
      "Every recommendation cites recognized clinical frameworks including NCEP ATP III, WHO, and KDIGO guidelines. No guesswork, no generic advice.",
    badges: [],
    span: "col-span-1 md:col-span-2",
  },
  {
    category: "Data Control",
    title: "Zero Data Sharing",
    description:
      "Your data stays yours. We never share, sell, or use your health information for any purpose beyond your personal analysis.",
    badges: [],
    span: "col-span-1",
  },
  {
    category: "Compliance",
    title: "Clinical References",
    description:
      "Every insight is grounded in established medical literature and clinical guidelines, providing defensible context for your health decisions.",
    badges: [],
    span: "col-span-1",
  },
  {
    category: "Trust",
    title: "No Definitive Diagnoses",
    description:
      "Vital AI provides risk context and evidence-based guidance. We always recommend consulting your healthcare provider for medical decisions.",
    badges: [],
    span: "col-span-1 md:col-span-2",
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: section.querySelectorAll(".trust-card"),
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 800,
            easing: "easeOutExpo",
            delay: anime.stagger(60),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-10" id="security">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-ink-muted text-[19.2px] uppercase tracking-[0.5px] mb-2">
          Security
        </p>
        <h2 className="text-[44.8px] font-normal tracking-[-1.2px] leading-[56px] text-ink max-w-[672px]">
          Security is our baseline, not a feature.
        </h2>
        <p className="text-ink text-[13px] leading-7 max-w-[672px] mt-4 mb-4">
          Vital AI is built from the ground up to protect your most sensitive
          health data with clinical-grade security and privacy controls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`trust-card opacity-0 ${card.span} bg-surface-dark rounded-[14px] p-6 flex flex-col gap-3`}
            >
              <p className="text-card-text text-[11.8px] uppercase tracking-[2.4px]">
                {card.category}
              </p>
              <h3 className="text-white text-[23px] font-normal leading-8 mt-1">
                {card.title}
              </h3>
              <p className="text-card-text text-[13.2px] leading-6">
                {card.description}
              </p>
              {card.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {card.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-card-text text-xs border border-card-border rounded-full px-3 py-0.5 leading-6"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
