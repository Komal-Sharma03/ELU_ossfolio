/**
 * src/app/not-found.tsx
 *
 * Global 404 fallback for any unmatched route across the app (the per-profile
 * 404 lives at src/app/[username]/not-found.tsx). Inline styles only - no
 * Tailwind layout/color classes - using the DESIGN.md palette:
 *   canvas #ffffff | ink #171717 | ink-mute #707070 | primary #3ecf8e
 *
 * Rules: inline styles only, no Tailwind, no TypeScript errors. (Issue #41)
 */

import Link from "next/link";
import type { CSSProperties } from "react";

const primaryButton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "130px",
  padding: "10px 28px",
  borderRadius: "8px",
  backgroundColor: "#3ecf8e",
  color: "#171717",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
};

export default function NotFound() {
  return (
    <main
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <p
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1,
            color: "#3ecf8e",
          }}
        >
          404
        </p>
        <h1
          style={{
            marginTop: "16px",
            fontSize: "24px",
            fontWeight: 600,
            color: "#171717",
          }}
        >
          Page not found
        </h1>
        <p style={{ marginTop: "12px", fontSize: "16px", color: "#707070" }}>
          The page you are looking for does not exist or may have moved.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}>
          <Link href="/" style={primaryButton}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
