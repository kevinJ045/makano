'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BlobPattern from './components/blobs';
import MainSection from './components/sections/main-section';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
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
import dynamic from "next/dynamic";
import ScriffLogo from './components/scriff-logo';
const Labs = dynamic(() => import('./components/labs'), {
  ssr: false,
});
const IovieComponent = dynamic(() => import('./components/iovie'), {
  ssr: false,
});

export default function Home() {

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
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
      className='w-screen'
      ref={containerRef}>
      {/* <PerformanceIntensive minFPS={10}> */}
      <BlobPattern />
      <div className="-z-10 fixed w-screen h-screen">
        <BackgroundBeams />
      </div>
      {/* </PerformanceIntensive> */}
      {/* <ScrollTrailSVG onPointHit={() => {
      }} scrollYProgress={scrollYProgress} lineWidth={20} /> */}
      <MainSection openPage={(page) => {
        if (page == "archive") setAhowArchive(true)
        if (page == "labs") setShowLabs(true)
      }} scrollYProgress={scrollYProgress} />
      <AboutSection />

      <div className='w-full min-h-screen hidden md:block'>
        <div className="max-w-7xl mx-auto pt-20 pb-5 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg block-title md:text-4xl mb-r max-w-4xl font-bold">
            Memories
          </h2>
          <p className="relative text-center text-sm md:text-base max-w-sm mx-auto mt-7">
            A few of the things i made in the past
          </p>
        </div>
          
        
        <StickyScroll content={
          [
            {
              title: "Iovie",
              description:
                "IOVIE had been a simple fun project since the day i started it, it has simple characters, simple graphics, and overall simple code(probably).\nThe game is not made with any game engine but all with three.js, and with a server to enable multiplayer.\nThe game isn't done, and so far has 8 items out of the 140 i planned to add into it, and i'm slowly making up everything one by one.",
              content: (
                <IovieComponent />
              ),
            }, {
              title: "Scriff",
              description:
                "Scriff - The refined terminal based webOS\nScriff, has been a passion project, connecting the aspects of a terminal, a code editor and UI to make a simple basic operating system. it's an online operating system with a simple file system, a simple code editor for js/python/shell and a simple terminal.\nYou can code anything inside it, either as an app or a plugin, and you can use it to build beautiful apps and maybe even games.",
              content: (
                <ScriffLogo width={'50%'} height={'100%'} />
              ),
            },
          ]
        } />
      </div>

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
      <WindowDialog Page={Labs as any} show={showLabs} close={() => setShowLabs(false)} />

      {/* <div id="lll-1"></div>
      {Array(15).fill(0).map((_, i) => i)
        .map((i) => <div key={i} className="height-very-long w-full">hello {i}</div>)} */}
    </div>
  );
}
