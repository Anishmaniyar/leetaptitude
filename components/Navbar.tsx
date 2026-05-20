import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-[60px] bg-[var(--bg-primary)] border-b border-[var(--border)] sticky top-0 z-50 flex justify-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-[var(--success)]">/{'>'}</span> LeetAptitude
        </Link>
        
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/topics" className="text-sm font-medium hover:text-white transition-colors block">
            Topics
          </Link>
          <Link href="/stats" className="text-sm font-medium hover:text-white transition-colors block">
            Stats
          </Link>
          <Link href="/recent" className="text-sm font-medium hover:text-white transition-colors block">
            Recent Activity
          </Link>
        </div>
      </div>
    </nav>
  );
}
