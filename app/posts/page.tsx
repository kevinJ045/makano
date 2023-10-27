'use client';
import Image from 'next/image'
import { useState } from 'react';
import { Post } from '../models/post';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function Posts(){
	const [posts, setPosts] = useState([]);
	return (
		<>
			<div className="grid">
				
				{
					posts.map((post: Post) => (<>
						<Card className='w-[350]'>
							<CardHeader>
								<CardTitle>{post.title}</CardTitle>
								<CardDescription>{post.subtitle}</CardDescription>
							</CardHeader>
							<CardContent>
								{post.content}
							</CardContent>
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
			<Posts />
    </div>
  )
}
