"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

interface Stats {
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to load stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        } else {
          throw new Error(json.message || "Failed to load stats");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 flex flex-col justify-center items-center text-center">
              <CardContent className="p-0">
                <Skeleton className="h-8 w-24 mb-2 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-[var(--error)] max-w-md mx-auto">
        <h2 className="text-2xl mb-4">Error</h2>
        <p className="mb-6">{error}</p>
        <button
          className="button-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const hasAttempts = stats && stats.totalAttempts > 0;

  return (
    <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Practice Statistics</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Track your learning progress and problem-solving accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Accuracy */}
        <Card className="flex flex-col justify-center items-center text-center p-8 bg-[rgba(34,197,94,0.02)] border-[var(--success)]">
          <CardContent className="p-0">
            <span className="text-5xl font-extrabold text-[var(--success)] block mb-2">
              {stats ? `${stats.accuracy}%` : "0%"}
            </span>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide font-mono">
              Average Accuracy
            </span>
          </CardContent>
        </Card>

        {/* Total Solved */}
        <Card className="flex flex-col justify-center items-center text-center p-8">
          <CardContent className="p-0">
            <span className="text-5xl font-extrabold text-white block mb-2">
              {stats ? stats.correctAttempts : 0}
            </span>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide font-mono">
              Solved Questions
            </span>
          </CardContent>
        </Card>

        {/* Total Attempts */}
        <Card className="flex flex-col justify-center items-center text-center p-8">
          <CardContent className="p-0">
            <span className="text-5xl font-extrabold text-white block mb-2">
              {stats ? stats.totalAttempts : 0}
            </span>
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide font-mono">
              Total Attempts
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Progress feedback */}
      <Card className="p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0 leading-relaxed text-sm text-[var(--text-secondary)]">
          {hasAttempts ? (
            <div className="flex flex-col gap-4">
              <p>
                You have completed <strong className="text-white">{stats.totalAttempts}</strong> attempts so far, answering <strong className="text-white">{stats.correctAttempts}</strong> questions correctly. Your overall accuracy rate is <strong className="text-[var(--success)]">{stats.accuracy}%</strong>.
              </p>
              {/* Accuracy progress bar */}
              <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-3 overflow-hidden border border-[var(--border)] mt-2">
                <div
                  className="bg-correct h-full transition-all duration-500"
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">
                You haven't solved any questions yet! Start practicing now to see your stats update in real-time.
              </p>
              <Link href="/topics" className="button-primary text-xs">
                Browse Topics
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
