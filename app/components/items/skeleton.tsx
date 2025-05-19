import { cn } from "@/lib/utils";


export default function Skeleton({
  image
}:{
  image?: string
}){
  return <div className={
    cn("flex flex-1 w-full h-full overflow-hidden min-h-[6rem] rounded-xl bg-gradient-to-br from-ctp-base to-ctp-crust", image ? 'bg-opacity-50' : '')
  } style={image ? {
    backgroundImage: 'url(' + image + ')',
    backgroundPosition: '0% 50%'
  } : {}}>
  </div>;
}