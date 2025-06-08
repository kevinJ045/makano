'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import BlobPattern from './components/blobs';
import MainSection from './components/sections/main-section';
import { BackgroundBeams } from '@/components/ui/background-beams';
import ScrollTrailSVG from './components/brush';
import PerformanceIntensive from './components/performance';
import CubesScene from './components/cubes';
import AboutSection from './components/sections/about-section';
import { CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SocialIcons from './components/items/social-icons';
import Archive from './components/apps/archive';
import WindowDialog from './components/apps/dialog';
import RecentProjects from './components/projects';
import { Posts } from './components/apps/pages/posts';
import { Labs } from './components/labs';
import BookViewer from './components/books';

export default function Home() {

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    // target: containerRef,
    offset: ["start start", "end start"]
  });

  const [showArchive, setAhowArchive] = useState(false);
  const [showLabs, setShowLabs] = useState(false);

  useEffect(() => {
    setAhowArchive(location.hash.startsWith('#posts/'));
  }, []);

  useEffect(() => {
    (window as any).labsOpen = showLabs;
  }, [showLabs]);

  return (
    <div
      className='w-screen h-screen'
      ref={containerRef}>
      {/* <PerformanceIntensive minFPS={10}> */}
      <BlobPattern />
      <BackgroundBeams />
      {/* </PerformanceIntensive> */}
      {/* <ScrollTrailSVG onPointHit={() => {
      }} scrollYProgress={scrollYProgress} lineWidth={20} /> */}
      <MainSection openPage={(page) => {
        if (page == "archive") setAhowArchive(true)
        if (page == "labs") setShowLabs(true)
      }} scrollYProgress={scrollYProgress} />
      <AboutSection />

      <div className='w-full min-h-screen'>
        <div className="max-w-7xl mx-auto pt-20 pb-5 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg block-title md:text-4xl mb-r max-w-4xl font-bold">
            Posts
          </h2>
          <p className="relative text-center text-sm md:text-base max-w-sm mx-auto mt-7">
            Here's a few of my latest posts if you wanna get to that
          </p>
        </div>

        <div className="w-10/12 mx-auto">
          <Posts onOpen={() => {
            setAhowArchive(true);
          }} length={4} page={0} className={"grid md:grid-cols-2"} />
        </div>
      </div>

      <RecentProjects />


      {/* <div className="relative h-screen">
        <BookViewer
          color="#f5f0e1"
          coverTitle="My Dynamic Book"
          coverSubtitle="Some dynamic book"
          pages={[
            <section key="1">
              <p><strong>Abstract:</strong> This is the first page.</p>
            </section>,
            <section key="2">
              <p><strong>Chapter 1:</strong> Here's the second page.</p>
            </section>,
            <section key="3">
              <p><strong>Conclusion:</strong> The end.</p>
            </section>,
          ]}
        />
      </div> */}

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
      {/* <Archive /> */}

      <WindowDialog Page={Archive} show={showArchive} close={() => setAhowArchive(false)} />
      <WindowDialog Page={Labs} show={showLabs} close={() => setShowLabs(false)} />

      {/* <div id="lll-1"></div>
      {Array(15).fill(0).map((_, i) => i)
        .map((i) => <div key={i} className="height-very-long w-full">hello {i}</div>)} */}
    </div>
  );
}
