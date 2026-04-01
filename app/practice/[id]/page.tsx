"use client";

import { useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "../../../components/ui/Badge";
import { Card, CardContent } from "../../../components/ui/Card";
import { Skeleton } from "../../../components/ui/Skeleton";
import { api } from "../../../lib/mock-api";
import { Question } from "../../../lib/types";
import { usePracticeStore } from "../../../store/usePracticeStore";

export default function SolveQuestion({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [numericAnswer, setNumericAnswer] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [result, setResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const numericInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadQuestion() {
      setLoading(true);
      try {
        const res = await api.getQuestionById(resolvedParams.id);
        setQuestion(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load question");
      } finally {
        setLoading(false);
      }
    }
    loadQuestion();
  }, [resolvedParams.id]);

  useEffect(() => {
    if (result || !question || question.type !== 'mcq') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      
      const key = e.key;
      // Map 1-4 to options
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key) - 1;
        if (question.options && question.options[index]) {
          setSelectedOption(question.options[index].id);
        }
      }
      
      if (key === "Enter" && selectedOption) {
        handleSubmit();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, selectedOption, result]);

  const handleSubmit = async () => {
    if (!question) return;
    const answer = question.type === 'mcq' ? selectedOption : numericAnswer;
    if (!answer) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitAttempt(question.id, answer);
      setResult(res.data);
    } catch (err: any) {
      alert(err.message || "Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    // Basic router push back to practice list for now. 
    // Usually we would fetch the next ID from the store.
    router.push("/practice");
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto w-full py-12 flex flex-col gap-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Card className="mt-8">
          <CardContent className="p-8 flex flex-col gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <div className="mt-8 flex flex-col gap-3">
              {[1, 2, 3, 4].map(v => <Skeleton key={v} className="h-12 w-full" />)}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="max-w-3xl mx-auto w-full py-20 text-center">
        <h2 className="text-red-500 mb-4">Error loading question</h2>
        <p>{error}</p>
        <button className="button-primary mt-6" onClick={() => router.push("/practice")}>
          Back to Practice
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge variant={question.difficulty === 'Easy' ? 'success' : question.difficulty === 'Hard' ? 'error' : 'default'}>
            {question.difficulty}
          </Badge>
          <Badge className="bg-[var(--bg-tertiary)]">{question.category}</Badge>
        </div>
        <h1 className="text-3xl">{question.title}</h1>
        <div className="flex gap-2">
          {question.tags.map(tag => (
             <span key={tag} className="text-sm text-[var(--text-muted)]">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="p-2 sm:p-4">
        <CardContent className="p-4 sm:p-6 text-lg leading-relaxed text-[var(--text-primary)]">
          {question.description}
        </CardContent>
      </Card>

      {/* Options */}
      <div className="flex flex-col gap-4">
        {question.type === 'mcq' ? (
          question.options?.map((opt, index) => {
            const isSelected = selectedOption === opt.id;
            let stateClass = "border-[var(--border)] hover:bg-[var(--bg-secondary)]";
            
            if (result) {
               if (opt.isCorrect) {
                 stateClass = "bg-green-500/10 border-green-500 text-green-400";
               } else if (isSelected && !opt.isCorrect) {
                 stateClass = "bg-red-500/10 border-red-500 text-red-400";
               } else {
                 stateClass = "opacity-50 border-[var(--border)]";
               }
            } else if (isSelected) {
               stateClass = "bg-[var(--bg-tertiary)] border-[var(--text-secondary)]";
            }

            return (
              <button 
                key={opt.id}
                onClick={() => !result && setSelectedOption(opt.id)}
                disabled={!!result}
                className={`flex items-center p-4 rounded-xl border transition-all text-left ${stateClass}`}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-[var(--bg-primary)] rounded-md font-mono mr-4 border border-[var(--border)]">
                  {index + 1}
                </span>
                <span className="flex-1">{opt.text}</span>
              </button>
            )
          })
        ) : (
          <div className="flex flex-col gap-4 max-w-sm">
             <input 
               ref={numericInputRef}
               type="number" 
               className="input text-lg py-3" 
               placeholder="Enter numerical answer..."
               value={numericAnswer}
               onChange={e => setNumericAnswer(e.target.value)}
               disabled={!!result}
             />
             {!result && (
               <p className="text-sm pl-2 text-[var(--text-muted)]">Press Enter to submit</p>
             )}
          </div>
        )}
      </div>

      {/* Footer / Status */}
      {result ? (
        <Card className={`mt-4 border-2 p-6 animate-in slide-in-from-bottom-4 fade-in duration-300 ${result.isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
          <h3 className={`text-xl mb-2 ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {result.isCorrect ? "Correct!" : "Incorrect"}
          </h3>
          <p className="text-[var(--text-primary)] mb-6">{result.explanation}</p>
          <button className="button-primary px-8" onClick={handleNextQuestion}>
            Next Question
          </button>
        </Card>
      ) : (
        <div className="flex items-center gap-4 mt-4">
          <button 
            className="button-primary px-8 py-3"
            onClick={handleSubmit}
            disabled={isSubmitting || (question.type === 'mcq' ? !selectedOption : !numericAnswer)}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </button>
          {question.type === 'mcq' && (
             <span className="text-sm text-[var(--text-muted)]">Or press <kbd className="font-mono bg-[var(--bg-secondary)] px-2 py-1 rounded">Enter</kbd></span>
          )}
        </div>
      )}
    </div>
  );
}
