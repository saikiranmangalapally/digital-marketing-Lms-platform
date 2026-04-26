"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, GraduationCap, Menu, ShieldCheck, ShoppingCart, Sparkles, X, Zap, Send, Search, Lock, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import { brandName, courseTags, navLinks, siteTitle } from "@/lib/data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mesh text-ink font-inter">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 border-b border-line/10 bg-white/70 backdrop-blur-2xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-white shadow-lg transition-all group-hover:rotate-6 group-hover:scale-110">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-extrabold tracking-tight font-poppins text-ink leading-none">{brandName}</div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand-600/60">Execution Alpha</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover-line text-[11px] font-bold uppercase tracking-widest text-slate transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate/40 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search tracks..." 
                className="w-48 rounded-full border border-line/50 bg-slate-50/50 py-2 pl-9 pr-4 text-[10px] font-bold outline-none transition-all focus:w-64 focus:border-brand-600 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-teal/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal border border-teal/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              Live Clinic
            </div>
            <Link href="/checkout" className="btn btn-primary px-6 py-2.5 text-[10px] uppercase tracking-[0.1em] shadow-lg hover:shadow-brand-600/20">
              Enroll Now
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/checkout" className="btn btn-primary h-10 w-10 p-0 shadow-md">
              <Zap className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white shadow-sm transition-all active:scale-95"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-line/20 bg-white/95 px-6 py-8 shadow-2xl backdrop-blur-xl lg:hidden animate-modal-in">
            <nav className="grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-slate-50/50 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate hover:bg-brand-50 hover:text-brand-600 transition-all"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </Link>
              ))}
              <Link
                href="/checkout"
                onClick={() => setMenuOpen(false)}
                className="mt-6 btn btn-primary py-5 text-center text-xs uppercase tracking-[0.2em] shadow-xl"
              >
                Start Learning
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative">{children}</main>

      {/* Premium Footer */}
      <footer className="bg-ink pt-20 pb-12 text-white relative overflow-hidden">
        {/* Abstract background glow */}
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-teal/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter font-poppins">{brandName}</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/50 max-w-xs">
                The definitive operating system for digital marketers. Built on high-intensity workflows and technical growth.
              </p>
              <div className="flex gap-4">
                {[Globe, Share2, Mail, MessageCircle].map((Icon, i) => (
                  <button key={i} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-brand-600 hover:border-brand-600 transition-all group">
                    <Icon className="h-4 w-4 text-white/40 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Ecosystem</h3>
              <ul className="space-y-4 text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">
                {courseTags.slice(0, 5).map((tag) => (
                  <li key={tag} className="hover:text-brand-600 cursor-pointer transition-colors flex items-center gap-2 group">
                    <div className="h-1 w-1 rounded-full bg-brand-600 opacity-0 group-hover:opacity-100 transition-all" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Platform</h3>
              <ul className="space-y-4 text-[11px] font-bold text-white/60 uppercase tracking-[0.15em]">
                {["Enterprise", "Mentorship", "Execution Labs", "Affiliates", "Terms & Privacy"].map((item) => (
                  <li key={item} className="hover:text-teal cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Growth Newsletter</h3>
              <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-widest">
                Weekly technical teardowns & automation loops. No spam.
              </p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-4 pr-14 text-xs font-bold text-white outline-none transition-all focus:border-brand-600 focus:bg-white/10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white shadow-lg shadow-brand-600/20 active:scale-95 transition-all hover:scale-105">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                © 2026 {brandName}. Built for high-intent growth.
              </div>
              <div className="flex items-center gap-8 text-white/20">
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
