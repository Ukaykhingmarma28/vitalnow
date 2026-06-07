"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  Lock,
  SealCheck,
  ShieldCheck,
  BookOpen,
  Heartbeat,
  ArrowRight,
  type Icon,
} from "@phosphor-icons/react";

type Card = {
  category: string;
  title: string;
  description: string;
  badges: string[];
  span: string;
  icon: Icon;
};

const cards: Card[] = [
  {
    category: "Privacy",
    title: "End-to-End Encryption",
    description:
      "Your health data is encrypted at rest using AES-256 and in transit via TLS. Every report, every conversation, every recommendation is protected.",
    badges: ["AES-256", "HIPAA", "GDPR"],
    span: "col-span-1 md:col-span-2",
    icon: Lock,
  },
  {
    category: "Clinical",
    title: "Evidence-Based Insights",
    description:
      "Every recommendation cites recognized clinical frameworks including NCEP ATP III, WHO, and KDIGO guidelines. No guesswork, no generic advice.",
    badges: [],
    span: "col-span-1 md:col-span-2",
    icon: SealCheck,
  },
  {
    category: "Data Control",
    title: "Zero Data Sharing",
    description:
      "Your data stays yours. We never share, sell, or use your health information for any purpose beyond your personal analysis.",
    badges: [],
    span: "col-span-1",
    icon: ShieldCheck,
  },
  {
    category: "Compliance",
    title: "Clinical References",
    description:
      "Every insight is grounded in established medical literature and clinical guidelines, providing defensible context for your health decisions.",
    badges: [],
    span: "col-span-1",
    icon: BookOpen,
  },
  {
    category: "Trust",
    title: "No Definitive Diagnoses",
    description:
      "Vital AI provides risk context and evidence-based guidance. We always recommend consulting your healthcare provider for medical decisions.",
    badges: [],
    span: "col-span-1 md:col-span-2",
    icon: Heartbeat,
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
    <section ref={sectionRef} className="py-24 px-6 md:px-10" id="security">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[672px]">
          <p className="text-ink-muted text-[15px] md:text-[19.2px] uppercase tracking-[0.5px] leading-7 mb-2">
            Security
          </p>
          <h2 className="font-display text-[34px] md:text-[44.8px] font-normal tracking-[-1.2px] leading-[1.05] text-ink">
            Security is our baseline, not a feature.
          </h2>
          <p className="text-ink text-[13px] leading-7 mt-4">
            Vital AI is built from the ground up to protect your most sensitive
            health data with clinical-grade security and privacy controls.
          </p>
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-[#050c13] text-[13.5px] leading-7 mt-2 group"
          >
            Visit our Security &amp; Compliance page
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          {cards.map((card) => {
            const Glyph = card.icon;
            return (
              <div
                key={card.title}
                className={`trust-card opacity-0 ${card.span} bg-surface-dark rounded-[14px] p-6 flex flex-col gap-3`}
              >
                <div className="flex items-center gap-3">
                  <Glyph size={20} weight="regular" className="text-white/80" />
                  <p className="text-card-text text-[11.8px] uppercase tracking-[2.4px]">
                    {card.category}
                  </p>
                </div>
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
                        className="text-card-text text-xs border border-card-border rounded-full px-[9px] py-[3px] leading-6"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
