"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const steps = [
  {
    label: "Upload",
    description: "Share your blood panel as a PDF or image.",
  },
  {
    label: "Analyze",
    description:
      "Get your health score, biomarker insights, and risk context in seconds.",
  },
  {
    label: "Act",
    description:
      "Follow a phased recovery plan with matched treatments and supplements.",
  },
];

export function HowItWorks() {
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
            targets: section.querySelectorAll(".step-item"),
            opacity: [0, 1],
            translateX: [-24, 0],
            duration: 800,
            easing: "easeOutExpo",
            delay: anime.stagger(120),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps to clarity
            </h2>
            <p className="text-ink-muted text-lg max-w-[42ch] leading-relaxed">
              No appointments, no waiting rooms. Upload your report and get
              answers immediately.
            </p>
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="step-item opacity-0 flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mt-0.5">
                  <span className="text-accent font-mono text-sm font-bold">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight mb-1.5">
                    {step.label}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed max-w-[38ch]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
