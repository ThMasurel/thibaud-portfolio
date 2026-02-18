import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "../post-card";
import type { Post } from "@/lib/blog";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockPost: Post = {
  title: "WebSockets en Go",
  description: "Implémentation de WebSockets avec Go",
  date: "2025-01-15T00:00:00.000Z",
  locale: "fr",
  slug: "websockets-en-go",
  body: "",
};

describe("PostCard", () => {
  it("displays the post title", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("WebSockets en Go")).toBeInTheDocument();
  });

  it("displays the formatted date", () => {
    render(<PostCard post={mockPost} />);
    // The date should be formatted in French locale
    expect(screen.getByText(/15/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it("displays the description", () => {
    render(<PostCard post={mockPost} />);
    expect(
      screen.getByText("Implémentation de WebSockets avec Go")
    ).toBeInTheDocument();
  });

  it("links to the correct blog post", () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/websockets-en-go");
  });
});
