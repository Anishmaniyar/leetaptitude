"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

interface Topic {
  id: string;
  title: string;
  description: string;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        const res = await fetch("/api/topics");
        if (!res.ok) throw new Error("Failed to load topics");
        const json = await res.json();
        if (json.success) {
          setTopics(json.data);
        } else {
          throw new Error(json.message || "Failed to load topics");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col py-12 gap-8 w-full animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-40 flex flex-col justify-between">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
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
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Practice Topics</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          Select a major category to explore subtopics and practice questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topics/${topic.id}`}>
            <Card className="cursor-pointer group hover:border-[var(--text-secondary)] transition-all h-full flex flex-col">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl group-hover:text-[var(--success)] transition-colors">
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="text-xs text-[var(--text-muted)] font-mono group-hover:text-white transition-colors mt-auto">
                  Explore Subtopics &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
