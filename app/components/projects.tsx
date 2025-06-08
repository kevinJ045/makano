import { useEffect, useState } from "react";
import { Todo } from "../models/todo";
import { getAllTodo } from "../controllers/todo";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import { Github, LinkIcon } from "lucide-react";
import { Stacks } from "../const/stacks";
import SkillLevelItem from "./stack";
import { cn, randFrom } from "@/lib/utils";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

function TodoPane({ todo } : { todo: Todo }){
  return <div className="space-y-10 relative">
    {
      todo.categories?.map(cat => (
      <BentoGridItem
        title={cat.title}
        description={
          <DraggableCardContainer className="w-full relative h-[80dvh] flex items-center justify-center overflow-clip">
            {
              cat.tasks.map(task => (<DraggableCardBody className={cn("absolute w-60 h-60 text-ctp-base", "bg-ctp-"+task.color.toString().toLowerCase())}>
                <div className="pointer-events-none h-44 text-center flex-col items-center justify-center flex">
                  <h3>
                    {
                      task.status.toString() == "Done" ?
                      <del>{task.title}</del>
                      : task.title
                    }
                  </h3>
                  {task.subtitle && <p>{task.status.toString() == "Done" ?
                      <del>{task.subtitle}</del>
                      : task.subtitle}</p>}
                </div>
              </DraggableCardBody>))
            }
          </DraggableCardContainer>
        }
      />
      ))
    }
  </div>
}

export default function RecentProjects(){
  const [todos, setTodos] = useState<Todo[]>([
    {
      name: "Loading",
      description: "Loading",
      categories: [],
      stack: [],
      collaborators: [],
    }
  ]);

  useEffect(() => {
    async function FetchTodos(){
      try{
        setTodos(await getAllTodo())
      } catch(e){
        FetchTodos();
      }
    }
    FetchTodos();
  }, []);

  return <div className="relative w-full overflow-clip">
    <Timeline data={todos.map(todo => ({
      title: todo.name,
      additional: <>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">
            {todo.description}
          </div>
          <div className="flex gap-2 flex-wrap">
            {todo.tags?.map(tag => <Badge>{tag}</Badge>)}
          </div>
          <div className="bg-gradient-to-r from-transparent via-ctp-base to-transparent h-[1px]" />
          <BentoGridItem
            title="Stack"
            description={
              <div className="flex gap-2 flex-wrap">
                {todo.stack?.map(tag => (Stacks as any)[tag] ? <SkillLevelItem showLevel={false} {...(Stacks as any)[tag]} /> : <Badge>{tag}</Badge>)}
              </div>
            }
          />
          <div className={cn("grid", todo.link ? "grid-cols-2" : "","gap-2")}>
            {
              todo.github && <BentoGridItem
                title="Github"
                icon={<Github />}
                onClick={() => window.open(todo.github)}
                description={todo.github}
              />
            }
            {
              todo.link && <BentoGridItem
                title="Open"
                icon={<LinkIcon />}
                onClick={() => window.open(todo.link)}
                description={todo.link}
              />
            }
          </div>
          {todo.collaborators.length && <BentoGridItem
            title="Collaborators"
            description={
              <div className="flex flex-row items-center justify-center my-1 w-full">
                {
                  todo.collaborators.map((username, i) => (
                    <div onClick={() => window.open(`https://github.com/${username}`)} className="group relative -mr-4" key={i}>
                      <img
                        height={100}
                        width={100}
                        src={`https://github.com/${username}.png`}
                        alt={username}
                        className="relative !m-0 h-14 w-14 rounded-full border-2 border-ctp-base object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
                      />
                    </div>
                  ))
                }
              </div>
            }
          />}
        </div>
      </>,
      icon: todo.icon,
      content: <TodoPane todo={todo} />,
    }))} />
  </div>
}