"use client";

import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const questions = [
  {
    q: "What types of blood reports can Vital AI analyze?",
    a: "Vital AI accepts standard blood panel PDFs and images (JPG, PNG). We support comprehensive metabolic panels, lipid panels, CBC, thyroid panels, and most routine blood work from major laboratories.",
  },
  {
    q: "How accurate is the AI-powered analysis?",
    a: "Every insight is grounded in established clinical guidelines (NCEP ATP III, WHO, KDIGO). We provide risk context and evidence-based guidance, not definitive diagnoses. Always consult your healthcare provider.",
  },
  {
    q: "Is my health data secure and private?",
    a: "Yes. All data is encrypted at rest (AES-256) and in transit (TLS). We never share your health data with third parties. Your information is used solely for your personal analysis.",
  },
  {
    q: "What biomarkers does Vital AI track?",
    a: "Over 120 biomarkers across cardiovascular, metabolic, renal, nutritional, hormonal, and haematology categories. Each marker is evaluated against clinically referenced ranges.",
  },
  {
    q: "Can I ask follow-up questions about my results?",
    a: "Absolutely. Our AI chat is context-aware and informed by your uploaded report. Ask about specific biomarkers, treatments, supplements, or symptoms at any time.",
  },
  {
    q: "What are the wellness pathways?",
    a: "Six curated categories: Anti-Aging, Health Check, Supplements, Mind and Mood, Pain Relief, and Regenerative Care. Each pathway is recommended based on your actual biomarker data.",
  },
  {
    q: "Will Vital AI replace my doctor?",
    a: "No. Vital AI provides risk context and evidence-based guidance to help you have more informed conversations with your healthcare provider. We never provide definitive diagnoses.",
  },
];

function FaqItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-ink text-[14px] leading-7 pr-4">{q}</span>
        <svg
          className={`w-3 h-3 flex-shrink-0 text-ink-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          fill="none"
          viewBox="0 0 12 12"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[200px] pb-5" : "max-h-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <p className="text-ink-muted text-[13px] leading-6 pr-8">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            targets: section.querySelectorAll(".faq-reveal"),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 700,
            easing: "easeOutExpo",
            delay: anime.stagger(40),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="faq-reveal opacity-0">
            <h2 className="text-[44.8px] font-normal tracking-[-1.2px] leading-[56px] text-ink">
              Questions
              <br />& Answers
            </h2>
          </div>
          <div>
            {questions.map((item, i) => (
              <div key={i} className="faq-reveal opacity-0">
                <FaqItem
                  q={item.q}
                  a={item.a}
                  isOpen={openIndex === i}
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
