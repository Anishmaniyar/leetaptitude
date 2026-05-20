"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

interface Attempt {
  id: string;
  questionTitle: string;
  isCorrect: boolean;
  timestamp: string;
}

export default function RecentPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAttempts() {
      try {
        setLoading(true);
        const res = await fetch("/api/recent-attempts");
        if (!res.ok) throw new Error("Failed to load recent attempts");
        const json = await res.json();
        if (json.success) {
          setAttempts(json.data);
        } else {
          throw new Error(json.message || "Failed to load recent attempts");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchAttempts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex flex-col gap-2 w-2/3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-16 rounded-full" />
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

  return (
    <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Recent Activity</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Your complete history of submitted answers and practice results.
        </p>
      </div>

      {attempts.length === 0 ? (
        <div className="p-12 text-center text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]">
          <h3 className="text-white mb-2">No activity recorded</h3>
          <p className="mb-6">You haven't attempted any questions yet.</p>
          <Link href="/topics" className="button-primary text-xs">
            Start Practicing
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {attempts.map((attempt) => (
            <Card key={attempt.id} className="p-0 overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)]">
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {attempt.questionTitle}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    Attempted on: {new Date(attempt.timestamp).toLocaleString()}
                  </span>
                </div>
                <div>
                  <Badge variant={attempt.isCorrect ? "success" : "error"} className="px-3.5 py-1 text-xs">
                    {attempt.isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
