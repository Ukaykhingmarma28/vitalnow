"use client";

import Image from "next/image";
import { WaitlistForm } from "./waitlist-form";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #7ecef5 0%, #93d9f8 20%, #b4e5fb 40%, #d2effc 58%, #e8f6fe 72%, #f5fbff 85%, #ffffff 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/hero-overlay.webp"
            alt=""
            fill
            className="object-cover object-center opacity-[0.1] mix-blend-soft-light"
            sizes="100vw"
            priority
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 lg:px-14 pt-[168px] md:pt-[196px] lg:pt-[228px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-8 items-center">
            {/* Left column */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left pb-14 lg:pb-20">
              <div
                className="hero-rise inline-flex items-center bg-[#0c1320] text-white text-[10px] font-semibold uppercase tracking-[2px] px-5 py-2.5 rounded-full mb-6"
                style={{ animationDelay: "0.1s" }}
              >
                Coming Soon
              </div>

              <h1
                className="hero-rise font-[family-name:var(--font-montaga)] text-[#080808]"
                style={{
                  fontSize: "clamp(3.2rem, 6vw + 0.5rem, 5.8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  animationDelay: "0.25s",
                }}
              >
                Get early
                <br />
                access
              </h1>

              <div
                className="hero-rise w-9 h-[2.5px] bg-[#0c1320]/12 rounded-full mt-6 mb-5"
                style={{ animationDelay: "0.35s" }}
              />

              <p
                className="hero-rise text-[#1a2a35]/75 max-w-[380px]"
                style={{
                  fontSize: "clamp(0.875rem, 0.4vw + 0.75rem, 1rem)",
                  lineHeight: 1.65,
                  textWrap: "pretty",
                  animationDelay: "0.4s",
                }}
              >
                We&apos;re getting close. Sign up to get early access to Vital
                AI and start building your vital wellness.
              </p>

              <div
                className="hero-rise w-full max-w-[400px] mx-auto lg:mx-0 mt-7"
                style={{ animationDelay: "0.55s" }}
              >
                <WaitlistForm variant="split" />
              </div>

              <div
                className="hero-rise flex items-start gap-2 mt-4 justify-center lg:justify-start"
                style={{ animationDelay: "0.65s" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1a2a35]/35 flex-shrink-0 mt-[2px]"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="text-[11.5px] text-[#1a2a35]/50 leading-snug">
                  Your data is safe with us. No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div
              className="hero-rise relative flex justify-center lg:justify-end items-center"
              style={{ animationDelay: "0.5s", animationDuration: "1.4s" }}
            >
              <div className="relative w-[260px] md:w-[280px] lg:w-[310px] xl:w-[350px] lg:mb-[-40px]">
                <Image
                  src="/images/app-phone-mockup.png"
                  alt="Vital AI app showing a health report analysis and quick actions"
                  width={433}
                  height={883}
                  className="w-full h-auto"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[100px] z-20 pointer-events-none bg-gradient-to-t from-white to-transparent" />

      <style jsx>{`
        .hero-rise {
          opacity: 0;
          transform: translateY(36px);
          animation: heroRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes heroRise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-rise {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
