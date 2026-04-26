import Link from "next/link";
import { notFound } from "next/navigation";
import { Bot, CirclePlay, FileCheck2, MessageSquareText } from "lucide-react";
import { getCourse } from "@/lib/api";

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <div className="min-h-[320px] rounded-[28px] bg-ink p-6 text-white sm:min-h-[420px]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <CirclePlay className="h-4 w-4" />
                  Module 3 of 4
                </div>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{course.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                    Video learning, assignment prompts, and mentor support sit together inside the player.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Lesson checklist</h2>
            <div className="mt-6 space-y-4">
              {course.modules.map((module, index) => (
                <div key={module} className="flex items-center justify-between rounded-[24px] bg-slate-50 px-5 py-4">
                  <div className="text-sm font-medium text-ink">
                    {index + 1}. {module}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                    {index < 2 ? "Done" : "Up next"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-brand-600" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Ask the AI coach</h2>
            </div>
            <div className="mt-5 rounded-[24px] bg-slate-50 p-5 text-sm leading-6 text-slate">
              Summarize this lesson, draft SEO briefs, sharpen ad copy, map email journeys, or suggest next experiments based on the module you are inside.
            </div>
          </div>
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-5 w-5 text-teal" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Mentor chat</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate">
              Send screenshots, ask campaign questions, and get review feedback during weekend office hours.
            </p>
          </div>
          <div className="rounded-[32px] border border-line bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-gold" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Certificate track</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate">
              Complete the capstone, clear the final assessment, and unlock your certificate.
            </p>
            <Link href="/certificate" className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
              Preview certificate
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
