'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Post } from '../models/post';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from '../controllers/posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';


export function Posts({ length, page }: { page: number, length: number } = { page: 0, length: 20 }){
	const [posts, setPosts] = useState(new Array<Post>);
	useEffect(() => {
		if(!posts.length) getAllPosts(page, length)
		.then(posts => setPosts(posts));
	}, []);
	return (
		<>
			<div className="flex flex-wrap gap-2">
				
				{
					posts.map((post: Post) => (<>
						<Card className='w-[350px]'>
							<CardHeader>
								<CardTitle>{post.title}</CardTitle>
								<CardDescription>{post.subtitle}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex gap-1">{post.tags.map(tag => (<Badge>{tag}</Badge> ))}</div>
							</CardContent>
							<CardFooter className="flex justify-end">
								<Link href={'/posts/'+post.filename}>
									<Button variant='link'>View <ChevronRight /></Button>
								</Link>
							</CardFooter>
						</Card>
					</>))
				}

			</div>
		</>
	)
}

export default function PostsPage() {
  return (
    <div className="posts">
      <div className="text-xl font-bold"> Posts/ </div>
			<div className="px-1 py-5">
				<Posts length={20} page={0} />
			</div>
    </div>
  )
}
