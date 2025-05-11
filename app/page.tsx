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
import { Card, CardContent } from '@/components/ui/card';
import { BentoGridItem } from '@/components/ui/bento-grid';
import { Brain, BrainCircuit, Flag, Github, Mail, Share } from 'lucide-react';
import Skeleton from './components/items/skeleton';
import { GiDiamonds } from "react-icons/gi";
import { PiHandshake } from "react-icons/pi";

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

      <div className="my-40 w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-6 relative">
        <div className='flex flex-col justify-center'>
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-ctp-subtext0 to-ctp-subtext1 bg-opacity-50">
            Maki-Kun
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            A man like any other trying to find a path of stablity, piece and order.
          </p>
        </div>

        <div className="col-span-1">
          <BentoGridItem 
            header={<Skeleton />}
            title="Philosophies"
            description={<p>I am a man of words, i believe that we live surrounded by emotional vocabulary and bound by emotional geometry. I take interest in feelings and with it comes love of bonds forged with feelings and words. Afterall, <b className='text-ctp-mauve'>without fellowship, we are but naught</b>.</p>}
            icon={<BrainCircuit />}
            // style={{
            //   backgroundSize: '300% 300%'
            // }}
            // className='transition-all duration-300 bg-[0_0] hover:bg-[75%_75%] bg-gradient-to-br from-transparent to-ctp-mantle'
          />
        </div>

        <div className="col-span-1">
          <BentoGridItem 
            header={<Skeleton />}
            title="Goals"
            description={<p>I am not one with a goal to follow, for i believe life is a journey to follow, not one to lead. I believe the cosmos unexplored are not those farther from reach, but the ones hidden deep within. witholding <b className='text-ctp-rosewater'>stories lost kept untold</b>.</p>}
            icon={<Flag />}
          />
        </div>
        
        <div className="col-span-2">
          <BentoGridItem 
            title="Makano's Verity"
            description={<>
              <p>I am by no means unique. I am but your everyday man looking for doors open. Although, if i had to describe myself, i'd name myself one who befallen the path of human creations. My life has long since i known been tailored with technology and like. Obsessive as i have been, as i stand now, i am but proud of my journey through the digits so miraculous. Today, i stand a man able to craft my emotions into such creation, and such work brings great fullfillment.</p>
              <br />
              <p>Anyways, History aside, I am a man holding the age of {Math.abs(new Date(Date.now() - new Date("08/03/2004").getTime()).getUTCFullYear() - 1970).toString()}. I entertain activities such coding, songs and philosophies. Aside; i am fond of video games, be it playing or creating. I do enjoy other means of entertainment as anime and ocassionally movies.</p>
            </>}
            icon={<span className="flex items-center">
              <GiDiamonds size={22} />
              <GiDiamonds />
            </span>}
          />
        </div>
        
        <div className="col-span-1">
          <BentoGridItem 
            header={<Skeleton />}
            title="Contact"
            description="I am one who always appreciates a discourse. So please, be not afraid to ask."
            icon={<PiHandshake size={22} />}
          />
        </div>

      </div>

      <div id="lll-1"></div>
      {Array(5).fill(0).map((_, i) => i)
        .map((i) => <div key={i} className="height-very-long w-full">hello {i}</div>)}
    </div>
  );
}
