"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { WaitlistForm } from "./waitlist-form";

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    // Pre-animation state in JS so reduced-motion users always see content.
    const reveals = section.querySelectorAll<HTMLElement>(".cta-reveal");
    reveals.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: reveals,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: "easeOutExpo",
            delay: anime.stagger(80),
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
    <section ref={sectionRef} className="px-6 md:px-10 py-32 md:py-44">
      <div className="max-w-[640px] mx-auto flex flex-col items-center text-center">
        <div className="cta-reveal h-px w-10 bg-[rgba(5,12,19,0.22)] mb-10" />

        <h2 className="cta-reveal font-display text-[#050c13] text-[40px] md:text-[60px] leading-[1.03] tracking-[-1.8px]">
          Know your numbers.
          <br />
          Start with one report.
        </h2>

        <p className="cta-reveal text-[#5a6166] text-[15px] md:text-base leading-relaxed mt-6 max-w-[440px]">
          Upload a single blood report and get a clear, clinically grounded
          picture of where your health stands.
        </p>

        <div className="cta-reveal w-full max-w-[440px] mt-10">
          <WaitlistForm variant="default" />
        </div>

        <p className="cta-reveal text-[#1a2a35]/45 text-[12px] mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
