import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type skill = {
  name: string,
  color: string,
  level: number,
  icon?: ReactNode
};

export default function SkillLevelItem({
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