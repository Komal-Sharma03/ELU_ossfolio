"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export function AuthModal({ open, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #dfdfdf",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#171717",
    outline: "none",
    backgroundColor: "#ffffff",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-md"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #ededed",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
          padding: "32px",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 transition-colors"
          style={{ color: "#9a9a9a" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#171717")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9a9a")}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2
            className="text-xl font-semibold"
            style={{ color: "#171717", letterSpacing: "-0.3px" }}
          >
            {mode === "signin" ? "Welcome back" : "Create your profile"}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "#707070" }}>
            {mode === "signin"
              ? "Sign in to access your OSSfolio profile."
              : "Sign up and showcase your open-source journey."}
          </p>
        </div>

        {/* GitHub OAuth */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-2.5 text-sm font-medium transition-colors"
          style={{
            padding: "9px 16px",
            border: "1px solid #dfdfdf",
            borderRadius: "6px",
            color: "#171717",
            backgroundColor: "#ffffff",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1" style={{ height: "1px", backgroundColor: "#ededed" }} />
          <span className="text-xs" style={{ color: "#9a9a9a" }}>or</span>
          <div className="flex-1" style={{ height: "1px", backgroundColor: "#ededed" }} />
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3"
        >
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: "#171717" }}>
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3ecf8e")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#dfdfdf")}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#171717" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3ecf8e")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#dfdfdf")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#171717" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3ecf8e")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#dfdfdf")}
            />
          </div>

          <button
            type="submit"
            className="mt-1 w-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#3ecf8e",
              color: "#171717",
              padding: "9px 16px",
              borderRadius: "6px",
            }}
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="mt-5 text-center text-sm" style={{ color: "#707070" }}>
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-medium underline"
            style={{ color: "#171717" }}
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
