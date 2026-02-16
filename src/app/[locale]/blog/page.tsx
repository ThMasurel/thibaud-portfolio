import { getLocale, getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage() {
  const locale = (await getLocale()) as Locale;
  const posts = await getPostsByLocale(locale);

  const t = await getTranslations("blog");

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg mb-12">
          {t("description")}
        </p>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
