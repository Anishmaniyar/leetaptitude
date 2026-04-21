"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { api } from "../../lib/mock-api";
import { UserProfile, UserStats, HeatmapItem, CategoryStat, ActivityItem } from "../../lib/types";

const heatmapCss = `
  .react-calendar-heatmap text { font-size: 10px; fill: var(--text-muted); }
  .react-calendar-heatmap .color-empty { fill: var(--bg-tertiary); }
  .react-calendar-heatmap .color-scale-1 { fill: rgba(34, 197, 94, 0.4); }
  .react-calendar-heatmap .color-scale-2 { fill: rgba(34, 197, 94, 0.6); }
  .react-calendar-heatmap .color-scale-3 { fill: rgba(34, 197, 94, 0.8); }
  .react-calendar-heatmap .color-scale-4 { fill: rgba(34, 197, 94, 1); }
`;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapItem[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        const [profileRes, statsRes, heatmapRes, catRes, actRes] = await Promise.all([
           api.getProfile(),
           api.getStats(),
           api.getHeatmap(),
           api.getCategoryStats(),
           api.getActivity()
        ]);
        setProfile(profileRes.data);
        setStats(statsRes.data);
        setHeatmap(heatmapRes.data);
        setCategoryStats(catRes.data);
        setActivity(actRes.data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8 py-10 w-full animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-6">
           <Skeleton className="h-40 w-full md:w-1/3" />
           <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
           </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !profile || !stats) {
    return (
      <div className="py-20 text-center text-red-400">
        <h2>{error || "Unknown Error"}</h2>
        <button className="button-primary mt-6" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const today = new Date();

  return (
    <div className="flex flex-col gap-10 py-10 w-full animate-in fade-in duration-500">
      <style>{heatmapCss}</style>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6">
         {/* Profile Card */}
         <Card className="md:w-1/3 flex flex-col justify-center items-center text-center p-6">
            <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-full mb-4 flex items-center justify-center text-2xl font-bold border border-[var(--border)]">
               {profile.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
            <p className="text-[var(--text-muted)] text-sm mb-2">{profile.email}</p>
            <p className="text-[var(--text-secondary)] text-sm">Joined {profile.joinedDate}</p>
         </Card>

         {/* Stats Cards */}
         <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="flex flex-col items-center justify-center p-6 bg-[var(--bg-secondary)] relative overflow-hidden">
              <span className="text-xs text-[var(--text-muted)] font-medium mb-1 uppercase tracking-wider relative z-10">Total Solved</span>
              <span className="text-4xl font-bold text-white relative z-10">{stats.totalSolved}</span>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-muted)] font-medium mb-1 uppercase tracking-wider">Accuracy</span>
              <span className="text-4xl font-bold text-[var(--success)]">{stats.accuracy}%</span>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-muted)] font-medium mb-1 uppercase tracking-wider">Streak</span>
              <span className="text-4xl font-bold text-[#F59E0B]">{stats.currentStreak} 🔥</span>
            </Card>
         </div>
      </div>

      {/* Heatmap Section */}
      <Card>
        <CardHeader>
          <CardTitle>Consistency Map</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]">
              <CalendarHeatmap
                startDate={new Date(today.getFullYear(), today.getMonth() - 2, today.getDate())}
                endDate={today}
                values={heatmap}
                classForValue={(value) => {
                  if (!value || value.count === 0) return 'color-empty';
                  return `color-scale-${Math.min(value.count, 4)}`;
                }}
                showWeekdayLabels={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Charts Section */}
         <Card className="flex flex-col">
           <CardHeader>
             <CardTitle>Category Accuracy</CardTitle>
           </CardHeader>
           <CardContent className="flex-1 h-72 pt-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={categoryStats}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                 <XAxis dataKey="name" stroke="var(--text-muted)" />
                 <YAxis stroke="var(--text-muted)" unit="%" />
                 <Tooltip 
                   contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px' }}
                   itemStyle={{ color: 'var(--text-primary)' }}
                   cursor={{ fill: 'var(--bg-tertiary)' }}
                 />
                 <Bar dataKey="accuracy" fill="var(--success)" radius={[4, 4, 0, 0]} maxBarSize={50} />
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>

         {/* Recent Activity */}
         <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-4 flex flex-col gap-3">
              {activity.length === 0 ? (
                 <div className="text-center text-[var(--text-muted)] pt-12">No recent activity.</div>
              ) : (
                 activity.map(item => (
                   <div key={item.id} className="flex justify-between items-center p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] hover:border-[var(--text-secondary)] transition-colors">
                      <div className="flex flex-col gap-1">
                         <span className="font-medium text-[var(--text-primary)]">{item.questionName}</span>
                         <span className="text-xs text-[var(--text-muted)]">{item.date} • {item.timeTaken}</span>
                      </div>
                      <div className="text-xl">
                         {item.isCorrect ? <span className="text-[var(--success)]">✔</span> : <span className="text-[var(--error)]">❌</span>}
                      </div>
                   </div>
                 ))
              )}
            </CardContent>
         </Card>
      </div>

    </div>
  );
}
