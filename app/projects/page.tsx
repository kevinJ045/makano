'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '../controllers/projects';
import { Project } from '../models/project';
import { ChevronRight, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function getTagColor(tag: string) {
  let color = 'red';
  switch (tag.toLowerCase()) {
    case 'js':
      color = '#f9e2af';
      break;
    case 'ts':
      color = '#89b4fa';
      break;
    case 'css':
      color = '#89dceb';
      break;
    case 'node':
      color = '#a6e3a1';
      break;
    case 'scss':
      color = '#f38ba8';
      break;
    case 'npm':
      color = '#fab387';
      break;
  }
  return color;
}

export function Projects({ length, page }: { page: number, length: number } = { page: 0, length: 20 }){
	const [projects, setProjects] = useState(new Array<Project>);
	useEffect(() => {
		if(!projects.length) getAllProjects(page, length)
		.then(setProjects);
	}, []);
	return (
		<>
			<div className="flex flex-wrap gap-2">
		
				{
					projects.map((project: Project) => (<>
						<Card className='w-[300px]'>
							<CardContent className='relative pt-4'>
							<div className='w-full h-[120px] flex justify-center items-center'>
							{project.image ? (
									<img src={project.image} className='w-full rounded-md'/>
								) : (
									<img src='/icon.grey.svg' className='w-[70px]'/>
								)}
							</div>
							<div className="my-4">
							<CardTitle>{project.name} {project.logo ? (
									<img src={project.logo} className='w-[40px] float-right'/>
								) : null}</CardTitle>
								
								{project.description}
								<div className="flex gap-1">{project.tags.map(tag => (<Badge variant="outline" style={{borderColor: getTagColor(tag), color: getTagColor(tag)}}>{tag}</Badge> ))}</div>
							</div>
							<Separator />
							<div className={"flex "+(project.git ? "justify-between" : 'justify-end')}>
								{project.git ? (
									<a target='_blank' href={project.git}>
										<Button variant='link'><Github /> Source</Button>
									</a>
								) : null}
								<a target='_blank' href={project.url}>
									<Button variant='link'>View <ChevronRight /></Button>
								</a>
							</div>
							</CardContent>
						</Card>
					</>))
				}

			</div>
		</>
	)
}

export default function ProjectsPage() {
  return (
    <div className="projects">
      <div className="text-xl font-bold"> Projects/ </div>
			<div className="px-1 py-5">
				<Projects length={20} page={0} />
			</div>
    </div>
  )
}
