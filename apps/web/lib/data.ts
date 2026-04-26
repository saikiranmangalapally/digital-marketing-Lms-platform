import { AcademyPlans, AdminOverview, Course, DashboardPayload } from "@/lib/types";

export const brandName = "Adyantra LMS";
export const siteTitle = "AI Powered Digital Marketing Courses";
export const siteDescription =
  "AI powered digital marketing courses covering fundamentals, SEO, Google Ads, social media, content, email, ecommerce, analytics, and automation.";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" }
];

export const courseTags = [
  "AI Fundamentals",
  "SEO",
  "SEM / Google Ads",
  "Social Media",
  "Content Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Influencer Marketing",
  "E-commerce Marketing",
  "Analytics",
  "AI Automations"
];

export const academyPlans: AcademyPlans = {
  individual: {
    title: "Prerecorded individual course",
    subtitle: "Single-track access with lifetime prerecorded lessons.",
    price: 799
  },
  bundle: {
    title: "Prerecorded full course bundle",
    subtitle: "All prerecorded digital marketing courses in one stack.",
    price: 3499
  },
  live: {
    title: "Live full course program",
    subtitle: "Cohort support, live sessions, mentor reviews, and complete access.",
    price: 19999,
    originalPrice: 25000
  }
};

export const courses: Course[] = [
  {
    id: "fundamentals",
    slug: "ai-powered-digital-marketing-fundamentals",
    title: "AI Powered Digital Marketing Fundamentals",
    category: "AI Fundamentals",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 2860,
    rating: 4.9,
    description:
      "Build a practical base in digital marketing with AI-assisted research, messaging, campaign planning, and funnel thinking.",
    outcomes: ["Marketing foundations", "Offer positioning", "Audience research", "AI-assisted planning"],
    modules: ["Digital marketing basics", "Customer journeys", "AI research workflows", "Campaign blueprint"],
    mentor: "Ananya Rao",
    image: "/assets/hero-dashboard.jpg"
  },
  {
    id: "seo",
    slug: "seo-search-engine-optimization",
    legacySlugs: ["seo-growth-engine"],
    title: "SEO (Search Engine Optimization)",
    category: "SEO",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "5 weeks",
    students: 2140,
    rating: 4.8,
    description:
      "Learn modern SEO with content clustering, on-page systems, technical clean-up, and search performance reporting.",
    outcomes: ["Keyword systems", "On-page optimization", "Technical audits", "Search reporting"],
    modules: ["Keyword mapping", "On-page SEO", "Technical fixes", "Ranking analytics"],
    mentor: "Rohan Varma",
    image: "/assets/seo-hero.jpg"
  },
  {
    id: "sem",
    slug: "sem-google-ads",
    legacySlugs: ["performance-marketing-scale"],
    title: "SEM / Google Ads",
    category: "SEM / Google Ads",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "5 weeks",
    students: 2465,
    rating: 4.9,
    description:
      "Plan and optimize Google Search, Display, and Performance Max campaigns with AI-assisted creative and targeting workflows.",
    outcomes: ["Campaign structures", "Keyword intent", "Ad copy testing", "Conversion tracking"],
    modules: ["Search campaigns", "Display and PMAX", "Tracking setup", "Optimization loops"],
    mentor: "Kabir Malhotra",
    image: "/assets/performance-hero.jpg"
  },
  {
    id: "social",
    slug: "social-media-marketing",
    legacySlugs: ["social-media-brand-lab"],
    title: "Social Media Marketing",
    category: "Social Media",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 2338,
    rating: 4.8,
    description:
      "Create platform-specific content systems, audience growth loops, and community engagement plans across major social channels.",
    outcomes: ["Content calendars", "Short-form hooks", "Community growth", "Engagement metrics"],
    modules: ["Channel strategy", "Content planning", "Community management", "Performance review"],
    mentor: "Naina Kapoor",
    image: "/assets/social-hero.jpg"
  },
  {
    id: "content",
    slug: "content-marketing",
    legacySlugs: ["content-marketing-systems"],
    title: "Content Marketing",
    category: "Content Marketing",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 1712,
    rating: 4.7,
    description:
      "Design content engines for blogs, case studies, short-form media, and lead magnets that support organic growth and sales.",
    outcomes: ["Editorial systems", "Content briefs", "Repurposing flows", "Lead magnet strategy"],
    modules: ["Content strategy", "Editorial planning", "Lead generation content", "Distribution"],
    mentor: "Riya Sethi",
    image: "/assets/content-hero.jpg"
  },
  {
    id: "email",
    slug: "email-marketing",
    title: "Email Marketing",
    category: "Email Marketing",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "3 weeks",
    students: 1489,
    rating: 4.7,
    description:
      "Build automated email journeys, persuasive nurture sequences, and reporting systems that move leads toward conversion.",
    outcomes: ["Lifecycle flows", "Nurture sequences", "Segmentation logic", "Email analytics"],
    modules: ["List building", "Automation flows", "Copywriting", "Performance tracking"],
    mentor: "Meera Joshi",
    image: "/assets/content-hero.jpg"
  },
  {
    id: "affiliate",
    slug: "affiliate-marketing",
    title: "Affiliate Marketing",
    category: "Affiliate Marketing",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "3 weeks",
    students: 1217,
    rating: 4.6,
    description:
      "Understand affiliate funnels, traffic sources, and partner relationships for performance-led digital revenue channels.",
    outcomes: ["Offer selection", "Affiliate funnels", "Partner onboarding", "Performance measurement"],
    modules: ["Affiliate models", "Traffic systems", "Conversion pages", "Partner tracking"],
    mentor: "Dev Khanna",
    image: "/assets/freelance-hero.jpg"
  },
  {
    id: "influencer",
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    category: "Influencer Marketing",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "3 weeks",
    students: 1295,
    rating: 4.7,
    description:
      "Run creator partnerships with outreach systems, collaboration briefs, campaign tracking, and brand-safe approval loops.",
    outcomes: ["Creator discovery", "Campaign briefs", "Partnership outreach", "Influencer ROI"],
    modules: ["Creator selection", "Negotiation", "Campaign rollout", "Attribution tracking"],
    mentor: "Sana Qureshi",
    image: "/assets/social-hero.jpg"
  },
  {
    id: "ecommerce",
    slug: "ecommerce-marketing",
    title: "E-commerce Marketing",
    category: "E-commerce Marketing",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 1654,
    rating: 4.8,
    description:
      "Drive store growth with merchandising, retention campaigns, product messaging, cart recovery, and marketplace traffic.",
    outcomes: ["Store funnels", "Retention campaigns", "Product positioning", "Marketplace performance"],
    modules: ["Store conversion", "Retention marketing", "Catalog promotion", "Revenue analysis"],
    mentor: "Arjun Bedi",
    image: "/assets/freelance-hero.jpg"
  },
  {
    id: "analytics",
    slug: "analytics-google-analytics-tracking",
    title: "Analytics (Google Analytics, tracking)",
    category: "Analytics",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 1577,
    rating: 4.8,
    description:
      "Set up GA4, UTM systems, event tracking, and decision-ready dashboards for campaigns across channels.",
    outcomes: ["GA4 setup", "UTM governance", "Event mapping", "Dashboard reporting"],
    modules: ["GA4 foundations", "Tracking plans", "Attribution basics", "Reporting dashboards"],
    mentor: "Ishita Menon",
    image: "/assets/ai-hero.jpg"
  },
  {
    id: "automation",
    slug: "ai-powered-automations",
    legacySlugs: ["ai-marketing-tools-stack"],
    title: "AI Powered Automations",
    category: "AI Automations",
    level: "Advanced",
    price: academyPlans.individual.price,
    duration: "4 weeks",
    students: 1833,
    rating: 4.9,
    description:
      "Use AI tools and no-code systems to automate research, reporting, content adaptation, lead handling, and campaign operations.",
    outcomes: ["Prompt workflows", "Automation maps", "Ops templates", "AI-assisted reporting"],
    modules: ["Prompt design", "Workflow automation", "AI reporting", "Quality control"],
    mentor: "Aarav Mehta",
    image: "/assets/ai-hero.jpg"
  }
];

