"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const features = [
  {
    title: "Blood Report Analysis",
    description:
      "Upload your blood panel and get an instant AI-powered biomarker breakdown with health scoring.",
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Floating health score card */}
        <div className="absolute left-[10%] top-[15%] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-4 w-[220px] rotate-[-2deg]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-ink-muted">LDL Cholesterol</span>
            <span className="text-[10px] text-ink-muted/60 ml-auto bg-bg-alt px-2 py-0.5 rounded">Optimal</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <span className="text-xs text-ink-muted">Vitamin D</span>
            <span className="text-[10px] text-ink-muted/60 ml-auto bg-amber-50 text-amber-600 px-2 py-0.5 rounded">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-ink-muted">HbA1c</span>
            <span className="text-[10px] text-ink-muted/60 ml-auto bg-bg-alt px-2 py-0.5 rounded">Optimal</span>
          </div>
        </div>
        {/* Health Score card */}
        <div className="absolute right-[8%] top-[22%] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 w-[180px] rotate-[3deg]">
          <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-2">Health Score</p>
          <p className="text-5xl font-bold text-ink leading-none">87</p>
          <div className="w-full h-1.5 bg-bg-alt rounded-full mt-3 overflow-hidden">
            <div className="w-[87%] h-full bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Recovery Plans",
    description:
      "Personalized multi-phase protocols with supplements, lifestyle guidance, and monitoring.",
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Phase card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 w-[260px]">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] uppercase tracking-wider text-ink-muted">Phase 1</p>
            <span className="text-[9px] bg-brand/10 text-brand px-2 py-0.5 rounded-full ml-auto">Weeks 1-8</span>
          </div>
          <p className="text-sm font-medium text-ink mb-3">Foundation Protocol</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <div className="w-4 h-4 rounded bg-green-500/10 flex items-center justify-center flex-shrink-0"><span className="text-green-600 text-[8px]">&#10003;</span></div>
              Omega-3 EPA/DHA 2g daily
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <div className="w-4 h-4 rounded bg-green-500/10 flex items-center justify-center flex-shrink-0"><span className="text-green-600 text-[8px]">&#10003;</span></div>
              Vitamin D3 4000 IU morning
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <div className="w-4 h-4 rounded bg-green-500/10 flex items-center justify-center flex-shrink-0"><span className="text-green-600 text-[8px]">&#10003;</span></div>
              Mediterranean diet pattern
            </div>
          </div>
        </div>
        {/* Stat card */}
        <div className="absolute right-[5%] bottom-[18%] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-3 w-[120px] rotate-[2deg]">
          <p className="text-[9px] text-ink-muted">Expected by Week 4</p>
          <p className="text-lg font-bold text-ink leading-tight">-12%</p>
          <p className="text-[9px] text-ink-muted">LDL reduction</p>
        </div>
      </div>
    ),
  },
  {
    title: "AI Health Chat",
    description:
      "Ask anything about treatments, supplements, or symptoms with context-aware AI responses.",
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="w-[280px]">
          {/* Chat messages */}
          <div className="bg-bg-alt rounded-2xl rounded-bl-sm px-4 py-3 mb-2 max-w-[220px]">
            <p className="text-xs text-ink leading-relaxed">What vitamins should I take for low Vitamin D?</p>
          </div>
          <div className="bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ml-auto max-w-[240px]">
            <p className="text-xs text-ink-muted leading-relaxed">Based on your panel showing 18 ng/mL, I recommend <span className="text-ink font-medium">Vitamin D3 4000 IU</span> daily with a fat-containing meal for better absorption.</p>
          </div>
          {/* Suggested prompts */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[9px] text-brand border border-brand/20 rounded-full px-2.5 py-1">IV drip benefits</span>
            <span className="text-[9px] text-brand border border-brand/20 rounded-full px-2.5 py-1">Best for energy</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Smart Recommendations",
    description:
      "Matched treatments and supplements with AI reasoning for why each fits your profile.",
    mockup: (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-4 w-[230px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center">
              <span className="text-brand text-xs">&#10024;</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-ink-muted">AI Match</span>
          </div>
          <p className="text-sm font-medium text-ink mt-2">Cardiovascular Wellness IV</p>
          <p className="text-[11px] text-ink-muted mt-1">Dubai Wellness Clinic</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-400 text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-[10px] text-ink-muted">4.9 (128)</span>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] text-ink-muted leading-relaxed">Recommended because your triglycerides are elevated and this IV contains CoQ10 and B-complex.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".feature-card");
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            easing: "easeOutExpo",
            delay: anime.stagger(100),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10" id="features">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-[family-name:var(--font-montaga)] text-4xl md:text-5xl lg:text-[56px] text-ink text-center leading-[1.1] tracking-[-1.5px] mb-5">
          Features designed
          <br />
          for your health.
        </h2>
        <p className="text-ink-muted text-sm md:text-[15px] text-center leading-7 max-w-[400px] mx-auto mb-16">
          Explore the features designed to keep you informed and in control of
          your wellness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card rounded-[20px] bg-[#f4f4f5] border border-[#ebebeb] overflow-hidden"
            >
              <div className="h-[300px] md:h-[340px] relative overflow-hidden">
                {feature.mockup}
              </div>
              <div className="px-6 pb-8 pt-2 text-center">
                <h3 className="text-lg md:text-xl font-medium text-ink mb-2">
                  {feature.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed max-w-[380px] mx-auto">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
