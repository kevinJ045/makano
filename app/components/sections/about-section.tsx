
import { Card, CardContent } from '@/components/ui/card';
import { BentoGridItem } from '@/components/ui/bento-grid';
import { Brain, BrainCircuit, Flag, Github, Mail, Share } from 'lucide-react';
import Skeleton from '../items/skeleton';
import { GiDiamonds } from "react-icons/gi";
import { PiHandshake } from "react-icons/pi";
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { FaCube, FaDatabase, FaDocker, FaJava, FaLinux, FaNodeJs, FaReact, FaSass } from 'react-icons/fa';
import { SiBlender, SiCplusplus, SiFlutter, SiGodotengine, SiMongodb, SiNestjs, SiNextdotjs, SiNixos, SiPrisma, SiPython, SiRust, SiTailwindcss } from 'react-icons/si';

type skill = {
  name: string,
  color: string,
  level: number,
  icon?: ReactNode
};

function SkillLevelItem({
  name,
  icon,
  color,
  level,
  showLevel = true
}: skill & {
  showLevel?: boolean
}) {
  return (<div className={cn(showLevel ? "flex gap-2 items-center" : "w-auto")}>
    <Badge className={cn('space-x-[5px]', color, showLevel ? 'w-[110px]' : '')}>
      {icon || <span className='w-3 h-3 bg-ctp-base rounded-full'></span>} <span>{name}</span>
    </Badge>
    {showLevel && <Progress color={color} value={level} />}
  </div>)
}

function SkillGroup({
  skills,
  icon,
  title
}: {
  icon: string,
  title: string,
  skills: skill[]
}) {
  const [showLevel, setShowLevel] = useState(true);

  return (<BentoGridItem
    header={
      <Image
        src={icon}
        width={80}
        height={80}
        alt='CSS'
      />
    }
    onClick={() => {
      setShowLevel(!showLevel)
    }}
    title={title}
    description={
      <div className={
        cn(
          'flex',
          showLevel ? 'flex-col gap-3' : 'gap-1 flex-wrap'
        )
      }>
        {skills.map((props) => <SkillLevelItem
          key={props.name}
          showLevel={showLevel}
          {...props}
        />)}
      </div>
    }
  />)
}

export default function AboutSection() {

  const [about, setAbout] = useState<'me' | 'stack'>('me');

  return (
    <div className="my-40 w-full min-h-screen p-10 flex flex-col md:grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 relative">

      <div className='col-span-1 flex flex-col justify-center space-y-4'>
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-ctp-subtext0 to-ctp-subtext1 bg-opacity-50">
          Maki-Kun
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          A man like any other trying to find a path of stablity, piece and order.
        </p>
        <Button className='bg-ctp-mauve w-32 rounded-full mx-auto' onClick={() => setAbout(about == 'me' ? 'stack' : 'me')}>{
          about == 'me' ? 'Tech Stack' : 'About Me'
        }</Button>
      </div>

      {about == 'me' ? <>

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
        </div></> : <>

        <div className="col-span-1 space-y-4">
          <SkillGroup
            title="Javascript"
            icon="/javascript.png"
            skills={[
              {
                name: "Vanilla",
                color: "bg-ctp-yellow text-ctp-base",
                level: 89
              },
              {
                name: "Node.js",
                color: "bg-ctp-green text-ctp-base",
                level: 86,
                icon: <FaNodeJs />
              },
              {
                name: "Three.js",
                color: "bg-ctp-mauve text-ctp-base",
                level: 67,
                icon: <FaCube />
              }
            ]}
          />

          <SkillGroup
            title='CSS'
            icon='/css.png'
            skills={[
              {
                name: "Vanilla",
                color: 'bg-ctp-blue text-ctp-base',
                level: 83
              },
              {
                icon: <SiTailwindcss />,
                name: "Tailwind",
                color: "bg-ctp-sky text-ctp-base",
                level: 76
              },
              {
                icon: <FaSass />,
                name: "Sass",
                color: "bg-ctp-red text-ctp-base",
                level: 73
              }
            ]}
          />
        </div>

        <div className='space-y-4 col-span-1 relative'>
          <SkillGroup
            title="Others"
            icon="/stack.png"
            skills={[
              {
                name: "Blender",
                icon: <SiBlender />,
                color: "bg-ctp-peach text-ctp-base",
                level: 60
              },
              {
                name: "Godot",
                icon: <SiGodotengine />,
                color: "bg-ctp-blue text-ctp-base",
                level: 44
              },
              {
                name: "Rust",
                icon: <SiRust />,
                color: "bg-ctp-peach text-ctp-base",
                level: 50
              },
              {
                name: "Python",
                icon: <SiPython />,
                color: "bg-gradient-to-r from-ctp-yellow to-ctp-blue text-ctp-base",
                level: 63
              },
              {
                name: "Java",
                icon: <FaJava />,
                color: "bg-ctp-yellow text-ctp-base",
                level: 55
              },
              {
                name: "Flutter",
                icon: <SiFlutter />,
                color: "bg-ctp-sky text-ctp-base",
                level: 43
              },
              {
                name: "C++",
                icon: <SiCplusplus />,
                color: "bg-ctp-mauve text-ctp-base",
                level: 62
              }
            ]}
          />


          <div className="w-full relative md:absolute">
            <SkillGroup
              title="Database and System"
              icon="/db.png"
              skills={[
                {
                  name: "Linux",
                  icon: <FaLinux />,
                  color: "bg-ctp-crust text-ctp-text",
                  level: 90
                },
                {
                  name: "NixOS",
                  icon: <SiNixos />,
                  color: "bg-ctp-sky text-ctp-base",
                  level: 45
                },
                {
                  name: "Docker",
                  icon: <FaDocker />,
                  color: "bg-ctp-blue text-ctp-base",
                  level: 53
                },
                {
                  name: "Mongo",
                  icon: <SiMongodb />,
                  color: "bg-ctp-green text-ctp-base",
                  level: 60
                },
                {
                  name: "Prisma",
                  icon: <SiPrisma />,
                  color: "bg-ctp-pink text-ctp-base",
                  level: 54
                },
                {
                  name: "SQL",
                  icon: <FaDatabase />,
                  color: "bg-ctp-teal text-ctp-base",
                  level: 75
                }
              ]}
            />
          </div>
        </div>

        <div className="col-span-2">
          <SkillGroup
            title="Typescript"
            icon="/typescript.png"
            skills={[
              {
                name: "Language",
                color: "bg-ctp-blue text-ctp-base",
                level: 86
              },
              {
                name: "React",
                icon: <FaReact />,
                color: "bg-ctp-mauve text-ctp-base",
                level: 66
              },
              {
                name: "Next.js",
                icon: <SiNextdotjs />,
                color: "bg-white text-ctp-base",
                level: 54
              },
              {
                name: "NestJs",
                icon: <SiNestjs />,
                color: "bg-ctp-peach text-ctp-base",
                level: 61
              }
            ]}
          />
        </div>

      </>}

    </div>);
}