export const dashboardData: DashboardPayload = {
  stats: {
    streakDays: 23,
    completionRate: 78,
    certificates: 4,
    weeklyMinutes: 326
  },
  enrolledCourses: [
    { title: "AI Powered Digital Marketing Fundamentals", progress: 82, nextLesson: "Customer journey mapping with AI prompts" },
    { title: "SEM / Google Ads", progress: 61, nextLesson: "Search term optimization workflow" },
    { title: "Analytics (Google Analytics, tracking)", progress: 47, nextLesson: "GA4 events and conversion goals" }
  ],
  liveSessions: [
    { title: "Weekend live clinic: Google Ads account teardown", time: "Saturday, 7:00 PM", mentor: "Kabir Malhotra" },
    { title: "Live workshop: AI automation stacks for marketers", time: "Sunday, 11:00 AM", mentor: "Aarav Mehta" }
  ],
  badges: [
    { name: "Prompt Builder", description: "Completed the AI prompt sprint for campaign planning" },
    { name: "Tracking Ready", description: "Configured analytics events and UTM standards" },
    { name: "Consistency Streak", description: "Maintained learning momentum for 14 straight days" }
  ],
  recommendations: [
    "Unlock the prerecorded full course bundle at Rs 3,499 for all 11 tracks",
    "Book a live cohort seat at the Rs 19,999 offer price",
    "Finish AI fundamentals to open the automation capstone"
  ]
};

export const adminOverview: AdminOverview = {
  revenue: "Rs 32.8L",
  activeLearners: 4280,
  completionRate: 78,
  mentorsOnline: 12
};

export const highlights = [
  "AI-powered prerecorded learning for individual skill tracks",
  "Full bundle pricing for learners who want the whole stack",
  "Live mentor sessions, doubt support, and capstone reviews",
  "Analytics, certificates, referrals, streaks, and automation workflows"
];
