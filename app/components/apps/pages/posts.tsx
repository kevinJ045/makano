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
import { BentoGridItem } from '@/components/ui/bento-grid';
import Skeleton from '../../items/skeleton';
import { cn } from '@/lib/utils';


export function Posts({ length, page, onOpen = () => { }, className }: { page: number, className?: string, length: number, onOpen?: (page: ReactNode) => void } = { page: 0, length: 20 }) {
  const [posts, setPosts] = useState(new Array<Post>);
  useEffect(() => {
    if (!posts.length) getAllPosts(page, length)
      .then(posts => setPosts(posts));
  }, []);
  return (
    <>
      <div className={cn("flex flex-col gap-2", className)}>

        {
          posts.length ? posts.map((post: Post) => (
            <>
              <BentoGridItem
                key={post.filename}
                header={<Skeleton image={post.image} />}
                title={post.title}
                description={
                  <div className="space-y-2">
                    <p>{post.subtitle}</p>
                    <div className="flex gap-1">{post.tags.map(tag => (<Badge>{tag}</Badge>))}</div>
                    <div className="flex justify-end">
                      <Button onClick={() => {
                        location.hash = "#posts/"+post.filename!
                        onOpen(<PostDetail params={{ detail: post.filename! }} />)
                      }} variant='link'>View <ChevronRight /></Button>
                    </div>
                  </div>
                }
              />
            </>
          )) : Array(4).fill(<BentoGridItem
                header={<Skeleton />}
                title={<div className='w-20 h-4 bg-white rounded-md' />}
                description={
                  <div className="space-y-2">
                    <div className='w-80 h-2 bg-gray-200 rounded-md' />
                    <div className="flex gap-1">{Array(3).fill(<Badge className='w-10 h-4' />)}</div>
                    <div className="flex justify-end">
                      <Button className='bg-gradient-to-r from-ctp-rosewater to-ctp-flamingo w-20' />
                    </div>
                  </div>
                }
              />)
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
