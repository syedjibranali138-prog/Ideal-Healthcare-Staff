"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  type: "clinician" | "facility";
  pulsePhase: number;
}

interface HealthcareNetworkCanvasProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
}

export default function HealthcareNetworkCanvas({
  className = "",
  nodeCount = 42,
  interactive = true,
}: HealthcareNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Track mouse coordinates for subtle parallax
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize 3D nodes
    const fov = 350;
    const depthRange = 500;
    const points: Point3D[] = [];

    for (let i = 0; i < nodeCount; i++) {
      points.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * depthRange - depthRange / 2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2.2 + 1.8,
        type: Math.random() > 0.45 ? "clinician" : "facility",
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Handle resizing smoothly
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Render loop
    const isDark = resolvedTheme === "dark";
    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.08;
      const parallaxY = (mouse.y - height / 2) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // Colors based on theme
      const clinicianColor = isDark ? "67, 176, 42" : "36, 120, 25"; // brand green
      const facilityColor = isDark ? "56, 189, 248" : "22, 65, 130"; // brand navy/cyan
      const lineColor = isDark ? "100, 160, 220" : "70, 110, 160";

      // Project points to 2D
      const projected = points.map((p) => {
        if (!prefersReducedMotion) {
          // Subtle drifting motion
          p.x += p.vx * (delta * 60);
          p.y += p.vy * (delta * 60);
          p.z += p.vz * (delta * 60);
          p.pulsePhase += delta * 1.5;

          // Wrap boundaries
          const boundX = (width * 1.3) / 2;
          const boundY = (height * 1.3) / 2;
          const boundZ = depthRange / 2;

          if (p.x < -boundX) p.x = boundX;
          if (p.x > boundX) p.x = -boundX;
          if (p.y < -boundY) p.y = boundY;
          if (p.y > boundY) p.y = -boundY;
          if (p.z < -boundZ) p.z = boundZ;
          if (p.z > boundZ) p.z = -boundZ;
        }

        // Camera perspective
        const adjustedZ = p.z + 400;
        const scale = fov / Math.max(adjustedZ, 1);
        const projX = (p.x - parallaxX) * scale + halfWidth;
        const projY = (p.y - parallaxY) * scale + halfHeight;
        const depthAlpha = Math.max(0.1, Math.min(1, 1 - (p.z + boundZSafe(depthRange)) / depthRange));

        return {
          point: p,
          projX,
          projY,
          scale,
          depthAlpha,
        };
      });

      // Draw connecting lines between close nodes
      const maxDistance = 140;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.projX < -50 || p1.projX > width + 50 || p1.projY < -50 || p1.projY > height + 50) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18 * Math.min(p1.depthAlpha, p2.depthAlpha);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projected.length; i++) {
        const { point: p, projX, projY, scale, depthAlpha } = projected[i];
        if (projX < -20 || projX > width + 20 || projY < -20 || projY > height + 20) continue;

        const pulse = 1 + Math.sin(p.pulsePhase) * 0.15;
        const radius = Math.max(1, p.radius * scale * pulse);
        const rgb = p.type === "clinician" ? clinicianColor : facilityColor;
        const alpha = Math.min(0.85, (isDark ? 0.65 : 0.45) * depthAlpha);

        // Subtle glow aura
        ctx.beginPath();
        ctx.arc(projX, projY, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.2})`;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Helper
    function boundZSafe(range: number) {
      return range / 2;
    }

    // Start loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [resolvedTheme, nodeCount, interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 transition-opacity duration-700"
      />
    </div>
  );
}

