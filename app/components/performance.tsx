import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minFPS?: number,
  testDuration?: number
};

const PerformanceIntensive: React.FC<Props> = ({ children, fallback = null, testDuration = 200, minFPS = 30 }) => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCanRender(false);
      return;
    }

    const start = performance.now();
    let frameCount = 0;

    let running = true;

    const testFrame = () => {
      if (!running) return;
      frameCount++;
      const now = performance.now();
      if (now - start < testDuration) {
        requestAnimationFrame(testFrame);
      } else {
        const fps = (frameCount / (now - start)) * 1000;
        const isCapable = fps >= minFPS && cores >= 4;
        setCanRender(isCapable);
      }
    };

    requestAnimationFrame(testFrame);

    return () => {
      running = false;
    };
  }, []);

  return <>{canRender ? children : fallback}</>;
};

export default PerformanceIntensive;
