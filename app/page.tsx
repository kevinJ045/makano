'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Laptop3D, LaptopCanvas } from "./components/laptop";
import BlobPattern from './components/blobs';
import { DripBottom } from './components/drip-bottom';
import XTermTerminal from './components/XTermTerminal';
import { Terminal } from 'xterm';
import { CryoliLogo } from './components/logo-cryoli';
import AnimatedBall from './components/animated--ball';


export default function Home() {
  const [laptopPage, setLaptopPage] = useState(1);
  const [term, setTerm] = useState<null | Terminal>();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.01]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);


  return (
    <div
    className='w-screen h-screen'
    ref={containerRef}>
      <BlobPattern />
      <AnimatedBall scrollYProgress={scrollYProgress} lineWidth={20} />
      <motion.div
        style={{ scale, y, opacity }}
        className="min-w-full min-h-screen flex p-3"
      >
        <div className='w-[40%] relative rounded-t-3xl z-10 h-[75dvh] bg-[#181825] bg-opacity-90'>
          <LaptopCanvas
            setPage={setLaptopPage}
            currentPage={laptopPage}
            rotation={Math.PI / 4}
            onClick={() => { }}
            events={{
              "terminal:write_lines": (lines: string[]) => {
                lines.forEach(line => term?.writeln(line));
              },
              "terminal:set_input": (input: string) => {
                term?.write('\x1b[2K\r');
                term?.write(input);
              },
              "terminal:line_break": (input: string) => {
                term?.write('\n\r');
              },
              "terminal:clear": (input: string) => {
                term?.reset();
              }
            }} />
          <DripBottom />
        </div>
        <div className='w-[60%] flex relative pr-10 pt-10 gap-5 justify-end z-10'>
          <div className="items w-[30%] flex justify-between mt-10 flex-col h-96">
            <div className="w-24 h-24 bg-[#181825] rounded-3xl"></div>
            <div className="w-24 h-24 bg-[#181825] flex items-center justify-center -ml-12 rounded-3xl">
              <CryoliLogo className='w-12' />
            </div>
            <div className="w-24 h-24 bg-[#181825] rounded-3xl"></div>
          </div>
          <div className="terminal-output relative bg-[#181825] bg-opacity-90 rounded-t-3xl h-96 w-[50%]">
            <div className="p-4">
              <XTermTerminal onInit={(term) => { setTerm(term); }} />
            </div>
            <DripBottom />
          </div>
        </div>
      </motion.div>
      <div className="h-screen w-full">hello</div>
    </div>
  );
}
