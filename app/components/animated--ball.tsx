import { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface TrailProps {
  scrollYProgress: MotionValue<number>;
  lineWidth?: number;
  onPointHit?: (index: number, point: Point) => void;
}

// Define your trail path as before
const predefinedPathRaw = [
  { x: "50%", y: "45%" },
  { x: "10%", y: "30%" },
  { x: "90%", y: "90%" },
  { x: "10%", y: "90%" },
  { x: "90%", y: "10%" },
];

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

type RawPoint = { x: string | number; y: string | number, hitpoint?: boolean };
type Point = { x: number; y: number, hitpoint?: boolean };

function resolvePercentPoints(points: RawPoint[], width: number, height: number): Point[] {
  return points.map(p => ({
    x: typeof p.x === "string" && p.x.endsWith("%")
      ? (parseFloat(p.x) / 100) * width
      : p.x,
    y: typeof p.y === "string" && p.y.endsWith("%")
      ? (parseFloat(p.y) / 100) * height
      : p.y,
  })) as any[];
}

function fillMissingPoints(points: Point[], step: number = 1): Point[] {
  const result: Point[] = [points[0]];

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const current = points[i];

    const dx = current.x - prev.x;
    const dy = current.y - prev.y;

    const steps = Math.max(
      Math.abs(dx / step),
      Math.abs(dy / step)
    );

    for (let s = 1; s < steps; s++) {
      result.push({
        x: prev.x + s * step * Math.sign(dx),
        y: prev.y + s * step * Math.sign(dy),
      });
    }

    result.push(current);
  }

  return result;
}
const ScrollTrailCanvas = ({ scrollYProgress, lineWidth = 6, onPointHit }: TrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const lastHitIndexRef = useRef<number>(-1); // Prevent repeat hits

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let predefinedPath: Point[] = [];
    const maxTrailLength = 100;

    const getPath = () => {
      const width = canvas.width;
      const height = canvas.height;
      const resolved = resolvePercentPoints(predefinedPathRaw as RawPoint[], width, height);
      return fillMissingPoints(resolved, 1);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      predefinedPath = getPath();
    };
    resize();
    window.addEventListener("resize", resize);

    let frameId: number;

    const animate = () => {
      const progress = progressRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const total = predefinedPath.length;
      const visibleCount = Math.max(2, Math.floor(progress * total));

      if (visibleCount > 2) {
        const start = Math.max(0, visibleCount - maxTrailLength);

        ctx.beginPath();
        ctx.moveTo(predefinedPath[start].x, predefinedPath[start].y);

        for (let i = start + 1; i < visibleCount - 1; i++) {
          const current = predefinedPath[i];
          const next = predefinedPath[i + 1];
          const xc = (current.x + next.x) / 2;
          const yc = (current.y + next.y) / 2;

          const t = (i - start) / maxTrailLength; // 0 to 1
          const alpha = t; // Fade in as it moves forward

          ctx.strokeStyle = `rgba(243, 139, 168, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";

          ctx.quadraticCurveTo(current.x, current.y, xc, yc);

          // Hitpoint check (as before)
          if (current.hitpoint && i > lastHitIndexRef.current) {
            lastHitIndexRef.current = i;
            onPointHit?.(i, current);
          }
        }

        ctx.stroke();
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [lineWidth, onPointHit]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default ScrollTrailCanvas;
