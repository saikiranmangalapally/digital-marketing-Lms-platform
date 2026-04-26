"use client";

import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { courseTags, courses as fallbackCourses } from "@/lib/data";
import { Course } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Zap, Filter, Search, Sparkles } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function CoursesPage() {
  const { isHydrated } = useCart();
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    if (!isHydrated) return;
    fetch(`${apiUrl}/courses`)
      .then((r) => (r.ok ? r.json() : fallbackCourses))
      .then(setCourses)
      .catch(() => setCourses(fallbackCourses));
  }, [isHydrated]);

  if (!isHydrated) return null;

  const filteredCourses = activeTag === "All" 
    ? courses 
    : courses.filter(c => c.category === activeTag);

  return (
    <div className="bg-mesh min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative">
          <SectionHeading
            eyebrow="Implementation tracks"
            title="Master the growth stack."
            body="Repeatable marketing workflows built for high-performance teams. Focus on execution and technical mastery."
          />
        </div>

        <div className="mt-12 space-y-10">
          {/* Filters Bar */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...courseTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeTag === tag
                      ? "gradient-primary text-white shadow-md"
                      : "bg-white text-slate border border-line hover:border-brand-600 hover:text-brand-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-2 shadow-soft group focus-within:border-brand-600">
              <Search className="h-4 w-4 text-slate/30 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search tracks..." 
                className="bg-transparent text-xs font-bold uppercase tracking-widest outline-none text-ink placeholder:text-slate/20"
              />
            </div>
          </div>

          {/* Results Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-line bg-white p-20 text-center shadow-soft">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-slate/20" />
              </div>
              <h3 className="text-lg font-bold text-ink">No results.</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate/40">Try a different filter</p>
              <button 
                onClick={() => setActiveTag("All")}
                className="mt-6 text-[10px] font-bold text-brand-600 uppercase tracking-widest hover:underline"
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
