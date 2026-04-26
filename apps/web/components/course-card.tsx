"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { academyPlans } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  const { addCourse, items, isHydrated } = useCart();
  const router = useRouter();
  const inCart = isHydrated && items.some((i) => i.id === course.id);
  const [justAdded, setJustAdded] = useState(false);

  const handlePurchase = () => {
    if (!inCart) {
      addCourse(course);
    }
    router.push("/checkout");
  };

  return (
    <article className="card card-hover overflow-hidden transition-all duration-200">
      <div className="relative h-48 overflow-hidden rounded-t-lg -mx-4 -mt-4 mb-4">
        <Image src={course.image} alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
          {course.category}
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-tight text-ink hover:text-brand-600 transition-colors">{course.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate/80">{course.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">{course.level}</span>
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate">{course.duration}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-slate/40">From</div>
            <div className="text-lg font-bold text-ink" suppressHydrationWarning>Rs {course.price.toLocaleString("en-IN")}</div>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
            <Star className="h-3 w-3 fill-current" />
            {course.rating}
          </div>
        </div>

        <button
          id={`purchase-now-${course.id}`}
          onClick={handlePurchase}
          className="btn btn-primary w-full py-3.5 text-xs shadow-md"
        >
          <CreditCard className="h-4 w-4" />
          Enroll Now
        </button>
      </div>
    </article>
  );
}
