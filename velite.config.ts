import { defineConfig, defineCollection, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    description: s.string().max(500),
    date: s.isodate(),
    locale: s.enum(["fr", "en"]),
    slug: s.slug("post"),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
