import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { salaryList } from "./lib/salaryTable";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = ["", "/table", "/guide", "/privacy", "/terms"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const salaryEntries: MetadataRoute.Sitemap = salaryList().map((annual) => ({
    url: `${site.url}/salary/${annual}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...salaryEntries];
}
