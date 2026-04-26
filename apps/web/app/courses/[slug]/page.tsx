import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageSquareText, PlayCircle, Star, Sparkles, Zap, Award } from "lucide-react";
import { getCourse } from "@/lib/api";
import { academyPlans, brandName } from "@/lib/data";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-mesh min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700">
                <Sparkles className="h-3.5 w-3.5" />
                {course.category}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{course.title}</h1>
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate/70">{course.description}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-card border border-line bg-white shadow-soft transition-all hover:shadow-card">
              <Image src={course.image} alt={course.title} width={1400} height={900} priority className="h-[320px] w-full object-cover sm:h-[400px] opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink shadow-md backdrop-blur-md">
                <Award className="h-4 w-4 text-brand-600" />
                {brandName} Certified Execution Track
              </div>
            </div>

            <div className="grid gap-10 rounded-card border border-line bg-white p-10 shadow-soft lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-ink flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange" />
                  Growth Outcomes
                </h2>
                <ul className="space-y-5">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm font-medium leading-relaxed text-slate/80">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-orange shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-ink flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-brand-600" />
                  Execution Loop
                </h2>
                <ul className="space-y-3">
                  {course.modules.map((module) => (
                    <li key={module} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate transition-all hover:bg-white hover:shadow-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-600/30" />
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <div className="flex items-end justify-between border-b border-slate-50 pb-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate/40 mb-1">Single Track Access</div>
                  <div className="text-4xl font-bold tracking-tight text-ink" suppressHydrationWarning>Rs {course.price.toLocaleString("en-IN")}</div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-teal/5 px-3 py-1 text-xs font-bold text-teal">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {course.rating}
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Duration", val: course.duration },
                  { label: "Level", val: course.level },
                  { label: "Execution", val: "Lab Ready" },
                  { label: "Credential", val: "Yes" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-slate-50 px-4 py-3 text-center transition-all hover:bg-slate-100">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate/40">{stat.label}</div>
                    <div className="mt-1 text-xs font-bold text-ink">{stat.val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-line p-5 transition-all hover:border-brand-600 hover:shadow-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-ink">{academyPlans.individual.title}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate/40">{academyPlans.individual.subtitle}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-ink" suppressHydrationWarning>Rs {academyPlans.individual.price.toLocaleString("en-IN")}</div>
                    <Link href={`/checkout?plan=individual&course=${course.slug}`} className="rounded-btn bg-brand-600 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:scale-105 active:scale-95">
                      Buy Track
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-line p-5 transition-all hover:border-brand-600 hover:shadow-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-ink">{academyPlans.bundle.title}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate/40">{academyPlans.bundle.subtitle}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-ink" suppressHydrationWarning>Rs {academyPlans.bundle.price.toLocaleString("en-IN")}</div>
                    <Link href={`/checkout?plan=bundle&course=${course.slug}`} className="rounded-btn border border-line bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-ink transition-all hover:border-brand-600 hover:text-brand-600 active:scale-95">
                      Get Bundle
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-6 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-brand-600/5 blur-xl group-hover:bg-brand-600/10 transition-all" />
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-700 flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    {academyPlans.live.title}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-600/50">{academyPlans.live.subtitle}</div>
                  <div className="mt-6 flex items-end justify-between">
                    <div suppressHydrationWarning>
                      <div className="text-2xl font-bold text-ink">Rs {academyPlans.live.price.toLocaleString("en-IN")}</div>
                      <div className="text-[10px] font-bold text-slate/30 line-through">Rs {academyPlans.live.originalPrice?.toLocaleString("en-IN")}</div>
                    </div>
                    <Link href={`/checkout?plan=live&course=${course.slug}`} className="rounded-btn gradient-primary px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-md transition-all hover:scale-105 active:scale-95">
                      Join Live
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <MessageSquareText className="h-5 w-5 text-brand-600" />
                <h2 className="text-lg font-bold tracking-tight text-ink uppercase tracking-widest">Support Stack</h2>
              </div>
              <p className="mt-4 text-xs font-medium leading-relaxed text-slate/70">
                Access 1:1 expert support, private community channels, and weekly implementation clinics to audit your live campaigns.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { Target } from "lucide-react";
