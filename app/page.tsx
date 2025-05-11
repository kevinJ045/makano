'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import BlobPattern from './components/blobs';
import MainSection from './components/sections/main-section';
import { BackgroundBeams } from '@/components/ui/background-beams';
import ScrollTrailSVG from './components/brush';
import Archive from './archive/layout';
import PerformanceIntensive from './components/performance';
import CubesScene from './components/cubes';


export default function Home() {

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div
    className='w-screen h-screen'
    ref={containerRef}>
      {/* <PerformanceIntensive minFPS={10}> */}
        <BlobPattern />
        <BackgroundBeams />
      {/* </PerformanceIntensive> */}
      {/* <ScrollTrailSVG onPointHit={() => {
        alert('Hah')
      }} scrollYProgress={scrollYProgress} lineWidth={20} /> */}
      <MainSection scrollYProgress={scrollYProgress} />

      <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-ctp-subtext0 to-ctp-subtext1 bg-opacity-50">
            About Maki-Kun
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            A subtle yet effective spotlight effect, because the previous version
            is used a bit too much these days.
          </p>
        </div>

        <div className="magic-card relative w-96 h-96">
          {/* <CubesScene /> */}
        </div>
      </div>

      <div id="lll-1"></div>
      {Array(5).fill(0).map((_, i) => i)
        .map((i) => <div key={i} className="height-very-long w-full">hello {i}</div>)}
    </div>
  );
}
