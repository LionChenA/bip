import type React from 'react';
import { useEffect, useRef } from 'react';

export const TrailGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const mouse = { x: -1000, y: -1000 };
    let points: { x: number; y: number; opacity: number }[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      points.push({ ...mouse, opacity: 1 });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Swiss Grid (12 columns)
      const colWidth = width / 12;
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.05)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 12; i++) {
        const x = i * colWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines for rhythm
      const rowHeight = colWidth; // Square grid
      for (let i = 0; i <= height / rowHeight; i++) {
        const y = i * rowHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Trail
      ctx.beginPath();
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          ctx.strokeStyle = `rgba(128, 128, 128, ${p.opacity * 0.2})`;
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);

          p.opacity -= 0.01;
        }
      }

      points = points.filter((p) => p.opacity > 0);
      if (points.length > 50) points.shift();

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.8 }}
    />
  );
};
