import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copy, FileStack, Github, Home, LinkIcon, MoreVertical, Search, Send } from "lucide-react";
import { useState } from "react";
import HomeArchive from "./pages/home";
import PostsPage, { Posts } from "./pages/posts";
import ProjectsPage from "./pages/projects";


export default function Archive({ close } : { close?: () => void }) {
  const [currentTab, setCurrrentTab] = useState<any>(<HomeArchive />);

  
  return (
    <div className="flex w-full">
      <div className="sidebar min-w-[260px]">

        <div className="header">
          <div className="buttons">
            <div onClick={close} className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>

          <div className="title">Makano&apos;s Archive</div>

          <MoreVertical className="cursor-pointer" size={12} />
        </div>


        <div className='my-5 mx-3'>

          <div onClick={() => setCurrrentTab(<HomeArchive onOpen={(a) => setCurrrentTab(a)} />)} className="flex cursor-pointer gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <Home color='var(--theme-accent)' size={20} /> <span className='font-bold'>Home</span>
          </div>

          <div onClick={() => setCurrrentTab(<PostsPage onOpen={(a) => setCurrrentTab(a)} />)} className="flex cursor-pointer gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <Copy color='var(--theme-accent)' size={20} /> <span className='font-bold'>Posts</span>
          </div>

          <div onClick={() => setCurrrentTab(<ProjectsPage />)} className="flex gap-2 items-center rounded-lg cursor-pointer px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <FileStack color='var(--theme-accent)' size={20} /> <span className='font-bold'>Projects</span>
          </div>
        </div>

      </div>



      <main className="w-full">

        <div className="headerbar">
          <img src="/icon.svg" className='icon' />
          <div className="searchbar">
            <div className="icon">
              <Search size={20} />
            </div>
            <input type='text' placeholder='Search...' />
          </div>
        </div>

        <div className="main h-[90dvh] overflow-scroll p-4">{currentTab}</div>
      </main>
    </div>
  )
}