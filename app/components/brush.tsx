import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, motion, useSpring } from "motion/react";

interface TrailProps {
  scrollYProgress: MotionValue<number>;
  lineWidth?: number;
  onPointHit?: (index: number, point: Point) => void;
}

type RawPoint = { x: string | number; y: string | number; hitpoint?: boolean };
type Point = { x: number; y: number; hitpoint?: boolean };

// Define your path in % so it’s responsive
const predefinedPathRaw: RawPoint[] = [
  { x: "50%", y: "45%" },
  { x: "10%", y: "30%", hitpoint: false },
  { x: "90%", y: "90%" },
  { x: "10%", y: "90%", hitpoint: true },
  { x: "90%", y: "10%" },
  ...svgPathToPoints("M 460.9101,441.89785 590.34254,265.5032 644.17727,445.33411 456.32842,310.17457 l 269.17367,8.01794 z", 1, true),
  { x: "10%", y: "90%" },
];

function svgPathToPoints(pathString: string, step = 1, lastHitPoint = false): Point[] {
  const svgNamespace = "http://www.w3.org/2000/svg";

  // Create temporary SVG elements
  const tempSvg = document.createElementNS(svgNamespace, "svg");
  const tempPath = document.createElementNS(svgNamespace, "path");

  tempPath.setAttribute("d", pathString);
  tempSvg.appendChild(tempPath);
  document.body.appendChild(tempSvg); // Needed to compute length

  const length = tempPath.getTotalLength();
  const points: Point[] = [];

  for (let i = 0; i <= length; i += step) {
    const point = tempPath.getPointAtLength(i);
    points.push({ x: point.x, y: point.y });
  }

  if(lastHitPoint){
    points[points.length - 1].hitpoint = true;
  }

  // Clean up
  tempSvg.remove();

  return points;
}

function resolvePercentPoints(points: RawPoint[], width: number, height: number): Point[] {
  return points.map(p => ({
    x: typeof p.x === "string" && p.x.endsWith("%") ? (parseFloat(p.x) / 100) * width : p.x,
    y: typeof p.y === "string" && p.y.endsWith("%") ? (parseFloat(p.y) / 100) * height : p.y,
    hitpoint: p.hitpoint,
  })) as any;
}

function fillMissingPoints(points: Point[], step = 1): Point[] {
  const result: Point[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const current = points[i];
    const dx = current.x - prev.x;
    const dy = current.y - prev.y;
    const steps = Math.max(Math.abs(dx / step), Math.abs(dy / step));
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

const ScrollTrailSVG = ({ scrollYProgress, lineWidth = 6, onPointHit }: TrailProps) => {
  const [pathPoints, setPathPoints] = useState<Point[]>([]);
  const [visibleTrail, setVisibleTrail] = useState<Point[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastHitIndexRef = useRef(-1);

  // On resize, resolve points
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const resolved = resolvePercentPoints(predefinedPathRaw, w, h);
      setPathPoints(fillMissingPoints(resolved, 1));
      // setPathPoints(resolved);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 10,
    damping: 15,
    // bounce: 10
    velocity: 0.01
  });

  // On scroll progress change
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const total = pathPoints.length;
    const count = Math.floor(latest * total);
    const headLength = 100;
    const fadeLength = 100;

    const start = Math.max(0, count - headLength - fadeLength);
    const visible = pathPoints.slice(start, count);

    setVisibleTrail(visible);

    // Handle hitpoints
    const last = pathPoints[count - 1];
    if (last?.hitpoint && count - 1 > lastHitIndexRef.current) {
      lastHitIndexRef.current = count - 1;
      onPointHit?.(count - 1, last);
    }
  });

  // Convert visible trail to SVG path string
  const pathD = visibleTrail.reduce((acc, point, i, arr) => {
    if (i === 0) return `M${point.x},${point.y}`;
    const prev = arr[i - 1];
    const midX = (prev.x + point.x) / 2;
    const midY = (prev.y + point.y) / 2;
    return acc + ` Q${prev.x},${prev.y} ${midX},${midY}`;
  }, "");

  // Compute gradient trail effect
  const renderSegments = () => {
    const headLength = 100;
    const fadeLength = 100;
    const total = visibleTrail.length;

    return visibleTrail.map((point, i) => {
      if (i === 0) return null;
      const prev = visibleTrail[i - 1];

      let opacity = 1;

      if (i <= fadeLength) {
        opacity = i / fadeLength; // 0 at the start, 1 after fadeLength
      }

      return (
        <motion.line
          key={i}
          x1={prev.x}
          y1={prev.y}
          x2={point.x}
          y2={point.y}
          stroke="rgba(243, 139, 168, 1)"
          strokeOpacity={opacity}
          strokeWidth={lineWidth}
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <svg className="w-full h-full absolute" width="100%" height="100%">
        {renderSegments()}
      </svg>
    </div>
  );
};

export default ScrollTrailSVG;
