"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { WaitlistForm } from "./waitlist-form";

export function FooterCTA() {
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
            targets: section.querySelectorAll(".cta-reveal"),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 700,
            easing: "easeOutExpo",
            delay: anime.stagger(60),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-surface border-t border-border"
    >
      <div className="max-w-[560px] mx-auto text-center">
        <h2 className="cta-reveal opacity-0 text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Be among the first
        </h2>
        <p className="cta-reveal opacity-0 text-ink-muted text-lg mb-10">
          Join the waitlist and get early access when Vital AI launches.
        </p>
        <div className="cta-reveal opacity-0">
          <WaitlistForm />
        </div>
        <p className="cta-reveal opacity-0 text-ink-muted/50 text-xs mt-6 font-mono">
          End-to-end encrypted. Never shared with third parties.
        </p>
      </div>

      <footer className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-accent/15 border border-accent/25 flex items-center justify-center">
            <span className="text-accent font-bold text-[9px] font-mono">
              V
            </span>
          </div>
          <span className="text-ink-muted text-xs">
            2025 Vital AI
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-ink-muted text-xs hover:text-ink transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-ink-muted text-xs hover:text-ink transition-colors duration-200"
          >
            Terms
          </a>
        </div>
      </footer>
    </section>
  );
}
