"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs";

const features = [
  {
    title: "Blood Report Analysis",
    description:
      "Upload your blood panel and get an instant AI-powered biomarker breakdown with health scoring.",
    image: "/images/feature-blood.png",
    width: 611,
    height: 485,
    imgClass: "w-[74%] h-auto",
  },
  {
    title: "Recovery Plans",
    description:
      "Personalized multi-phase protocols with supplements, lifestyle guidance, and monitoring.",
    image: "/images/feature-recovery.png",
    width: 575,
    height: 625,
    imgClass: "h-[300px] w-auto",
  },
  {
    title: "AI Health Chat",
    description:
      "Ask anything about treatments, supplements, or symptoms with context-aware AI responses.",
    image: "/images/feature-chat.png",
    width: 635,
    height: 677,
    imgClass: "h-[320px] w-auto",
  },
  {
    title: "Smart Recommendations",
    description:
      "Matched treatments and supplements with AI reasoning for why each fits your profile.",
    image: "/images/feature-recommend.png",
    width: 537,
    height: 603,
    imgClass: "h-[316px] w-auto",
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
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-10"
      id="features"
    >
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-ink text-center leading-[1.1] tracking-[-1.5px] mb-5">
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
              <div className="h-[300px] md:h-[340px] relative flex items-center justify-center overflow-hidden">
                <Image
                  src={feature.image}
                  alt={`${feature.title} preview`}
                  width={feature.width}
                  height={feature.height}
                  className={`${feature.imgClass} object-contain pointer-events-none`}
                />
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
