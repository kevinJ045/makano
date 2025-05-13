'use client';
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react';
import { Post } from '@/app/models/post';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllPosts } from '@/app/controllers/posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PostDetail from './post-detail';


export function Posts({ length, page, onOpen = () => { } }: { page: number, length: number, onOpen?: (page: ReactNode) => void } = { page: 0, length: 20 }) {
  const [posts, setPosts] = useState(new Array<Post>);
  useEffect(() => {
    if (!posts.length) getAllPosts(page, length)
      .then(posts => setPosts(posts));
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-2">

        {
          posts.map((post: Post) => (
            <Card key={post.filename} className='w-[350px]'>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">{post.tags.map(tag => (<Badge>{tag}</Badge>))}</div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => onOpen(<PostDetail params={{ detail: post.filename! }} />)} variant='link'>View <ChevronRight /></Button>
              </CardFooter>
            </Card>
          ))
        }

      </div>
    </>
  )
}

export default function PostsPage({
  onOpen
}: {
  onOpen?: (page: ReactNode) => void
}) {
  return (
    <div className="posts">
      <div className="text-xl font-bold"> Posts/ </div>
      <div className="px-1 py-5">
        <Posts onOpen={onOpen} length={20} page={0} />
      </div>
    </div>
  )
}
