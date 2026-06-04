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
    <section ref={sectionRef} className="py-24 px-10 border-t border-border">
      <div className="max-w-[832px] mx-auto">
        <h2 className="cta-reveal opacity-0 text-[44.8px] font-normal tracking-[-1.2px] leading-[56px] text-ink">
          Ready to understand your health better?
        </h2>
        <p className="cta-reveal opacity-0 text-ink text-[13px] leading-7 mt-4 mb-8 max-w-[672px]">
          Stop guessing about your blood work. Join the waitlist and be among
          the first to get clinically grounded insights and a personalized
          recovery plan.
        </p>
        <div className="cta-reveal opacity-0 flex flex-wrap items-center gap-4">
          <a
            href="#waitlist"
            className="bg-nav-btn text-white text-sm font-normal px-5 py-3 rounded-full hover:opacity-90 transition-opacity duration-200"
          >
            Join Waitlist
          </a>
          <a
            href="mailto:hello@reservedaily.com"
            className="text-ink text-sm font-normal hover:text-ink-muted transition-colors duration-200"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
