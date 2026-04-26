"use client";

import { useEffect, useState } from "react";
import { CreditCard, Gift, Minus, ShieldCheck, ShoppingCart, Sparkles, Trash2, X, Zap, MapPin, Phone, Mail, User } from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { academyPlans, brandName, courses } from "@/lib/data";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const RZP_KEY = "rzp_test_SXQbhui2ij6qvV";

export default function CheckoutPage() {
  const { items, addCourse, removeCourse, clearCart, plan, setPlan, totalPrice, itemCount, isHydrated } = useCart();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [coupon, setCoupon] = useState("");
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isHydrated) return;
    
    const p = searchParams.get("plan");
    if (p === "individual" || p === "bundle" || p === "live") {
      setPlan(p);
    }

    const c = searchParams.get("course");
    if (c) {
      const course = courses.find((x) => x.slug === c);
      if (course && !items.some((i) => i.id === course.id)) {
        addCourse(course);
      }
    }
  }, [isHydrated, searchParams, addCourse, items, setPlan]);

  if (!isHydrated) return null;

  const planInfo = plan === "bundle" ? academyPlans.bundle : plan === "live" ? academyPlans.live : academyPlans.individual;
  const cartAmount = plan === "individual" ? totalPrice : planInfo.price;
  const gst = Math.round(cartAmount * 0.18);
  const grandTotal = cartAmount + gst;

  const isFormValid = form.name.trim() && form.email.trim() && form.phone.trim();

  const handlePayment = async () => {
    if (!isFormValid) {
      setError("Please complete the required fields below.");
      return;
    }
    if (plan === "individual" && items.length === 0) {
      setError("Please select at least one course to continue.");
      return;
    }

    setError("");
    setPaying(true);

    try {
      const orderRes = await fetch(`${apiUrl}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          amount: grandTotal,
          courses: items.map((i) => i.id),
          customer: form,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const orderData = await orderRes.json();

      const options = {
        key: RZP_KEY,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: brandName,
        description: plan === "individual"
          ? `${items.length} execution track${items.length > 1 ? "s" : ""}`
          : planInfo.title,
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#7C3AED",
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${apiUrl}/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (verifyRes.ok) {
              setPaymentSuccess(true);
              clearCart();
            }
          } catch {
            setPaymentSuccess(true);
            clearCart();
          }
        },
        modal: {
          ondismiss: function () {
            setPaying(false);
          },
        },
      };

      if (!window.Razorpay) {
        setError("Secure gateway is initializing. Please retry in 2 seconds.");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError("Payment system unavailable. Please check your connection.");
    } finally {
      setPaying(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="bg-mesh min-h-[80vh] flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange/10 shadow-md">
            <ShieldCheck className="h-10 w-10 text-orange" />
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink">Enrollment Complete</h1>
          <p className="mt-4 text-base font-medium text-slate">
            Welcome aboard. Your tracks are now active in the dashboard. Check your email for implementation guides.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard" className="gradient-primary rounded-btn px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01]">
              Go to Dashboard
            </Link>
            <Link href="/courses" className="rounded-btn border border-line bg-white px-8 py-4 text-sm font-bold text-ink hover:border-brand-600 hover:text-brand-600">
              Browse Tracks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen pb-24">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-700">
            <CreditCard className="h-3.5 w-3.5" />
            Secure Checkout
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Select your path.</h1>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <h2 className="text-xl font-bold text-ink mb-8">1. Subscription Tier</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {(["individual", "bundle", "live"] as const).map((p) => {
                  const info = p === "bundle" ? academyPlans.bundle : p === "live" ? academyPlans.live : academyPlans.individual;
                  const isActive = plan === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`group relative rounded-card border-2 p-5 text-left transition-all ${
                        isActive
                          ? "border-brand-600 bg-brand-50 shadow-sm"
                          : "border-slate-50 bg-slate-50 hover:border-brand-100"
                      }`}
                    >
                      {isActive && <div className="absolute -right-1.5 -top-1.5 rounded-full bg-brand-600 p-1 text-white shadow-md"><Sparkles className="h-3 w-3" /></div>}
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate/50 mb-2">{info.title}</div>
                      <div className="text-lg font-bold text-ink" suppressHydrationWarning>Rs {info.price.toLocaleString("en-IN")}</div>
                      {info.originalPrice && (
                        <div className="mt-1 text-[10px] font-bold text-slate/30 line-through" suppressHydrationWarning>Rs {info.originalPrice.toLocaleString("en-IN")}</div>
                      )}
                    </button>
                  );
                })}
              </div>

              <h2 className="text-xl font-bold text-ink mt-12 mb-8">2. Customer Details</h2>
              <div className="grid gap-6">
                {[
                  { label: "Full Name", key: "name", placeholder: "e.g. Rahul Sharma", icon: User },
                  { label: "Email Address", key: "email", placeholder: "rahul@growth.com", icon: Mail },
                  { label: "Phone Number", key: "phone", placeholder: "+91 98XXX XXXXX", icon: Phone },
                  { label: "City", key: "city", placeholder: "Mumbai", icon: MapPin },
                ].map(({ label, key, placeholder, icon: Icon }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" />
                      {label} {key !== "city" && <span className="text-brand-600">*</span>}
                    </label>
                    <input
                      id={`checkout-${key}`}
                      className="w-full rounded-lg border border-line bg-slate-50/50 px-4 py-3 text-ink font-medium outline-none transition focus:border-brand-600 focus:bg-white"
                      placeholder={placeholder}
                      value={(form as any)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
                
                <div className="grid gap-6 md:grid-cols-2 mt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Promo Code</label>
                    <input
                      className="w-full rounded-lg border border-line bg-slate-50/50 px-4 py-3 text-ink font-medium outline-none transition focus:border-brand-600 focus:bg-white"
                      placeholder="Optional"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate/60">Payment Mode</label>
                    <div className="w-full rounded-lg border border-line bg-slate-50/50 px-4 py-3 text-ink font-bold flex items-center justify-between">
                      Razorpay
                      <div className="h-2 w-2 rounded-full bg-orange animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-8 rounded-lg bg-red-50 px-5 py-4 text-xs font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                id="pay-enroll-btn"
                onClick={handlePayment}
                disabled={paying}
                className="mt-10 w-full gradient-primary rounded-btn py-4.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {paying ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    <span suppressHydrationWarning>Pay Rs {grandTotal.toLocaleString("en-IN")} & Enroll</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <div className="flex items-center justify-between mb-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
                  <ShoppingCart className="h-5 w-5 text-brand-600" />
                  Cart ({itemCount})
                </h2>
                {itemCount > 0 && (
                  <button onClick={clearCart} className="text-[10px] font-bold uppercase tracking-widest text-brand-600 hover:underline">
                    Clear
                  </button>
                )}
              </div>

              {itemCount === 0 ? (
                <div className="rounded-lg bg-slate-50 p-10 text-center border border-line border-dashed">
                  <p className="text-[10px] font-bold text-slate/30 uppercase tracking-widest">Cart is empty</p>
                  <Link href="/courses" className="mt-4 inline-block text-[10px] font-bold text-brand-600 uppercase tracking-widest hover:underline">
                    Catalog
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 py-4 group">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-ink">{item.title}</div>
                        <div className="text-[9px] font-bold text-slate/40 uppercase tracking-widest mt-1 text-teal">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-ink" suppressHydrationWarning>Rs {item.price.toLocaleString("en-IN")}</div>
                        <button
                          onClick={() => removeCourse(item.id)}
                          className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-50 text-slate transition-all hover:bg-brand-600 hover:text-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-card bg-ink p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-600/10 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{planInfo.title}</h2>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{planInfo.subtitle}</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>Subtotal</span>
                    <span className="text-white" suppressHydrationWarning>Rs {cartAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>GST (18%)</span>
                    <span className="text-white" suppressHydrationWarning>Rs {gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-6">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-xl font-bold text-teal" suppressHydrationWarning>Rs {grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-line bg-white p-8 shadow-soft">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 text-orange shrink-0"><ShieldCheck className="h-full w-full" /></div>
                  <p className="text-[11px] font-medium leading-relaxed text-slate">Secure payment gateway via Razorpay with 256-bit encryption.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 text-brand-600 shrink-0"><Zap className="h-full w-full" /></div>
                  <p className="text-[11px] font-medium leading-relaxed text-slate">Instant access to the dashboard and all enrolled tracks.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
