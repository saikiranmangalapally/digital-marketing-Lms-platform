import { Award, ShieldCheck } from "lucide-react";
import { brandName } from "@/lib/data";

export default function CertificatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[40px] border border-line bg-white p-10 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            <Award className="h-4 w-4" />
            Certificate preview
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-slate">
            <ShieldCheck className="h-4 w-4 text-teal" />
            Verifiable credential ready
          </div>
        </div>
        <div className="mt-10 rounded-[32px] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-[#fdf6ec] p-12 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{brandName}</div>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-ink">Certificate of Completion</h1>
          <p className="mt-6 text-lg text-slate">This certifies that</p>
          <div className="mt-6 text-4xl font-semibold tracking-tight text-ink">Priya Sharma</div>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate">
            has successfully completed the <span className="font-semibold text-ink">AI Powered Digital Marketing Fundamentals</span> program including prerecorded modules, capstone submission, mentor review, and final assessment.
          </p>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            <div className="rounded-[24px] bg-white p-5">
              <div className="text-sm text-slate">Certificate ID</div>
              <div className="mt-2 font-semibold text-ink">ADY-AIDMF-2026-0041</div>
            </div>
            <div className="rounded-[24px] bg-white p-5">
              <div className="text-sm text-slate">Issued on</div>
              <div className="mt-2 font-semibold text-ink">26 April 2026</div>
            </div>
            <div className="rounded-[24px] bg-white p-5">
              <div className="text-sm text-slate">Credential type</div>
              <div className="mt-2 font-semibold text-ink">Verified digital certificate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
