import { Copy, FileStack, Github, Home, LinkIcon, Mail, MoreVertical, Search, Send, User } from 'lucide-react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className+' dark'}>

        <div className="sidebar">

          <div className="header">
            <div className="buttons">
              <div className="red"></div>
              <div className="yellow"></div>
              <div className="green"></div>
            </div>

            <div className="title">Makano's Archive</div>

            <MoreVertical className="cursor-pointer" size={12}/>
          </div>

          <div className="h-[100px] w-full gap-[10px] flex flex-col justify-center text-center items-center">
            
            <div className='w-50'>
              <Avatar>
                <AvatarImage src="https://github.com/kevinj045.png" alt="@shadcn" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
            </div>

            <div>
              <div className="text-l font-bold mb-2"> Makano </div>
              <Separator />
              <div className="mt-2 flex h-5 items-center space-x-4 text-sm">
                <div className='opacity-80'>Programmer</div>
                <Separator orientation="vertical" />
                <div className='opacity-80'>19</div>
              </div>
            </div>

          </div>

          <div className='my-5 mx-3'>

            <Link href='/' className="flex gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
              <Home color='var(--theme-accent)' size={20} /> <span className='font-bold'>Home</span>
            </Link>

            <Link href='/posts' className="flex gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
              <Copy color='var(--theme-accent)' size={20} /> <span className='font-bold'>Posts</span>
            </Link>

            <Link href='/projects' className="flex gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
              <FileStack color='var(--theme-accent)' size={20} /> <span className='font-bold'>Projects</span>
            </Link>

            <Link href='/about' className="flex gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
              <User color='var(--theme-accent)' size={20} /> <span className='font-bold'>About Me</span>
            </Link>

            <Link href='/contact' className="flex gap-2 items-center rounded-lg px-3 py-2 dark:text-white dark:hover:bg-[#11111b]">
              <Mail color='var(--theme-accent)' size={20} /> <span className='font-bold'>Contact Me</span>
            </Link>

          </div>

          <div className="absolute bottom-0 p-[10px] flex gap-0 justify-between w-full">
            <a href="https://github.com/kevinj045">
              <Github color='var(--theme-accent)' />
            </a>
            <div className="flex gap-[10px]">
              <a href="https://portfolio-kevinj045.vercel.app">
                <LinkIcon color='var(--theme-accent)' />
              </a>
              <div className="mt-[8px] w-[10px] h-[10px] bg-[var(--theme-accent)] opacity-60 rounded-full"></div>
              <a href="https://t.me/bushyice">
                <Send color='var(--theme-accent)' />
              </a>
            </div>
          </div>

        </div>

        

        <main>

          <div className="headerbar">
            <img src="/icon.svg" className='icon' />
            <div className="searchbar">
              <div className="icon">
                <Search size={20} />
              </div>
              <input type='text' placeholder='Search...' />
            </div>
          </div>

          <div className="main">{children}</div>
        </main>

      </body>
    </html>
  )
}
