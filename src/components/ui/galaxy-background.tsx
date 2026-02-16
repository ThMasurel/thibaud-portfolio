"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number; // 0-1, affects parallax & brightness
}

const STAR_COUNT = 800;
const MOUSE_RADIUS = 120;
const MOUSE_FORCE = 35;
const RETURN_SPEED = 0.04;

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createStars() {
      const stars: Star[] = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = Math.random();
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 0.5 + depth * 1.8,
          opacity: 0.3 + depth * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
          depth,
        });
      }
      starsRef.current = stars;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function render(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const dark = isDark();
      const mouse = mouseRef.current;
      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Mouse repulsion
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE * star.depth;
          const angle = Math.atan2(dy, dx);
          star.x += Math.cos(angle) * force * 0.15;
          star.y += Math.sin(angle) * force * 0.15;
        }

        // Spring back to base position
        star.x += (star.baseX - star.x) * RETURN_SPEED;
        star.y += (star.baseY - star.y) * RETURN_SPEED;

        // Twinkle
        const twinkle =
          0.5 +
          0.5 *
            Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const finalOpacity = star.opacity * (0.6 + twinkle * 0.4);

        // Color: white in dark mode, dark blue-grey in light mode
        if (dark) {
          ctx!.fillStyle = `rgba(220, 225, 255, ${finalOpacity})`;
        } else {
          ctx!.fillStyle = `rgba(50, 60, 100, ${finalOpacity * 0.7})`;
        }

        // Draw star with glow for brighter ones
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fill();

        // Soft glow for deep (bright) stars
        if (star.depth > 0.7 && dark) {
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(180, 190, 255, ${finalOpacity * 0.08})`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    }

    resize();
    createStars();
    rafRef.current = requestAnimationFrame(render);

    window.addEventListener("resize", () => {
      resize();
      createStars();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
