"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "./avatar";
import Image from "next/image";

interface TimelineEntry {
  title: string;
  icon?: string;
  content: React.ReactNode;
  additional?: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [a, b] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, a]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-20 pb-5 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg block-title md:text-4xl mb-r max-w-4xl font-bold">
          My Projects
        </h2>
        <p className="relative text-center text-sm md:text-base max-w-sm mx-auto mt-7">
          A few projects that you can track or help out by joining the development in the githubs.
          <i> PS: Some of these are actually on my wall on physical sticky notes. :)</i>
        </p>
      </div>

      <div ref={ref} onMouseEnter={() => b(a+1)} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-ctp-mantle flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-ctp-red border border-ctp-crust p-2" />
              </div>
              <div className="hidden md:block md:pl-20">
                <div className="flex gap-2">
                  {item.icon && <img src={item.icon} alt={"logo"} width={100} />}
                  <h3 className="text-xl md:text-5xl font-bold text-ctp-subtext0 ">
                    {item.title}
                  </h3>
                </div>
                <div className="py-3">
                  {item.additional}
                </div>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-ctp-subtext0">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-ctp-base to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-ctp-red via-ctp-blue to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
