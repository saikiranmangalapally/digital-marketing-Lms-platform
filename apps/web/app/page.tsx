"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, Bot, ChartSpline, CirclePlay, MessageCircleMore, ShieldCheck, TrendingUp, ArrowRight, Zap, Target, Users, Play } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { academyPlans, brandName, courseTags, highlights, siteTitle, courses as fallbackCourses } from "@/lib/data";
import { Course } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function HomePage() {
  const { isHydrated } = useCart();
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);

  useEffect(() => {
    if (!isHydrated) return;
    fetch(`${apiUrl}/courses`)
      .then((r) => (r.ok ? r.json() : fallbackCourses))
      .then(setCourses)
      .catch(() => setCourses(fallbackCourses));
  }, [isHydrated]);

  if (!isHydrated) return null;

  const featured = courses.slice(0, 3);

  return (
    <div className="bg-mesh pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      
      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-32 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24 relative z-10">
        <div className="space-y-10 animate-slide-in">
          <div className="inline-flex items-center gap-3 rounded-full bg-white border border-line p-1 pr-4 shadow-sm transition-all hover:border-brand-600">
            <div className="rounded-full bg-brand-600 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white">NEW</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-ink">Scale Lab v2.0 is live</div>
            <ArrowRight className="h-3 w-3 text-brand-600" />
          </div>

          <div className="space-y-6">
            <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-tighter text-ink sm:text-7xl lg:text-8xl">
              <span className="relative inline-block">
                Scale
                <div className="absolute -bottom-2 left-0 h-3 w-full bg-brand-600/10 -rotate-1" />
              </span> 
              <br />
              <span className="text-brand-600 sm:text-gradient">Your</span> Loop.
            </h1>
            <p className="max-w-xl text-lg font-medium leading-relaxed text-slate/70">
              The high-performance operating system for digital marketers. Built on technical execution, automation, and measurable growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <Link href="/courses" className="btn btn-primary px-10 py-4.5 text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-brand-600/30 group">
              Explore Alpha Tracks
              <Zap className="h-3.5 w-3.5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
            </Link>
            <Link href="/dashboard" className="btn btn-secondary px-10 py-4.5 text-[10px] uppercase tracking-[0.2em]">
              Dashboard
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: "Active tracks", value: `${courseTags.length}`, color: "text-brand-600", dot: "bg-brand-600" },
              { label: "Enrollment", value: `Rs ${academyPlans.individual.price}`, color: "text-teal", dot: "bg-teal" },
              { label: "Completion", value: `94%`, color: "text-orange", dot: "bg-orange" }
            ].map((item) => (
              <div key={item.label} className="card p-6 card-hover group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-2 w-2 rounded-full ${item.dot} animate-pulse`} />
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate/30">Live Sync</div>
                </div>
                <div className={`text-4xl font-black tracking-tighter ${item.color}`}>{item.value}</div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate/40 group-hover:text-ink transition-colors">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:mt-0 mt-16 group">
          {/* Floating Badges */}
          <div className="absolute -left-10 top-10 z-20 animate-float bg-white border border-line rounded-xl p-4 shadow-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-ink uppercase tracking-widest">Growth Engine</div>
              <div className="text-[9px] font-bold text-slate/50">v4.2 Connected</div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-1/4 z-20 animate-float-delayed bg-white border border-line rounded-xl p-4 shadow-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-ink uppercase tracking-widest">Verified Lab</div>
              <div className="text-[9px] font-bold text-slate/50">Technical Alpha</div>
            </div>
          </div>

          <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-tr from-brand-600/30 to-teal/30 blur-[120px] opacity-30 z-0 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative z-10 overflow-hidden rounded-[40px] border border-white/50 bg-white/20 p-4 shadow-[0_32px_64px_-16px_rgba(124,58,237,0.2)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[32px] bg-slate-900 border border-white/10">
              <Image src="/assets/hero-dashboard.jpg" alt="Platform UI" width={1200} height={900} priority className="h-auto w-full opacity-90 transition-all group-hover:scale-[1.03] group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            <div className="absolute inset-x-8 bottom-8 rounded-3xl bg-ink/90 p-8 shadow-2xl backdrop-blur-xl border border-white/10 text-white">
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-white shadow-lg shadow-brand-600/20">
                  <Play className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <div className="text-base font-black tracking-tight">Active Execution Clinic</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal">2,480 Analysts Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-line/5 relative z-10">
        <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal border border-teal/10 shadow-sm shadow-teal/5">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-ink sm:text-5xl lg:text-6xl leading-[0.95]">
              Systems <br />
              <span className="text-slate/20">for</span> Scale.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate/60 max-w-sm">
              We replace outdated theory with modern implementation loops. Every track includes technical checklists.
            </p>
            <div className="grid gap-6">
              {[
                "Repeatable Marketing Frameworks",
                "Real-time Execution Tracking",
                "Technical Implementation Labs"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-ink/70">
                  <div className="h-6 w-6 rounded-full bg-orange/10 text-orange flex items-center justify-center border border-orange/10 shadow-sm">
                    <Zap className="h-3.5 w-3.5 fill-current" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, idx) => (
              <div key={idx} className="card p-8 card-hover relative group border-line/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100/50 mb-8">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold leading-relaxed text-slate/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Catalog */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm rounded-[48px] border border-line/5 relative z-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between mb-16">
          <SectionHeading
            eyebrow="Curated Tracks"
            title="Core Execution Library"
            body="High-intent tracks built for technical growth and professional scale."
          />
          <Link href="/courses" className="btn btn-secondary px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] group">
            View All Tracks
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 rounded-[40px] bg-ink p-12 text-white shadow-2xl lg:grid-cols-4 relative overflow-hidden">
          {/* Abstract glows */}
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-teal/5 blur-[100px] pointer-events-none" />
          
          {[
            { icon: CirclePlay, title: "Execution", text: "Progressive modules with precise tracking." },
            { icon: Award, title: "Validation", text: "Professional credentials for all tracks." },
            { icon: ChartSpline, title: "Analytics", text: "Visibility into implementation progress." },
            { icon: Users, title: "Clinics", text: "Weekly implementation teardowns." }
          ].map((item) => (
            <div key={item.title} className="relative z-10 rounded-3xl bg-white/5 p-8 border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10 group">
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-600 transition-colors">
                <item.icon className="h-6 w-6 text-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-4">{item.title}</h3>
              <p className="text-[11px] font-bold leading-relaxed text-white/40 uppercase tracking-[0.1em]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
