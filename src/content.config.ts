import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["System Analysis", "UI/UX", "Graphic Design"]),
    featured: z.boolean().default(false),
    date: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    deliverables: z.array(z.string()),
    liveUrl: z.string().url().nullable().optional(),
    figmaUrl: z.string().url().nullable().optional(),
  }),
});

export const collections = { projects };
