"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  title: string;
  type: string;
  subtopicId: string;
  options?: Option[];
}

interface Pagination {
  page: number;
  limit: number;
  totalQuestions: number;
  totalPages: number;
}

interface AttemptResult {
  isCorrect: boolean;
  explanation: string;
}

export default function PracticePage({ params }: { params: Promise<{ subtopicId: string }> }) {
  const resolvedParams = use(params);
  const { subtopicId } = resolvedParams;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Practice state
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({}); // questionId -> optionId
  const [numericAnswers, setNumericAnswers] = useState<Record<string, string>>({}); // questionId -> numericString
  const [submissions, setSubmissions] = useState<Record<string, AttemptResult>>({}); // questionId -> result
  const [submittingStatus, setSubmittingStatus] = useState<Record<string, boolean>>({}); // questionId -> isSubmitting

  const listContainerRef = useRef<HTMLDivElement>(null);
  const numericInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Fetch Questions
  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/questions?subtopicId=${subtopicId}&page=${page}&limit=5`);
        if (!res.ok) throw new Error("Failed to load questions");
        const json = await res.json();
        if (json.success) {
          setQuestions(json.data.questions);
          setPagination(json.data.pagination);
          setActiveIndex(0);
        } else {
          throw new Error(json.message || "Failed to load questions");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (subtopicId) {
      loadQuestions();
    }
  }, [subtopicId, page]);

  // Keyboard Shortcuts Navigation
  useEffect(() => {
    if (loading || error || questions.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input, ignore navigation keys, but keep Enter for submission
      const activeElement = document.activeElement;
      const isInputActive = activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");

      if (isInputActive && e.key !== "Enter") {
        return;
      }

      const activeQuestion = questions[activeIndex];
      if (!activeQuestion) return;

      const isMCQ = activeQuestion.type === "MCQ";
      const hasSubmitted = !!submissions[activeQuestion.id];

      // J/K or Arrow Down/Up for navigation
      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, questions.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      // 1-4 keys for MCQ selection
      if (!hasSubmitted && isMCQ && ["1", "2", "3", "4"].includes(e.key)) {
        const optionIndex = parseInt(e.key) - 1;
        if (activeQuestion.options && activeQuestion.options[optionIndex]) {
          const optId = activeQuestion.options[optionIndex].id;
          setSelectedOptions((prev) => ({ ...prev, [activeQuestion.id]: optId }));
        }
      }

      // Enter key for submission
      if (e.key === "Enter") {
        if (!hasSubmitted) {
          const draftMCQ = selectedOptions[activeQuestion.id];
          const draftNum = numericAnswers[activeQuestion.id];
          if (isMCQ ? draftMCQ : draftNum) {
            submitAnswer(activeQuestion.id, activeQuestion.type);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [questions, activeIndex, loading, error, selectedOptions, numericAnswers, submissions]);

  // Scroll active question into view
  useEffect(() => {
    const activeEl = document.getElementById(`question-card-${activeIndex}`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Auto-focus input if NUMERIC is active
    const activeQuestion = questions[activeIndex];
    if (activeQuestion && activeQuestion.type === "NUMERIC" && !submissions[activeQuestion.id]) {
      const inputEl = numericInputRefs.current[activeQuestion.id];
      if (inputEl) {
        inputEl.focus();
      }
    }
  }, [activeIndex, questions, submissions]);

  // Submit Answer Action
  const submitAnswer = async (qId: string, qType: string) => {
    if (submittingStatus[qId] || submissions[qId]) return;

    setSubmittingStatus((prev) => ({ ...prev, [qId]: true }));
    try {
      const body: any = {
        questionId: qId,
        type: qType,
      };

      if (qType === "MCQ") {
        body.selectedOptionId = selectedOptions[qId];
      } else {
        body.numericAnswer = parseFloat(numericAnswers[qId]);
      }

      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Submission failed");
      const json = await res.json();
      if (json.success) {
        setSubmissions((prev) => ({
          ...prev,
          [qId]: {
            isCorrect: json.data.isCorrect,
            explanation: json.data.explanation,
          },
        }));
      } else {
        throw new Error(json.message || "Failed to submit");
      }
    } catch (err: any) {
      alert(err.message || "Failed to record attempt");
    } finally {
      setSubmittingStatus((prev) => ({ ...prev, [qId]: false }));
    }
  };

  if (loading && questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto w-full py-12 flex flex-col gap-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Card className="mt-8">
          <CardContent className="p-8 flex flex-col gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full mt-4" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto w-full py-20 text-center">
        <h2 className="text-red-500 mb-4">Error loading questions</h2>
        <p className="text-[var(--text-secondary)]">{error}</p>
        <Link href="/topics" className="button-primary mt-6">
          Back to Topics
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Link href="/topics" className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
            &larr; Back to Topics
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Solve Questions</h1>
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <span>Active Subtopic Questions</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border)]">
            <kbd className="font-mono bg-[var(--bg-tertiary)] px-1 rounded">▲</kbd>/
            <kbd className="font-mono bg-[var(--bg-tertiary)] px-1 rounded">▼</kbd> or 
            <kbd className="font-mono bg-[var(--bg-tertiary)] px-1 rounded">J</kbd>/
            <kbd className="font-mono bg-[var(--bg-tertiary)] px-1 rounded">K</kbd> to navigate
          </span>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="p-12 text-center text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)]">
          <h3 className="text-white mb-2">No questions found</h3>
          <p>This subtopic does not have any questions seeded yet.</p>
        </div>
      ) : (
        <div ref={listContainerRef} className="flex flex-col gap-8">
          {questions.map((q, idx) => {
            const isActive = idx === activeIndex;
            const isMCQ = q.type === "MCQ";
            const answerSelected = selectedOptions[q.id];
            const answerTyped = numericAnswers[q.id];
            const isSubmitting = submittingStatus[q.id];
            const result = submissions[q.id];

            return (
              <div
                key={q.id}
                id={`question-card-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-2xl border ${
                  isActive
                    ? "border-[var(--text-secondary)] bg-[var(--bg-secondary)] shadow-lg"
                    : "border-[var(--border)] bg-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <div className="p-6 flex flex-col gap-6">
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Question {idx + 1 + (page - 1) * (pagination?.limit || 5)}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="default">{q.type}</Badge>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg font-medium leading-relaxed text-white">
                    {q.title}
                  </h3>

                  {/* Options Input Block */}
                  <div className="flex flex-col gap-3">
                    {isMCQ ? (
                      q.options?.map((opt, index) => {
                        const isSelected = selectedOptions[q.id] === opt.id;
                        let optClass = "border-[var(--border)] hover:bg-[var(--bg-tertiary)]";

                        if (result) {
                          if (opt.isCorrect) {
                            optClass = "bg-green-500/10 border-green-500 text-green-400 font-semibold";
                          } else if (isSelected) {
                            optClass = "bg-red-500/10 border-red-500 text-red-400";
                          } else {
                            optClass = "opacity-40 border-[var(--border)]";
                          }
                        } else if (isSelected) {
                          optClass = "bg-[var(--bg-tertiary)] border-[var(--text-secondary)] text-white";
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={!!result}
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [q.id]: opt.id }))}
                            className={`flex items-center p-4 rounded-xl border transition-all text-left w-full ${optClass}`}
                          >
                            <span className="w-7 h-7 flex items-center justify-center bg-[var(--bg-primary)] rounded-md font-mono mr-4 border border-[var(--border)] text-sm">
                              {index + 1}
                            </span>
                            <span className="flex-1 text-sm">{opt.text}</span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="flex flex-col gap-2 max-w-xs">
                        <input
                          ref={(el) => {
                            numericInputRefs.current[q.id] = el;
                          }}
                          type="number"
                          disabled={!!result}
                          placeholder="Type your number answer..."
                          className="input py-2.5 text-sm"
                          value={numericAnswers[q.id] || ""}
                          onChange={(e) => setNumericAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submission Details & Actions */}
                  {result ? (
                    <div
                      className={`p-4 rounded-xl border animate-in slide-in-from-top-2 duration-300 ${
                        result.isCorrect
                          ? "border-green-500/30 bg-green-500/5 text-green-400"
                          : "border-red-500/30 bg-red-500/5 text-red-400"
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-1">
                        {result.isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed m-0">
                        <span className="font-semibold text-white block mb-1">Explanation:</span>
                        {result.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        className="button-primary text-xs py-2 px-5"
                        disabled={isSubmitting || (isMCQ ? !answerSelected : !answerTyped)}
                        onClick={() => submitAnswer(q.id, q.type)}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Answer"}
                      </button>
                      {isActive && (
                        <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                          Or press <kbd className="font-mono bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded border border-[var(--border)]">Enter</kbd>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-[var(--border)]">
              <button
                className="button-secondary text-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                &larr; Previous Page
              </button>
              <span className="text-sm text-[var(--text-muted)]">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                className="button-secondary text-sm"
                disabled={page === pagination.totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
              >
                Next Page &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
