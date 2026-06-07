"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, X } from "@phosphor-icons/react";

/**
 * Consent dialog shown after a valid email is entered in the waitlist form.
 * Terms acceptance is required to confirm; marketing opt-in is optional.
 * Light theme, brand-cyan accent, navy primary action.
 */
export function ConsentDialog({
  open,
  email,
  onClose,
  onConfirm,
}: {
  open: boolean;
  email: string;
  onClose: () => void;
  onConfirm: (marketingOptIn: boolean) => void;
}) {
  // Portal to <body> so an ancestor `transform` (the form's reveal-animation
  // wrappers) can't trap the fixed overlay inside the form box.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <ConsentDialogPanel
          email={email}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </AnimatePresence>,
    document.body
  );
}

// Mounted only while open, so the checkbox choices reset naturally on each open.
function ConsentDialogPanel({
  email,
  onClose,
  onConfirm,
}: {
  email: string;
  onClose: () => void;
  onConfirm: (marketingOptIn: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [agree, setAgree] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Escape to close + body scroll lock while mounted (DOM side effects only).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020c13]/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        className="relative w-full max-w-[440px] bg-white rounded-[20px] p-7 md:p-8 shadow-[0_30px_80px_-20px_rgba(8,40,80,0.35)]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-ink/50 hover:text-ink hover:bg-bg-alt transition-colors duration-200 cursor-pointer"
        >
          <X size={18} weight="bold" />
        </button>

        <h2
          id="consent-title"
          className="font-display text-[26px] md:text-[28px] text-[#000e51] leading-tight tracking-[-0.5px] pr-8"
        >
          Confirm your spot
        </h2>
        <p className="text-ink-muted text-sm mt-2 leading-relaxed">
          We&apos;ll send early access to{" "}
          <span className="text-ink font-medium break-all">{email}</span>.
        </p>

        <div className="mt-6 flex flex-col gap-3.5">
          <Checkbox checked={agree} onChange={setAgree}>
            I agree to the{" "}
            <a
              href="#"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-brand underline underline-offset-2 hover:opacity-80"
            >
              Privacy Policy
            </a>
            .
          </Checkbox>
          <Checkbox checked={marketing} onChange={setMarketing}>
            Send me product updates and health tips by email. You can
            unsubscribe anytime.
          </Checkbox>
        </div>

        <button
          type="button"
          disabled={!agree}
          onClick={() => onConfirm(marketing)}
          className="mt-7 w-full flex items-center justify-center bg-[#0c1320] text-white text-[13px] font-semibold uppercase tracking-[1.5px] px-6 py-4 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-[0_6px_28px_rgba(0,0,0,0.22)] enabled:active:scale-[0.98]"
        >
          Join Waitlist
        </button>
      </motion.div>
    </motion.div>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[6px] border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 peer-focus-visible:ring-offset-1 ${
          checked ? "bg-brand border-brand" : "bg-white border-ink/25"
        }`}
      >
        {checked && <Check size={13} weight="bold" className="text-[#0c1320]" />}
      </span>
      <span className="text-[13px] text-ink-body leading-relaxed">
        {children}
      </span>
    </label>
  );
}
