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


export function Posts({ length, page, onOpen = () => { } }: { page: number, length: number, onOpen?: (page: ReactNode) => void } = { page: 0, length: 20 }) {
  const [posts, setPosts] = useState(new Array<Post>);
  useEffect(() => {
    if (!posts.length) getAllPosts(page, length)
      .then(posts => setPosts(posts));
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">

        {
          posts.map((post: Post) => (
            <>
              <BentoGridItem
                key={post.filename}
                header={<Skeleton image={post.image} />}
                title={post.title}
                description={
                  <div className="space-y-2">
                    <div className="flex gap-1">{post.tags.map(tag => (<Badge>{tag}</Badge>))}</div>
                    <div className="flex justify-end">
                      <Button onClick={() => onOpen(<PostDetail params={{ detail: post.filename! }} />)} variant='link'>View <ChevronRight /></Button>
                    </div>
                  </div>
                }
              />
            </>
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
