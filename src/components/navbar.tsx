"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "How it Works", href: "#how-it-works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  return (
    <>
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)] max-w-[1200px]"
        style={{
          top: scrolled ? 12 : 24,
          transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="relative flex items-center justify-between h-[56px] md:h-[64px] px-5 md:px-8 rounded-full overflow-hidden isolate"
          style={{
            background: "#ffffff",
            boxShadow: scrolled
              ? "0 4px 24px rgba(0,0,0,0.08)"
              : "0 2px 12px rgba(0,0,0,0.04)",
            transition: "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo - uses dark text variant for light navbar */}
          <a href="/" className="flex items-center">
            <Image
              src="/images/logo-dark.svg"
              alt="VitalNow.AI"
              width={140}
              height={30}
              className="h-[26px] md:h-[32px] w-auto"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-ink/55 hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="hidden md:inline-flex text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-300"
              style={{
                background: scrolled ? "#0c1320" : "rgba(255, 255, 255, 0.75)",
                color: scrolled ? "#ffffff" : "#0c1320",
                boxShadow: scrolled
                  ? "0 2px 12px rgba(0,0,0,0.15)"
                  : "0 1px 6px rgba(0,0,0,0.04)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Join Waitlist
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-ink/70 hover:text-ink hover:bg-white/40 transition-all duration-200 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X size={20} weight="bold" />
              ) : (
                <List size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 mx-1 rounded-2xl px-5 py-4 flex flex-col gap-1"
              style={{
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] font-medium text-ink/70 hover:text-ink py-2.5 px-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-3 border-t border-ink/8">
                <a
                  href="#waitlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center text-[13px] font-medium px-5 py-3 rounded-full bg-[#0c1320] text-white shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                >
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/10"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
