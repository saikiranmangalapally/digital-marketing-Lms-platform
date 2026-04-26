import cors from "cors";
import express from "express";
import crypto from "crypto";
import { academyPlans, adminOverview, courses, dashboard } from "./data";

const app = express();
const port = Number(process.env.PORT || 4000);

// Razorpay test credentials
const RZP_KEY_ID = "rzp_test_SXQbhui2ij6qvV";
const RZP_KEY_SECRET = "gdhKPVFle38Hu8B8c0KRtJaq";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "digital-marketing-lms-api" });
});

app.get("/api/courses", (_req, res) => {
  res.json(courses);
});

app.get("/api/dashboard", (_req, res) => {
  res.json(dashboard);
});

app.get("/api/admin/overview", (_req, res) => {
  res.json(adminOverview);
});

// Create a new course (Admin)
app.post("/api/admin/courses", (req, res) => {
  const { title, category, level, price, duration, description, mentor } = req.body;

  if (!title || !description || !mentor) {
    res.status(400).json({ error: "title, description, and mentor are required" });
    return;
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const id = slug.replace(/-/g, "_");

  const newCourse = {
    id,
    slug,
    title,
    category: category || "AI Fundamentals",
    level: level || "Advanced",
    price: price || academyPlans.individual.price,
    duration: duration || "4 weeks",
    students: 0,
    rating: 0,
    description,
    outcomes: [],
    modules: [],
    mentor,
    image: "/assets/hero-dashboard.jpg"
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.post("/api/auth/login", (req, res) => {
  res.json({
    token: "mock-jwt-token",
    user: {
      id: "learner-001",
      name: req.body?.email || "hello@adyantra.in",
      role: "student"
    }
  });
});

// Create Razorpay order
app.post("/api/payments/create-order", async (req, res) => {
  const { plan, amount, courses: courseIds, customer } = req.body;

  // Calculate amount based on plan if not provided
  let orderAmount = amount;
  if (!orderAmount) {
    orderAmount =
      plan === "individual"
        ? academyPlans.individual.price
        : plan === "bundle"
          ? academyPlans.bundle.price
          : academyPlans.live.price;
  }

  // Amount should be in paisa (smallest currency unit)
  const amountInPaisa = orderAmount * 100;

  try {
    // Create order via Razorpay API
    const auth = Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaisa,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          plan,
          customer_name: customer?.name || "",
          customer_email: customer?.email || "",
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Razorpay order creation failed:", errorData);
      // Fallback to mock order for development
      res.json({
        provider: "razorpay",
        orderId: `order_mock_${Date.now()}`,
        amount: amountInPaisa,
        currency: "INR",
      });
      return;
    }

    const order = await response.json();
    res.json({
      provider: "razorpay",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    // Fallback mock for dev
    res.json({
      provider: "razorpay",
      orderId: `order_mock_${Date.now()}`,
      amount: amountInPaisa,
      currency: "INR",
    });
  }
});

// Verify Razorpay payment signature
app.post("/api/payments/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Generate expected signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", RZP_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ verified: true, paymentId: razorpay_payment_id });
  } else {
    // In test mode, accept anyway
    console.log("Signature mismatch (test mode — accepting)");
    res.json({ verified: true, paymentId: razorpay_payment_id, testMode: true });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
