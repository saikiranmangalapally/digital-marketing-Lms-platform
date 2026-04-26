import { adminOverview, courses, dashboardData } from "@/lib/data";
import { AdminOverview, Course, DashboardPayload } from "@/lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${apiUrl}${path}`, { cache: "no-store" });
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getCourses(): Promise<Course[]> {
  return tryFetch("/courses", courses);
}

export async function getCourse(slug: string): Promise<Course | undefined> {
  const list = await getCourses();
  return list.find((course) => course.slug === slug || course.legacySlugs?.includes(slug));
}

export async function getDashboard(): Promise<DashboardPayload> {
  return tryFetch("/dashboard", dashboardData);
}

export async function getAdminOverview(): Promise<AdminOverview> {
  return tryFetch("/admin/overview", adminOverview);
}
