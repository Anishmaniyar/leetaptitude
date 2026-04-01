import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-[60px] bg-[var(--bg-primary)] border-b border-[var(--border)] sticky top-0 z-50 flex justify-center">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-[var(--success)]">/{'>'}</span> LeetAptitude
        </Link>
        
        <div className="flex items-center gap-8">
          <Link href="/explore" className="text-sm font-medium hover:text-white transition-colors block">
            Explore
          </Link>
          <Link href="/practice" className="text-sm font-medium hover:text-white transition-colors block">
            Practice
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-white transition-colors hidden sm:block">
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup" className="button-primary text-sm px-4 py-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
