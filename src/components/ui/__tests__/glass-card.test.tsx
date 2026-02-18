import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlassCard } from "../glass-card";

describe("GlassCard", () => {
  it("renders children correctly", () => {
    render(<GlassCard>Hello World</GlassCard>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies the glass class", () => {
    render(<GlassCard>Content</GlassCard>);
    const card = screen.getByText("Content").closest("div");
    expect(card).toHaveClass("glass");
  });

  it("applies hover classes by default", () => {
    render(<GlassCard>Content</GlassCard>);
    const card = screen.getByText("Content").closest("div");
    expect(card).toHaveClass("hover:scale-[1.02]");
  });

  it("removes hover classes when hover=false", () => {
    render(<GlassCard hover={false}>Content</GlassCard>);
    const card = screen.getByText("Content").closest("div");
    expect(card).not.toHaveClass("hover:scale-[1.02]");
  });
});
