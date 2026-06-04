"use client";

import Image from "next/image";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "How it Works", href: "#how-it-works" },
];

const resourceLinks = [
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "mailto:hello@reservedaily.com" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8 px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-[5px] mb-4">
              <Image
                src="/images/logo.png"
                alt="Vital AI"
                width={30}
                height={30}
                className="rounded-md"
              />
              <span className="font-semibold text-xl text-brand tracking-tight">
                Vital AI
              </span>
            </a>
            <p className="text-ink-muted text-[13px] leading-6 max-w-[320px]">
              Your personal health intelligence assistant. Upload a blood
              report, get clinically grounded analysis, and receive a
              personalized recovery plan.
            </p>
          </div>

          {/* Main */}
          <div>
            <p className="text-ink-muted text-xs uppercase tracking-[2px] mb-4">
              Main
            </p>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink text-sm hover:text-ink-muted transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-ink-muted text-xs uppercase tracking-[2px] mb-4">
              Resources
            </p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink text-sm hover:text-ink-muted transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted text-xs">
            2025 Vital AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-ink-muted hover:text-ink transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-ink-muted hover:text-ink transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Large decorative brand text */}
        <div className="mt-16 overflow-hidden">
          <p className="text-[clamp(80px,15vw,288px)] font-[family-name:var(--font-montaga)] text-border leading-none tracking-tighter select-none">
            Vital AI
          </p>
        </div>
      </div>
    </footer>
  );
}
