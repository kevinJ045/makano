import { MotionValue, motion, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Terminal } from "xterm";
import { LaptopCanvas, LaptopEvents } from "../laptop";
import { DripBottom } from "../drip-bottom";
import { CryoliLogo } from "../logo-cryoli";
import { SlateNavItem } from "../items/slate-nav-item";
import { GiCubes } from "react-icons/gi";
import { FaPenNib } from "react-icons/fa";
import { RiFileZipLine } from "react-icons/ri";
import { LuPaintbrush } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";
import SocialIcons from "../items/social-icons";
import dynamic from "next/dynamic";
import { useTerminalEvents } from "@/app/controllers/terminal";
const XTermTerminal = dynamic(() => import('../XTermTerminal'), {
  ssr: false,
});

export default function MainSection({ scrollYProgress, openPage = () => alert('Coming soon...') }: {
  scrollYProgress: MotionValue<number>,
  openPage?: (page: string) => void
}) {
  const [laptopPage, setLaptopPage] = useState(0);
  const [term, setTerm] = useState<null | Terminal>();

  const termRef = useRef<any>(null);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.01]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const terminalEvents = useTerminalEvents(termRef);
  const events = useMemo(() => new LaptopEvents(terminalEvents, 1), [terminalEvents, laptopPage]);

  return (
    <motion.div
      style={{ scale, y, opacity }}
      className="min-w-full min-h-screen flex flex-col md:flex-row gap-10 md:gap-0 justify-between p-3"
    >
      <div className='w-full md:w-[40%] relative rounded-t-3xl z-10 h-auto md:h-[75dvh] pb-4 bg-[#181825] bg-opacity-70'>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <LaptopCanvas
              setPage={setLaptopPage}
              currentPage={laptopPage}
              rotation={Math.PI / 4}
              onClick={() => { }}
              events={events}
              scrollYProgress={scrollYProgress}
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
          <div className="flex flex-wrap slate-nav-group">
            <SlateNavItem
              onClick={() => openPage('labs')}
              icon={<GiCubes size={22} />}
              title="Maki-Labs"></SlateNavItem>
            <SlateNavItem
              onClick={() => openPage('poetry')}
              icon={<FaPenNib size={22} />}
              title="Poetry"></SlateNavItem>
            <SlateNavItem
              onClick={() => openPage('archive')}
              icon={<RiFileZipLine size={22} />}
              title="Archive"></SlateNavItem>
            <SlateNavItem
              onClick={() => openPage('arts')}
              icon={<LuPaintbrush size={22} />}
              title="Arts"></SlateNavItem>
          </div>
          <SocialIcons />
        </div>
        <DripBottom />
      </div>
      <div className='w-[50%] hidden md:flex relative pr-10 pt-10 gap-5 justify-end z-10'>
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
              onInit={(term) => { termRef.current = term }}
              onInput={(event) => events.call('keydown', event)} />
          </div>
          <DripBottom />
        </div>
      </div>
    </motion.div>
  );
}