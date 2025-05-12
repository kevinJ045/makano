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
import AboutSection from './components/sections/about-section';
import { CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SocialIcons from './components/items/social-icons';

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
      {/* <BlobPattern /> */}
      <BackgroundBeams />
      {/* </PerformanceIntensive> */}
      {/* <ScrollTrailSVG onPointHit={() => {
        alert('Hah')
      }} scrollYProgress={scrollYProgress} lineWidth={20} /> */}
      <MainSection scrollYProgress={scrollYProgress} />
      <AboutSection />
      <div className="w-full min-h-screen my-20 flex justify-center items-center">
        <div className='space-y-5'>
          <CardHeader className="flex flex-col items-center pb-2">
            <Avatar className="h-16 w-16 border-2 border-background">
              <AvatarImage src="/profile.jpg" alt="@makano" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">Makano</h3>
              <p className="text-sm text-muted-foreground">@bushyice</p>
            </div>
          </CardHeader>
          <SocialIcons />
          <p className='text-ctp-subtext1 font-bold text-[12px]'>More coming soon...</p>
        </div>
      </div>

      {/* <div id="lll-1"></div>
      {Array(5).fill(0).map((_, i) => i)
        .map((i) => <div key={i} className="height-very-long w-full">hello {i}</div>)} */}
    </div>
  );
}
