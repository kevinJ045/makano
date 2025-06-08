"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copy, FileStack, Github, Home, LinkIcon, MoreVertical, Search, Send } from "lucide-react";
import { useEffect, useState } from "react";
import HomeArchive from "./pages/home";
import PostsPage, { Posts } from "./pages/posts";
import ProjectsPage from "./pages/projects";
import { cn } from "@/lib/utils";
import PostDetail from "./pages/post-detail";


export default function Archive({ close: closeL } : { close?: () => void }) {
  const [currentTab, setCurrentTab_r] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 700);

  const close = () => {
    closeL?.();
    location.hash = "#";
  }

  const setCurrentTab = (tab: any) => {
    setCurrentTab_r(tab);
    // location.hash = "#archive"
  }

  useEffect(() => {
    if(location.hash.match('#posts/')){
      setCurrentTab(<PostDetail params={{ detail: location.hash.split('#posts/')[1] }} />);
    } else setCurrentTab(<HomeArchive onOpen={(a) => setCurrentTab(a)} />)
  }, []);
  
  return (
    <div className="flex w-full select-none">
      <div className={cn("sidebar", sidebarOpen ? 'min-w-[260px]' : 'max-w-0 hidden')}>

        <div className="header">
          <div className="buttons">
            <div onClick={close} className="red"></div>
            <div className="yellow"></div>
            <div onClick={() => setSidebarOpen(!sidebarOpen)} className="green"></div>
          </div>

          <div className="title">Makano&apos;s Archive</div>

          <MoreVertical className="cursor-pointer" size={12} />
        </div>


        <div className='my-5 mx-3'>

          <div onClick={() => setCurrentTab(<HomeArchive onOpen={(a) => setCurrentTab(a)} />)} className="flex cursor-pointer gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <Home color='var(--theme-accent)' size={20} /> <span className='font-bold'>Home</span>
          </div>

          <div onClick={() => setCurrentTab(<PostsPage onOpen={(a) => setCurrentTab(a)} />)} className="flex cursor-pointer gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <Copy color='var(--theme-accent)' size={20} /> <span className='font-bold'>Posts</span>
          </div>

          <div onClick={() => setCurrentTab(<ProjectsPage />)} className="flex gap-2 items-center rounded-lg cursor-pointer px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
            <FileStack color='var(--theme-accent)' size={20} /> <span className='font-bold'>Projects</span>
          </div>
        </div>

      </div>



      <main className="w-full">

        <div className="headerbar">
          <img onClick={() => setSidebarOpen(!sidebarOpen)} src="/icon.svg" className='icon' />
          <div className="searchbar">
            <div className="icon">
              <Search size={20} />
            </div>
            <input type='text' className='select-auto' placeholder='Search...' />
          </div>
        </div>

        <div className="main h-[90dvh] overflow-scroll p-4">{currentTab}</div>
      </main>
    </div>
  )
}