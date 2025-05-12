import { MotionValue, motion, useTransform } from "motion/react";
import { useMemo, useState } from "react";
import { Terminal } from "xterm";
import { LaptopCanvas, LaptopEvents } from "../laptop";
import { DripBottom } from "../drip-bottom";
import { CryoliLogo } from "../logo-cryoli";
import XTermTerminal, { useTerminalEvents } from "../XTermTerminal";
import { SlateNavItem } from "../items/slate-nav-item";
import { GiCubes } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";
import { RiFileZipLine } from "react-icons/ri";
import { LuPaintbrush } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function MainSection({ scrollYProgress }: {
  scrollYProgress: MotionValue<number>
}) {
  const [laptopPage, setLaptopPage] = useState(1);
  const [term, setTerm] = useState<null | Terminal>();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.01]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const terminalEvents = useTerminalEvents(term);
  const events = useMemo(() => new LaptopEvents(terminalEvents, 1), [terminalEvents, laptopPage]);

  return (
    <motion.div
      // style={{ scale, y, opacity }}
      className="min-w-full min-h-screen flex justify-between p-3"
    >
      <div className='w-[40%] relative rounded-t-3xl z-10 h-[75dvh] bg-[#181825] bg-opacity-70'>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <LaptopCanvas
              setPage={setLaptopPage}
              currentPage={laptopPage}
              rotation={Math.PI / 4}
              onClick={() => { }}
              events={events}
            />
          </div>
          <div className="flex justify-center">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16 border-2 border-background">
                <AvatarImage src="/profile.jpg" alt="@makano" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">Makano</h3>
                <p className="text-sm text-muted-foreground">@bushyice</p>
              </div>
            </CardHeader>
          </div>
          <div className="flex flex-wrap slate-nav-group" onClick={() => alert('Coming soon')}>
            <SlateNavItem
              icon={<GiCubes size={22} />}
              title="Maki-Labs"></SlateNavItem>
            <SlateNavItem
              icon={<FaPenNib size={22} />}
              title="Poetry"></SlateNavItem>
            <SlateNavItem
              icon={<RiFileZipLine size={22} />}
              title="Archive"></SlateNavItem>
            <SlateNavItem
              icon={<LuPaintbrush size={22} />}
              title="Arts"></SlateNavItem>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <DripBottom />
      </div>
      <div className='w-[50%] flex relative pr-10 pt-10 gap-5 justify-end z-10'>
        <div className="items w-[30%] flex justify-between mt-10 flex-col h-96">
          <div className="w-24 h-24 bg-opacity-60 bg-[#181825] rounded-full"></div>
          <div className="w-24 h-24 bg-opacity-60 bg-[#181825] flex items-center justify-center -ml-12 rounded-full">
            <CryoliLogo className='w-12' />
          </div>
          <div className="w-24 h-24 bg-opacity-60 bg-[#181825] rounded-full"></div>
        </div>
        <div className="terminal-output relative bg-[#181825] bg-opacity-70 rounded-t-3xl h-96 w-[50%]">
          <div className="m-4 relative overflow-x-hidden">
            <XTermTerminal
              onInit={(term) => { setTerm(term); }}
              onInput={(event) => events.call('keydown', event)} />
          </div>
          <DripBottom />
        </div>
      </div>
    </motion.div>
  );
}