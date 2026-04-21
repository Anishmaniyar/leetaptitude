"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent } from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { usePracticeStore } from "../../store/usePracticeStore";

export default function PracticeList() {
  const { 
    questions, 
    isLoading, 
    error,
    categoryFilter, 
    difficultyFilter, 
    setCategoryFilter, 
    setDifficultyFilter,
    fetchQuestions 
  } = usePracticeStore();

  useEffect(() => {
    fetchQuestions();
  }, [categoryFilter, difficultyFilter]); // fetch when filters change

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      {/* Sidebar / Filters */}
      <aside className="w-full md:w-64 flex flex-col gap-6">
        <div>
          <h3 className="text-lg mb-3">Category</h3>
          <div className="flex flex-col gap-2">
            {['', 'Quant', 'Logical', 'Verbal', 'DI'].map(cat => (
              <button 
                key={cat || "all"}
                className={`text-left px-3 py-2 rounded-md transition-colors ${categoryFilter === cat ? 'bg-[var(--bg-tertiary)] text-white' : 'hover:bg-[var(--bg-secondary)]'}`}
                onClick={() => setCategoryFilter(cat as any)}
              >
                {cat || 'All Categories'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-3">Difficulty</h3>
          <div className="flex flex-col gap-2">
            {['', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button 
                key={diff || "all"}
                className={`text-left px-3 py-2 rounded-md transition-colors ${difficultyFilter === diff ? 'bg-[var(--bg-tertiary)] text-white' : 'hover:bg-[var(--bg-secondary)]'}`}
                onClick={() => setDifficultyFilter(diff as any)}
              >
                {diff || 'All Difficulties'}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        {error ? (
          <div className="p-6 border border-red-500/30 bg-red-500/10 text-red-400 rounded-xl text-center">
            {error} <br/>
            <button className="text-white mt-4 underline" onClick={fetchQuestions}>Try again</button>
          </div>
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <CardContent className="p-6 flex flex-col gap-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-2">
                   <Skeleton className="h-5 w-16" />
                   <Skeleton className="h-5 w-20" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : questions.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]">
            <h3 className="text-white mb-2">No questions found</h3>
            <p>Try adjusting your category or difficulty filters.</p>
          </div>
        ) : (
          questions.map(q => (
            <Card key={q.id} className="p-0 overflow-hidden group hover:border-[var(--text-secondary)] transition-colors cursor-pointer">
              <Link href={`/practice/${q.id}`} className="block p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg group-hover:text-[var(--text-primary)] transition-colors">{q.title}</h3>
                  <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Hard' ? 'error' : 'default'}>
                    {q.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm flex-wrap">
                  <Badge className="bg-[var(--bg-primary)]">{q.category}</Badge>
                  {q.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[var(--text-muted)]">#{tag}</span>
                  ))}
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
