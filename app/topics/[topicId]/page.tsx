"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

interface Subtopic {
  id: string;
  title: string;
  description: string;
  topicId: string;
}

export default function SubtopicsPage({ params }: { params: Promise<{ topicId: string }> }) {
  const resolvedParams = use(params);
  const { topicId } = resolvedParams;

  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubtopics() {
      try {
        setLoading(true);
        const res = await fetch(`/api/subtopics?topicId=${topicId}`);
        if (!res.ok) throw new Error("Failed to load subtopics");
        const json = await res.json();
        if (json.success) {
          setSubtopics(json.data);
        } else {
          throw new Error(json.message || "Failed to load subtopics");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (topicId) {
      fetchSubtopics();
    }
  }, [topicId]);

  if (loading) {
    return (
      <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-36 flex flex-col justify-between">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/2 mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
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
        <div className="flex items-center gap-2 mb-3">
          <Link href="/topics" className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
            &larr; Back to Topics
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Subtopics</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Choose a subtopic to start solving practice questions.
        </p>
      </div>

      {subtopics.length === 0 ? (
        <div className="p-12 text-center text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]">
          <h3 className="text-white mb-2">No subtopics found</h3>
          <p>This topic does not have any subtopics yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subtopics.map((subtopic) => (
            <Link key={subtopic.id} href={`/practice/${subtopic.id}`}>
              <Card className="cursor-pointer group hover:border-[var(--text-secondary)] transition-all h-full flex flex-col justify-between p-6">
                <div>
                  <h3 className="font-semibold text-xl text-white mb-2 group-hover:text-[var(--success)] transition-colors">
                    {subtopic.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {subtopic.description}
                  </p>
                </div>
                <div className="text-xs text-[var(--text-muted)] font-mono group-hover:text-white transition-colors mt-4">
                  Start Solving &rarr;
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
