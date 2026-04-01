import Link from "next/link";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center gap-6 mt-12 animate-in fade-in duration-500">
        <Badge variant="success" className="mb-4">v1.0 is Live</Badge>
        <h1 className="max-w-4xl text-5xl sm:text-6xl tracking-tight">
          Master Aptitude Fast. <br />
          <span className="text-[var(--text-muted)]">No Bullshit.</span>
        </h1>
        <p className="text-xl max-w-2xl text-[var(--text-secondary)] mt-4">
          A platform focused purely on improving speed and accuracy in aptitude solving built for ambitious candidates.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link href="/practice" className="button-primary px-8 py-3 text-lg h-14">
            Start Practicing
          </Link>
          <Link href="/login" className="button-secondary px-8 py-3 text-lg h-14">
            View Analytics
          </Link>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="flex flex-col gap-12 text-center items-center">
         <div>
            <h2 className="mb-4 text-3xl">Everything you need to succeed</h2>
            <p className="max-w-xl text-[var(--text-secondary)] mx-auto">We've stripped away the fluff and kept only what actually helps you improve your problem solving capabilities.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] mb-2">
                 <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Keyboard Driven</h3>
              <p className="text-[var(--text-muted)]">Navigate questions, select options, and submit answers entirely with your keyboard.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] mb-2">
                 <span className="text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Deep Analytics</h3>
              <p className="text-[var(--text-muted)]">Track accuracy by category, monitor your streak, and identify weak points automatically.</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] mb-2">
                 <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Targeted Practice</h3>
              <p className="text-[var(--text-muted)]">Filter an extensive question bank by specific topics and difficulties to patch gaps.</p>
            </div>
         </div>
      </section>

      {/* Expanded How It Works / Bento Grid */}
      <section className="flex flex-col gap-12 mb-12">
        <div className="text-center">
          <h2 className="text-3xl">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Box 1 (Large) */}
          <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--success)]">1. Setup Your Drill</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Quickly narrow down by Category, Difficulty, or specific Tags. Spend zero time looking for what to solve next.</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="px-4 py-2">Quant</Badge>
                <Badge className="px-4 py-2">Logical Reasoning</Badge>
                <Badge className="px-4 py-2" variant="error">Hard</Badge>
                <Badge className="px-4 py-2">Time & Work</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Box 2 (Standard) */}
          <Card className="md:col-span-2 bg-[var(--bg-secondary)] relative overflow-hidden group">
            <CardHeader>
              <CardTitle className="text-xl flex justify-between items-center">
                 2. Instant Feedback Loop
                 <span className="text-sm px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded font-mono text-white group-hover:bg-white group-hover:text-black transition-colors">Enter</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get immediate explanations post-submission to fix mistakes instantly. No waiting until the end of a long test.</p>
            </CardContent>
          </Card>

          {/* Box 3 (Small) */}
          <Card className="flex flex-col justify-center items-center text-center">
             <CardContent className="p-0">
               <span className="text-4xl font-bold text-white block mb-2">12</span>
               <span className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Daily Streak</span>
             </CardContent>
          </Card>

          {/* Box 4 (Small) */}
          <Card className="flex flex-col justify-center items-center text-center">
             <CardContent className="p-0">
               <span className="text-4xl font-bold text-[var(--success)] block mb-2">83%</span>
               <span className="text-sm text-[var(--text-muted)] uppercase tracking-wide">Avg Accuracy</span>
             </CardContent>
          </Card>

          {/* Box 5 (Wide Bottom) */}
          <Card className="md:col-span-4 flex flex-col md:flex-row justify-between items-center border-[var(--success)] bg-[rgba(34,197,94,0.02)]">
            <CardContent className="p-8 w-full flex flex-col md:flex-row justify-between items-center text-center md:text-left">
               <div>
                  <h3 className="text-2xl text-white font-bold mb-2">Ready to improve?</h3>
                  <p className="text-[var(--text-secondary)] m-0">Join thousands of candidates passing their aptitude rounds.</p>
               </div>
               <Link href="/signup" className="button-primary px-8 py-3 text-lg mt-6 md:mt-0 whitespace-nowrap">
                  Create Free Account
               </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-sm border-t border-[var(--border)] text-[var(--text-muted)]">
        <p>&copy; {new Date().getFullYear()} LeetAptitude. Minimal & Fast.</p>
      </footer>
    </div>
  );
}
