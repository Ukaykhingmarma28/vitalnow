"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { List, X, ArrowRight } from "@phosphor-icons/react";

const links = [
  { label: "Features", href: "#features", id: "features" },
  { label: "How it Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Security", href: "#security", id: "security" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  // Active-section tracking — drives the sliding indicator. IntersectionObserver
  // instead of a scroll listener so it stays off the main thread.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pillTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  return (
    <>
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)]"
        style={{
          top: scrolled ? 12 : 20,
          maxWidth: scrolled ? 880 : 1200,
          transition:
            "top 550ms cubic-bezier(0.16,1,0.3,1), max-width 550ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/*
          Frosted-glass capsule — web glassmorphism approximation
          (backdrop-filter + layered border + inner highlight), not official
          Apple Liquid Glass. Base fill stays opaque enough to read without blur.
        */}
        <div
          className="relative flex items-center justify-between h-[58px] md:h-[64px] pl-5 pr-2.5 md:pl-7 md:pr-3 rounded-full isolate"
          style={{
            // Top of page: solid white pill. On scroll: morph into a contracted
            // frosted-glass capsule (web glassmorphism approximation, not official
            // Apple Liquid Glass). Base fill stays opaque enough to read without
            // blur support.
            background: scrolled ? "rgba(255,255,255,0.72)" : "#ffffff",
            backdropFilter: scrolled ? "blur(20px) saturate(170%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(170%)" : "none",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.65)"
              : "1px solid rgba(2,12,19,0.06)",
            boxShadow: scrolled
              ? "0 10px 36px rgba(2,12,19,0.10), inset 0 1px 0 rgba(255,255,255,0.7)"
              : "0 6px 24px rgba(2,12,19,0.07)",
            transition:
              "background 550ms cubic-bezier(0.16,1,0.3,1), border 550ms cubic-bezier(0.16,1,0.3,1), box-shadow 550ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="VitalNow.AI home">
            <Image
              src="/images/logo-vital.svg"
              alt="VitalNow.AI"
              width={138}
              height={30}
              className="h-[26px] md:h-[30px] w-auto"
              priority
            />
          </Link>

          {/* Desktop links with sliding active indicator */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200"
                  style={{ color: active ? "#000e51" : "rgba(10,10,10,0.55)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={pillTransition}
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "rgba(69,203,253,0.16)" }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#waitlist"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium pl-5 pr-4 py-2.5 rounded-full text-white group"
              style={{
                background: "#000e51",
                boxShadow: "0 4px 16px rgba(0,14,81,0.28)",
              }}
            >
              Join Waitlist
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-ink/70 hover:text-ink hover:bg-white/50 transition-colors duration-200 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={20} weight="bold" />
              ) : (
                <List size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-2.5 rounded-3xl p-3 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow:
                  "0 12px 40px rgba(2,12,19,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.05 + i * 0.05, duration: 0.3 }}
                  className="flex items-center justify-between text-[15px] font-medium text-ink/75 hover:text-ink py-3.5 px-4 rounded-2xl hover:bg-brand/10 transition-colors duration-200"
                  style={
                    activeId === link.id
                      ? { color: "#000e51", background: "rgba(69,203,253,0.12)" }
                      : undefined
                  }
                >
                  {link.label}
                  <ArrowRight size={15} weight="bold" className="text-ink/30" />
                </motion.a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 text-[14px] font-medium px-5 py-3.5 rounded-2xl text-white"
                style={{
                  background: "#000e51",
                  boxShadow: "0 4px 16px rgba(0,14,81,0.28)",
                }}
              >
                Join Waitlist
                <ArrowRight size={15} weight="bold" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#020c13]/15 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
