import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-canvas-night flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-semibold text-on-dark">User not found</h1>
        <p className="text-ink-mute max-w-sm mx-auto">
          This username doesn&apos;t exist on OSSfolio yet, or hasn&apos;t
          signed up.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/"
            className="text-sm underline underline-offset-4 text-ink-mute hover:text-on-dark transition-colors"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-sm underline underline-offset-4 text-ink-mute hover:text-on-dark transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
