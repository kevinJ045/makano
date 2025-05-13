'use client';
import { Post } from "@/app/models/post"
import { Badge } from "@/components/ui/badge";
import ReactMarkdown, { Components } from 'react-markdown';
import { ReactNode, useEffect, useState } from 'react';
import * as React from 'react';
import { getPost } from "@/app/controllers/posts";
import { CustomRenderers } from "@/app/models/md";


export default function PostDetail({ params }: { params: { detail: string } }){

	const [post, setPost] = useState({
		title: "",
		subtitle: "",
		content: "",
		tags: []
	} as Post);

	useEffect(() => {
		getPost(params.detail)
		.then(setPost);
	}, []);

	return (
		<div className="m-5">
			<div className="text-xl font-bold">{ 'Posts/'+params.detail }</div>
			{post.title ? (<div className="my-5">
				<div className="text-3xl">{post.title}</div>
				<div className="text-2xl opacity-60">{post.subtitle}</div>
				<div className="flex gap-1">{post.tags.map(tag => (<Badge>{tag}</Badge> ))}</div>
				<ReactMarkdown components={CustomRenderers} className='my-2'>{post.content.trim()}</ReactMarkdown>
			</div>) : (<div>loading</div>)}
		</div>
	)
}