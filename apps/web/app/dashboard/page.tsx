"use client";

import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, ChevronRight, Clock, Zap, ArrowRight, PlayCircle, BarChart3, Play, ChartSpline } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/types";
import { courses as fallbackCourses } from "@/lib/data";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/courses`)
      .then((r) => (r.ok ? r.json() : fallbackCourses))
      .then((data) => {
        setCourses(data.slice(0, 3));
        setEnrolledCourses(data.slice(0, 2)); // Mocking enrolled courses
      })
      .catch(() => {
        setCourses(fallbackCourses.slice(0, 3));
        setEnrolledCourses(fallbackCourses.slice(0, 2));
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Active Tracks", value: "3", icon: Zap, color: "text-brand-600" },
    { label: "XP Points", value: "2,450", icon: BarChart3, color: "text-orange" },
    { label: "Clinics Done", value: "12", icon: CheckCircle2, color: "text-teal" },
    { label: "Hours Learned", value: "48h", icon: Clock, color: "text-slate" },
  ];

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-700">
              <Zap className="h-3.5 w-3.5" />
              Student Console
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Execution Hub</h1>
            <p className="mt-2 text-lg font-medium text-slate/70">Welcome back, Sai Kiran. Ready to scale your workflows?</p>
          </div>
          <Link href="/courses" className="btn btn-primary px-8 py-3.5 text-xs uppercase tracking-widest shadow-md">
            Continue Track
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-card border border-line bg-white p-6 shadow-soft transition-all hover:shadow-card">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-6 text-3xl font-bold tracking-tight text-ink" suppressHydrationWarning>{item.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate/50">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Active Learning Area */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">In-Progress Execution</h2>
              <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block" />
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 w-full animate-pulse rounded-card bg-slate-100" />
                ))}
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="rounded-card border-2 border-dashed border-slate-200 p-12 text-center bg-white/50">
                <p className="text-sm font-bold text-slate/40 uppercase tracking-widest">No active tracks</p>
                <Link href="/courses" className="mt-4 inline-block text-xs font-bold text-brand-600 uppercase tracking-widest hover:underline">
                  Start Learning Now
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="group relative overflow-hidden rounded-card border border-line bg-white p-6 shadow-soft transition-all hover:shadow-card">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                      <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img src={course.image} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-1">{course.category}</div>
                        <h3 className="truncate text-lg font-bold text-ink">{course.title}</h3>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-[45%] gradient-primary rounded-full" />
                          </div>
                          <span className="text-[11px] font-bold text-slate">45%</span>
                        </div>
                      </div>
                      <Link href={`/courses/${course.slug}`} className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-ink transition-all hover:bg-brand-600 hover:text-white group-hover:scale-110">
                        <Play className="h-5 w-5 fill-current" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity & Mentors */}
          <aside className="space-y-8">
            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <ChartSpline className="h-5 w-5 text-brand-600" />
                Momentum Loop
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Technical Watch Time", value: "12h 45m", color: "bg-teal" },
                  { label: "Assignment Health", value: "92/100", color: "bg-orange" },
                  { label: "Clinic Participation", value: "4 Sessions", color: "bg-brand-600" }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate/60">
                      <span>{item.label}</span>
                      <span className="text-ink">{item.value}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-slate-50">
                      <div className={`h-full rounded-full ${item.color} w-3/4`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-card bg-ink p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-600/10 blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Priority Clinic</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">The next implementation clinic starts in 2 hours. Have your SEO audits ready for review.</p>
                <button className="mt-6 w-full rounded-btn bg-white py-3 text-xs font-bold uppercase tracking-widest text-ink transition-all hover:bg-teal hover:text-white">
                  Join Room
                </button>
              </div>
            </div>

            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate/40 mb-6">Expert Mentors</h3>
              <div className="space-y-4">
                {[
                  { name: "Siddharth Malhotra", status: "Active Now", icon: "SM" },
                  { name: "Ananya Iyer", status: "In Clinic", icon: "AI" }
                ].map((mentor) => (
                  <div key={mentor.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate">
                        {mentor.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ink">{mentor.name}</div>
                        <div className="text-[10px] font-bold text-teal uppercase tracking-widest">{mentor.status}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate/20 group-hover:text-brand-600 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
