import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../navbar";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
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
  usePathname: () => "/",
}));

vi.mock("@/components/ui/theme-toggle", () => ({
  ThemeToggle: () => <button>theme</button>,
}));

vi.mock("@/components/ui/lang-switch", () => ({
  LangSwitch: () => <button>lang</button>,
}));

describe("Navbar", () => {
  it("renders section links", () => {
    render(<Navbar />);

    // The navbar uses translation keys as text (from our mock)
    expect(screen.getAllByText("about").length).toBeGreaterThan(0);
    expect(screen.getAllByText("skills").length).toBeGreaterThan(0);
    expect(screen.getAllByText("projects").length).toBeGreaterThan(0);
    expect(screen.getAllByText("contact").length).toBeGreaterThan(0);
    expect(screen.getAllByText("blog").length).toBeGreaterThan(0);
  });

  it("has a mobile menu button with correct aria-label", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Toggle menu");
    expect(menuButton).toBeInTheDocument();
  });
});
