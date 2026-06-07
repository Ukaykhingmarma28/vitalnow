"use client";

import { useState } from "react";
import { ConsentDialog } from "./consent-dialog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({
  variant = "hero",
}: {
  variant?: "hero" | "default" | "split";
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Validate the email; only open the consent dialog when it is valid.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDialogOpen(true);
  };

  // Runs after the user accepts terms in the dialog: persist + send the email.
  const handleConfirm = async (marketingOptIn: boolean) => {
    setDialogOpen(false);
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          marketingOptIn,
          terms: true,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Request failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-3 rounded-full px-6 py-4 ${
          variant === "hero" || variant === "split"
            ? "bg-white/40 backdrop-blur-lg border border-white/50 justify-start"
            : "bg-brand/10 border border-brand/20 justify-center"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
        <p
          className={`text-sm font-medium ${
            variant === "hero" || variant === "split"
              ? "text-[#0c1320]"
              : "text-brand"
          }`}
        >
          You&apos;re on the list. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  let formEl: React.ReactNode;

  if (variant === "hero") {
    formEl = (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex items-center w-full rounded-full p-[6px]"
        style={{
          background: "rgba(255, 255, 255, 0.32)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
        id="waitlist"
      >
        <input
          type="email"
          aria-label="Email address"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          className="flex-1 bg-transparent px-5 py-3 text-[14px] text-[#0c1320] placeholder:text-[#1a2a35]/55 focus:outline-none min-w-0"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-[#0c1320] font-semibold text-[10.5px] uppercase tracking-[2px] px-6 py-3 rounded-full disabled:opacity-60 transition-shadow duration-200 cursor-pointer flex-shrink-0 shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        >
          {status === "loading" ? (
            <span className="inline-block w-4 h-4 border-2 border-[#0c1320]/20 border-t-[#0c1320] rounded-full animate-spin" />
          ) : (
            "Join Waitlist"
          )}
        </button>
      </form>
    );
  } else if (variant === "split") {
    formEl = (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 w-full"
        id="waitlist"
      >
        <div
          className="flex items-center w-full rounded-full px-5 py-1 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(69,203,253,0.3)]"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(14px) saturate(160%)",
            WebkitBackdropFilter: "blur(14px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.55)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#1a2a35]/40 flex-shrink-0"
          >
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="m2 7 10 6 10-6" />
          </svg>
          <input
            type="email"
            aria-label="Email address"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            className="flex-1 bg-transparent px-3 py-3 text-[14px] text-[#0c1320] placeholder:text-[#1a2a35]/55 focus:outline-none min-w-0"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-3 bg-[#0c1320] text-white font-semibold text-[11.5px] uppercase tracking-[1.5px] px-6 py-4 rounded-full disabled:opacity-60 transition-shadow duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.22)]"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        >
          {status === "loading" ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Join Waitlist
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>
    );
  } else {
    formEl = (
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row gap-3"
        id="waitlist-bottom"
      >
        <input
          type="email"
          aria-label="Email address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          className="flex-1 bg-bg-alt border border-border rounded-full px-5 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all duration-200"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-nav-btn text-white font-medium text-sm px-7 py-3 rounded-full hover:opacity-90 disabled:opacity-60 transition-all duration-200 cursor-pointer"
        >
          {status === "loading" ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Join Waitlist"
          )}
        </button>
      </form>
    );
  }

  return (
    <>
      {formEl}
      {error && (
        <p
          role="alert"
          className={`text-[13px] text-[#c0362c] mt-2 ${
            variant === "default" ? "text-center sm:text-left" : "pl-1"
          }`}
        >
          {error}
        </p>
      )}
      <ConsentDialog
        open={dialogOpen}
        email={email.trim()}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
