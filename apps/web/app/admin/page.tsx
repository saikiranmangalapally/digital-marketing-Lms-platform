"use client";

import { useState, useEffect } from "react";
import { BellRing, BookCopy, ChartNoAxesCombined, Plus, UserRoundCheck, X, Search, Zap, Filter, ArrowUpRight } from "lucide-react";
import { academyPlans, courseTags } from "@/lib/data";
import { AdminOverview, Course } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function AdminPage() {
  const [overview, setOverview] = useState<AdminOverview>({ revenue: "–", activeLearners: 0, completionRate: 0, mentorsOnline: 0 });
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: courseTags[0],
    level: "Advanced",
    price: 799,
    duration: "4 weeks",
    description: "",
    mentor: "",
  });

  async function loadData() {
    try {
      const [ovRes, coRes] = await Promise.all([
        fetch(`${apiUrl}/admin/overview`),
        fetch(`${apiUrl}/courses`),
      ]);
      if (ovRes.ok) setOverview(await ovRes.json());
      if (coRes.ok) setCourses(await coRes.json());
    } catch {
      /* fallback */
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${apiUrl}/admin/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const created = await res.json();
        setCourses((prev) => [...prev, created]);
        setModalOpen(false);
        setForm({ title: "", category: courseTags[0], level: "Advanced", price: 799, duration: "4 weeks", description: "", mentor: "" });
        setSuccessMsg("Execution track created successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      /* handle error */
    } finally {
      setSaving(false);
    }
  };

  const statCards = [
    { label: "Gross Revenue", value: overview.revenue, icon: ChartNoAxesCombined, color: "text-brand-600" },
    { label: "Active Learners", value: overview.activeLearners, icon: UserRoundCheck, color: "text-teal" },
    { label: "Completion Rate", value: `${overview.completionRate}%`, icon: BookCopy, color: "text-orange" },
    { label: "Experts Online", value: overview.mentorsOnline, icon: BellRing, color: "text-slate" },
  ];

  return (
    <div className="bg-mesh min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Success toast */}
        {successMsg && (
          <div className="fixed right-6 top-24 z-50 animate-slide-in alert alert-success shadow-lg flex items-center gap-2">
            <Zap className="h-4 w-4 fill-current" />
            {successMsg}
          </div>
        )}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-700">
              <Zap className="h-3.5 w-3.5" />
              LMS Operations
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Dashboard Center</h1>
          </div>
          <button
            id="create-course-btn"
            onClick={() => setModalOpen(true)}
            className="btn btn-primary px-8 py-3.5 text-xs uppercase tracking-widest shadow-md"
          >
            <Plus className="h-5 w-5" />
            Create Track
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <div key={item.label} className="card p-6 card-hover">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-6 text-3xl font-bold tracking-tight text-ink" suppressHydrationWarning>{item.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate/50">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Course Management Table */}
        <div className="mt-12 card p-8 overflow-hidden shadow-soft">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight text-ink">Content Management</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
              <input
                type="text"
                placeholder="Search tracks..."
                className="input pl-11 pr-4 py-2.5 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest text-slate/40 border-b border-slate-50">
                  <th className="pb-4 pr-6">Track Name</th>
                  <th className="pb-4 pr-6">Category</th>
                  <th className="pb-4 pr-6">Price</th>
                  <th className="pb-4 pr-6">Users</th>
                  <th className="pb-4 pr-6">Mentor</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {courses
                  .filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((course) => (
                  <tr key={course.id} className="group transition-colors hover:bg-slate-50/50">
                    <td className="py-5 pr-6 font-bold text-ink">{course.title}</td>
                    <td className="py-5 pr-6">
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 uppercase tracking-wider">{course.category}</span>
                    </td>
                    <td className="py-5 pr-6 text-slate font-medium" suppressHydrationWarning>Rs {course.price.toLocaleString("en-IN")}</td>
                    <td className="py-5 pr-6 text-slate font-medium">{course.students}</td>
                    <td className="py-5 pr-6 text-slate font-medium">{course.mentor}</td>
                    <td className="py-5 text-right">
                      <button className="h-8 w-8 rounded-lg border border-line bg-white flex items-center justify-center text-slate hover:text-brand-600 hover:border-brand-600 transition-all">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Course Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4" onClick={() => setModalOpen(false)}>
            <div
              className="relative w-full max-w-lg animate-modal-in card p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate transition hover:bg-brand-600 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 className="text-2xl font-bold tracking-tight text-ink">New Execution Track</h2>
              <p className="mt-2 text-sm text-slate font-medium">Add a high-intent track to the catalog.</p>

              <div className="mt-8 grid gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Track Title</label>
                  <input
                    id="course-title-input"
                    className="input"
                    placeholder="e.g. AI-Driven SEO Revenue Engine"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Category</label>
                    <select
                      className="input font-bold"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {courseTags.map((tag) => (
                        <option key={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Level</label>
                    <select
                      className="input font-bold"
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value })}
                    >
                      <option>Advanced</option>
                      <option>Beginner</option>
                      <option>Pro</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Price (Rs)</label>
                    <input
                      type="number"
                      className="input font-bold"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Duration</label>
                    <input
                      className="input font-bold"
                      placeholder="e.g. 8 weeks"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Assigned Mentor</label>
                  <input
                    className="input"
                    placeholder="e.g. Vikram Seth"
                    value={form.mentor}
                    onChange={(e) => setForm({ ...form, mentor: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Track Outcome</label>
                  <textarea
                    rows={2}
                    className="input resize-none"
                    placeholder="What specific outcome will this track provide?"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <button
                  id="submit-course-btn"
                  onClick={handleCreate}
                  disabled={saving || !form.title || !form.mentor || !form.description}
                  className="flex-1 btn btn-primary py-4 text-xs uppercase tracking-widest shadow-md"
                >
                  {saving ? "Deploying..." : "Create Track"}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 btn btn-secondary py-4 text-xs uppercase tracking-widest shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
