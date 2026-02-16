import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import type { Post } from "@/lib/blog";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations("blog");

  const formattedDate = new Date(post.date).toLocaleDateString(post.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <GlassCard className="h-full flex flex-col">
        <time className="text-xs text-muted-foreground">{formattedDate}</time>
        <h3 className="text-xl font-semibold mt-2 mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm flex-1">
          {post.description}
        </p>
        <span className="text-sm text-primary font-medium mt-4 inline-block">
          {t("readMore")} &rarr;
        </span>
      </GlassCard>
    </Link>
  );
}
