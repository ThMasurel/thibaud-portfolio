import type { Locale } from "@/i18n/routing";

export interface Post {
  title: string;
  description: string;
  date: string;
  locale: string;
  slug: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const { posts } = await import("#content");
    return posts as Post[];
  } catch {
    return [];
  }
}

export async function getPostsByLocale(locale: Locale): Promise<Post[]> {
  const posts = await getPosts();
  return posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug && post.locale === locale);
}
