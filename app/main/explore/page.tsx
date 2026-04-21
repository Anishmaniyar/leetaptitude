"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { api } from "../../lib/mock-api";
import { TagStat } from "../../lib/types";

export default function Explore() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<TagStat[]>([]);

  useEffect(() => {
    async function loadTags() {
      try {
        setLoading(true);
        const res = await api.getTags();
        setTags(res.data);
      } catch (err: any) {
         setError(err.message || "Failed to load topics");
      } finally {
        setLoading(false);
      }
    }
    loadTags();
  }, []);

  const categorizedTags = useMemo(() => {
    const map: Record<string, TagStat[]> = {};
    for (const tag of tags) {
      if (!map[tag.category]) map[tag.category] = [];
      map[tag.category].push(tag);
    }
    return map;
  }, [tags]);

  const handleTopicClick = (tagName: string) => {
     // Optional: If you want to sync it with Zustand, you could do it here
     // By standard query parameter:
     router.push(`/practice?tag=${encodeURIComponent(tagName)}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col py-10 w-full animate-in fade-in duration-500 gap-12">
        <Skeleton className="h-12 w-64" />
        {[1, 2].map(i => (
          <div key={i} className="flex flex-col gap-6">
             <Skeleton className="h-8 w-40" />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(j => <Skeleton key={j} className="h-24 w-full" />)}
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-400">
        <h2>{error}</h2>
        <button className="button-primary mt-6" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-12 w-full animate-in fade-in duration-500 gap-12">
       {/* Header */}
       <div>
         <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Explore Topics</h1>
         <p className="text-[var(--text-muted)] text-lg">Browse curated topics across all aptitude dimensions.</p>
       </div>

       {/* Category Sections */}
       <div className="flex flex-col gap-12">
         {Object.entries(categorizedTags).map(([category, items]) => (
           <section key={category} className="flex flex-col gap-6">
             <h2 className="text-2xl font-semibold border-b border-[var(--border)] pb-3 flex items-center gap-3">
               <span className="w-2 h-6 bg-[var(--text-primary)] rounded block"></span>
               {category} Aptitude
             </h2>
             
             {/* Topic Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
               {items.map(item => (
                 <Card 
                   key={item.name} 
                   onClick={() => handleTopicClick(item.name)}
                   className="cursor-pointer group hover:border-[var(--text-primary)] transition-colors p-0 overflow-hidden"
                 >
                   <CardContent className="p-6">
                     <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-[var(--success)] transition-colors">{item.name}</h3>
                     <p className="text-sm text-[var(--text-muted)] m-0">{item.count} Questions</p>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </section>
         ))}
       </div>
    </div>
  );
}
