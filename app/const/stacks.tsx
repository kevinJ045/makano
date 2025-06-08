
import { FaCube, FaDatabase, FaDocker, FaJava, FaLinux, FaNodeJs, FaReact, FaSass } from 'react-icons/fa';
import { SiBlender, SiCplusplus, SiFlutter, SiGodotengine, SiMongodb, SiNestjs, SiNextdotjs, SiNixos, SiPrisma, SiPython, SiRust, SiTailwindcss } from 'react-icons/si';

export const Stacks = {
  blender: {
    name: "Blender",
    icon: <SiBlender />,
    color: "bg-ctp-peach text-ctp-base",
    level: 60
  },
  godot: {
    name: "Godot",
    icon: <SiGodotengine />,
    color: "bg-ctp-blue text-ctp-base",
    level: 44
  },
  rust: {
    name: "Rust",
    icon: <SiRust />,
    color: "bg-ctp-peach text-ctp-base",
    level: 50
  },
  python: {
    name: "Python",
    icon: <SiPython />,
    color: "bg-gradient-to-r from-ctp-yellow to-ctp-blue text-ctp-base",
    level: 63
  },
  java: {
    name: "Java",
    icon: <FaJava />,
    color: "bg-ctp-yellow text-ctp-base",
    level: 55
  },
  flutter: {
    name: "Flutter",
    icon: <SiFlutter />,
    color: "bg-ctp-sky text-ctp-base",
    level: 43
  },
  cpp: {
    name: "C++",
    icon: <SiCplusplus />,
    color: "bg-ctp-mauve text-ctp-base",
    level: 62
  },
  react: {
    name: "React",
    icon: <FaReact />,
    color: "bg-ctp-mauve text-ctp-base",
    level: 66
  },
  nextjs: {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "bg-white text-ctp-base",
    level: 54
  },
  nestjs: {
    name: "NestJs",
    icon: <SiNestjs />,
    color: "bg-ctp-peach text-ctp-base",
    level: 61
  },

  linux: {
    name: "Linux",
    icon: <FaLinux />,
    color: "bg-ctp-crust text-ctp-text",
    level: 90
  },
  nixos: {
    name: "NixOS",
    icon: <SiNixos />,
    color: "bg-ctp-sky text-ctp-base",
    level: 45
  },
  docker: {
    name: "Docker",
    icon: <FaDocker />,
    color: "bg-ctp-blue text-ctp-base",
    level: 53
  },
  mongo: {
    name: "Mongo",
    icon: <SiMongodb />,
    color: "bg-ctp-green text-ctp-base",
    level: 60
  },
  prisma: {
    name: "Prisma",
    icon: <SiPrisma />,
    color: "bg-ctp-pink text-ctp-base",
    level: 54
  },
  sql: {
    name: "SQL",
    icon: <FaDatabase />,
    color: "bg-ctp-teal text-ctp-base",
    level: 75
  },

  tailwind: {
    icon: <SiTailwindcss />,
    name: "Tailwind",
    color: "bg-ctp-sky text-ctp-base",
    level: 76
  },
  sass: {
    icon: <FaSass />,
    name: "Sass",
    color: "bg-ctp-red text-ctp-base",
    level: 73
  },

  nodejs: {
    name: "Node.js",
    color: "bg-ctp-green text-ctp-base",
    level: 86,
    icon: <FaNodeJs />
  },
  threejs: {
    name: "Three.js",
    color: "bg-ctp-mauve text-ctp-base",
    level: 67,
    icon: <FaCube />
  }
};