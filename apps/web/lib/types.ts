export type Course = {
  id: string;
  slug: string;
  legacySlugs?: string[];
  title: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  description: string;
  outcomes: string[];
  modules: string[];
  mentor: string;
  image: string;
};

export type AcademyPlan = {
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
};

export type AcademyPlans = {
  individual: AcademyPlan;
  bundle: AcademyPlan;
  live: AcademyPlan;
};

export type DashboardStats = {
  streakDays: number;
  completionRate: number;
  certificates: number;
  weeklyMinutes: number;
};

export type LiveSession = {
  title: string;
  time: string;
  mentor: string;
};

export type Badge = {
  name: string;
  description: string;
};

export type DashboardPayload = {
  stats: DashboardStats;
  enrolledCourses: {
    title: string;
    progress: number;
    nextLesson: string;
  }[];
  liveSessions: LiveSession[];
  badges: Badge[];
  recommendations: string[];
};

export type AdminOverview = {
  revenue: string;
  activeLearners: number;
  completionRate: number;
  mentorsOnline: number;
};
