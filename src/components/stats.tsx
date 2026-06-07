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

    const items = section.querySelectorAll<HTMLElement>(".stat-item");
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: items,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 800,
            easing: "easeOutExpo",
            delay: anime.stagger(100),
          });
          anime({
            targets: section.querySelectorAll(".timeline-dot"),
            scale: [0, 1],
            duration: 600,
            easing: "easeOutBack",
            delay: anime.stagger(140, { start: 400 }),
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
    <section ref={sectionRef} className="py-24 px-6 md:px-10" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="max-w-[672px]">
          <p className="text-ink-muted text-[15px] md:text-[18.8px] uppercase tracking-[0.5px] leading-7 mb-2">
            Built for precision
          </p>
          <h2 className="font-display text-[32px] md:text-[37.8px] text-[#050c13] tracking-[-1.2px] leading-[1.06]">
            Your health, analyzed in seconds.
          </h2>
          <p className="text-[#394447] text-[15px] leading-relaxed mt-6">
            No appointments, no waiting rooms. Upload your blood panel and get
            clinically grounded insights immediately.
          </p>
        </div>

        {/* MOBILE: stats with a vertical rail, a dot aligned to each stat */}
        <div className="mt-14 flex flex-col gap-10 md:hidden">
          {stats.map((stat, i) => (
            <div key={stat.value} className="stat-item relative pl-8">
              {/* connector line down to the next dot */}
              {i < stats.length - 1 && (
                <span className="absolute left-[5.5px] top-[18px] h-[calc(100%+40px)] w-px bg-[rgba(5,12,19,0.1)]" />
              )}
              {/* dot aligned with the stat heading */}
              <span className="timeline-dot absolute left-0 top-[12px] w-3 h-3 rounded-full bg-[#050c13] z-10" />
              <p className="text-[#050c13] text-[23px] tracking-[-0.6px] leading-9 mb-2">
                {stat.value}
              </p>
              <p className="text-[#394447] text-[13px] leading-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* DESKTOP: 3-col stats + horizontal timeline */}
        <div className="mt-16 hidden md:flex flex-col gap-10">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="stat-item border-l border-[rgba(5,12,19,0.2)] pl-[25px]"
              >
                <p className="text-[#050c13] text-[23px] tracking-[-0.6px] leading-10 mb-2">
                  {stat.value}
                </p>
                <p className="text-[#394447] text-[13px] leading-normal">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-w-[1200px]">
            <div className="relative grid grid-cols-3 h-3">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full bg-[rgba(5,12,19,0.1)]" />
              {timeline.map((label) => (
                <div key={label} className="flex justify-center items-center">
                  <span className="timeline-dot w-3 h-3 rounded-full bg-[#050c13]" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3">
              {timeline.map((label) => (
                <span
                  key={label}
                  className="text-center text-[#4b585b] text-xs uppercase tracking-[2.4px] leading-6"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
