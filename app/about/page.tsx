'use client';
import ReactMarkdown, { Components } from 'react-markdown';
import { ReactNode, useEffect, useState } from 'react';
import { CustomRenderers } from '../models/md';

export default function AboutMePage(){
	const [content, setContent] = useState('loading');
	useEffect(() => {
		fetch('https://raw.githubusercontent.com/kevinJ045/kevinj045/main/README.md')
		.then(r => r.text())
		.then(setContent);
	}, []);
	return (
		<div className="about">

			<div className="text-xl font-bold"> About Me/ </div>

			<div className="m-5">
				<ReactMarkdown components={CustomRenderers} className='my-2'>{content.trim()}</ReactMarkdown>
			</div>

		</div>
	)
}