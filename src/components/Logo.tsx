import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative h-5 w-5 text-white"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-semibold tracking-tight text-white">
          Rankova
        </span>
      )}
    </Link>
  );
}
