'use client';
import { Post } from "@/app/models/post"
import { Badge } from "@/components/ui/badge";
import ReactMarkdown, { Components } from 'react-markdown';
import { ReactNode, useEffect, useState } from 'react';
import * as React from 'react';
import { getPost } from "@/app/controllers/posts";
import { CustomRenderers } from "@/app/models/md";
import { cn } from "@/lib/utils";
import Skeleton from "../../items/skeleton";


export default function PostDetail({ params }: { params: { detail: string } }) {

	const [post, setPost] = useState({
		title: "",
		subtitle: "",
		content: "",
		tags: []
	} as Post);

	useEffect(() => {
		getPost(params.detail)
			.then(setPost);
		location.hash = 'posts/' + params.detail
	}, []);

	return (
		<div className="m-5">
			<div className="text-xl font-bold">{'Posts/' + params.detail}</div>
			{post.title ? (<div className="my-5 space-y-2">
				<div className="w-full min-h-96 relative">
					{post.image && <img src={post.image} className="w-full object-cover rounded-lg" />}
					{post.image && <div className="w-full h-full bottom-0 absolute bg-gradient-to-t from-[#18182E] to-transparent" />}
					<div className={cn(post.image ? "absolute bottom-2 left-2" : '')}>
						<div className="text-3xl font-bold">{post.title}</div>
						<div className="text-2xl opacity-60">{post.subtitle}</div>
						<div className="flex gap-1 mt-2">{post.tags.map(tag => (<Badge key={tag}>{tag}</Badge>))}</div>
					</div>
				</div>
				<ReactMarkdown components={CustomRenderers} className='my-2'>{post.content.trim()}</ReactMarkdown>
			</div>) : (<div>
				<Skeleton />
			</div>)}
		</div>
	)
}