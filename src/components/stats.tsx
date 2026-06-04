"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const stats = [
  {
    value: "5 Seconds",
    description:
      "To analyze a full blood panel. Upload your report and get a clinically grounded breakdown with health score and biomarker insights instantly.",
  },
  {
    value: "120+",
    description:
      "Biomarkers tracked across cardiovascular, metabolic, renal, nutritional, hormonal, and haematology categories with clinically referenced ranges.",
  },
  {
    value: "Real-time",
    description:
      "Health visibility. Zero latency. Your results are analyzed the moment they are uploaded, giving you immediate, actionable health intelligence.",
  },
];

const timeline = ["Upload", "Analyze", "Act"];

export function Stats() {
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
            targets: section.querySelectorAll(".stat-item"),
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 800,
            easing: "easeOutExpo",
            delay: anime.stagger(100),
          });
          anime({
            targets: section.querySelector(".timeline-bar-fill"),
            scaleX: [0, 1],
            duration: 1200,
            easing: "easeOutExpo",
            delay: 400,
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
    <section ref={sectionRef} className="py-24 px-10" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-ink-muted text-[19.2px] uppercase tracking-[0.5px] mb-2">
          Built for precision
        </p>
        <h2 className="text-[44.8px] font-normal tracking-[-1.2px] leading-[56px] text-ink max-w-[672px]">
          Your health, analyzed in seconds.
        </h2>
        <p className="text-ink text-[13px] leading-7 max-w-[672px] mt-4 mb-12">
          No appointments, no waiting rooms. Upload your blood panel and get
          clinically grounded insights immediately.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`stat-item opacity-0 py-6 px-6 ${
                i < stats.length - 1
                  ? "md:border-r md:border-border"
                  : ""
              }`}
            >
              <p className="text-[44.8px] font-normal tracking-[-1.2px] text-ink leading-tight mb-4">
                {stat.value}
              </p>
              <p className="text-ink-body text-[13.2px] leading-6">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-12 relative">
          <div className="h-[6px] bg-border rounded-full overflow-hidden">
            <div
              className="timeline-bar-fill h-full bg-brand/40 rounded-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {timeline.map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full -mt-[27px] mb-2 ${
                    i === 0 ? "bg-ink" : "bg-border"
                  }`}
                />
                <span className="text-ink-muted text-xs uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
