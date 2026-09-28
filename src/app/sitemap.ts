import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://sriramshravanthi.github.io/usa-tax-site";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/tools", priority: 0.8 },
  { path: "/find-a-pro", priority: 0.6 },
  { path: "/resources", priority: 0.6 },
  { path: "/about", priority: 0.5 },
  { path: "/faq", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
