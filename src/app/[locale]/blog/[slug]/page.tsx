import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getPostBySlug, getPostsByLocale } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { MDXContent } from "@/components/blog/mdx-content";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const locales: Locale[] = ["fr", "en"];
  const params: { slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getPostsByLocale(locale);
    for (const post of posts) {
      params.push({ slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug, locale);
  const t = await getTranslations("blog");

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          &larr; {t("backToList")}
        </Link>

        <GlassCard hover={false} className="mb-8">
          <time className="text-sm text-muted-foreground">
            {t("publishedOn")} {formattedDate}
          </time>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{post.title}</h1>
          <p className="text-muted-foreground mt-2">{post.description}</p>
        </GlassCard>

        <article className="prose prose-lg max-w-none">
          <MDXContent code={post.body} />
        </article>
      </div>
    </section>
  );
}
