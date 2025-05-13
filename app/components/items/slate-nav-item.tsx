import { ReactNode } from "react"


export function SlateNavItem({
  title,
  icon,
  onClick
} : {
  onClick?: any,
  title: string,
  icon?: ReactNode
}){
  return <div onClick={onClick} className="w-1/2 h-12 flex slate-nav-item relative group cursor-pointer items-center justify-center gap-4">
    <span className="group-hover:scale-110 group-hover:text-ctp-blue duration-300 scale-100 text-ctp-red">{icon}</span>
    <p className="from-ctp-blue to-ctp-red bg-gradient-to-tr bg-clip-text w-[40%] group-hover:text-transparent text-ctp-red font-semibold">{title}</p>
  </div>
}