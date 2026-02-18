import { describe, it, expect } from "vitest";
import { getPostsByLocale, getPostBySlug } from "../blog";

describe("getPostsByLocale", () => {
  it("returns only French posts sorted by date desc", async () => {
    const posts = await getPostsByLocale("fr");

    expect(posts).toHaveLength(2);
    expect(posts.every((p) => p.locale === "fr")).toBe(true);
    // Most recent first
    expect(posts[0].slug).toBe("mon-portfolio");
    expect(posts[1].slug).toBe("websockets-en-go");
  });

  it("returns only English posts", async () => {
    const posts = await getPostsByLocale("en");

    expect(posts).toHaveLength(1);
    expect(posts[0].locale).toBe("en");
    expect(posts[0].slug).toBe("websockets-in-go");
  });
});

describe("getPostBySlug", () => {
  it("returns the correct post for a given slug and locale", async () => {
    const post = await getPostBySlug("websockets-en-go", "fr");

    expect(post).toBeDefined();
    expect(post!.title).toBe("WebSockets en Go");
    expect(post!.locale).toBe("fr");
  });

  it("returns undefined for a non-existent slug", async () => {
    const post = await getPostBySlug("inexistant", "fr");

    expect(post).toBeUndefined();
  });
});
