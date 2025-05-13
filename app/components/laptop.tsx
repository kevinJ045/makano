import React, { useEffect, useRef, useState } from 'react';
import { execCommand, existsCommand } from '../context/commands';
import { useTransform, motion, useScroll } from "motion/react";
import { WelcomeText } from '../const/welcome';


const ANSI_REGEX = /\x1b\[[0-9;]*m/;
const e: Record<string, any[]> = {};
const l: Record<string, Record<string, (...data: any[]) => void>> = {};
export class LaptopEvents {
	id = 0;
	_events: any[] = [];
	listeners?: Record<string, (...data: any[]) => void>;
	setPage: (num: number) => void = (num: number) => {};

	constructor(listeners?: Record<string, () => void>, id?: number){
		this.id = id || Object.keys(e).length;
		if(listeners) l[this.id] = listeners;

		e[this.id] = [];
	}

	removeAll(){
		e[this.id].forEach(({ event, callback }: { event: string, callback: (...args: any[]) => any }) => {
			document.removeEventListener(event, callback);
		});
	}
	on(event: string, callback: (...args: any[]) => any){
		document.addEventListener(event, callback);
		e[this.id].push({ event, callback });
	}
	call(name: string, ...data: any[]){
		e[this.id]
		.filter(({ event }) => event == name)
		.map(({ callback }) => callback(...data))
	}
	emit (event: string, ...data: any[]) {
		if(l[this.id]?.[event]){
			l[this.id][event](...data);
		}
	}
}

export const pageData = [
	{
		pageId: 1,
		screen: (ctx: any, isUpdate: any, delta: any, states: any, events: any) => {
			const canvasWidth = ctx.canvas.width;
			const canvasHeight = ctx.canvas.height;

			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			if (!isUpdate) {
				states.textY = canvasHeight * 0.1;
				states.lineHeight = 100;
				states.messages = [
					'Booting Linux...',
					'Initializing system...',
					'Mounting filesystems...',
					'Checking disk...',
					'Starting services...',
					'Loading kernel modules...',
					'Configuring network...',
					'Starting login services...',
					'Linux boot completed.',
				];
				states.currentMessage = 0;
				states.lastUpdate = 0;
			} else {
				states.lastUpdate += 1;
				if (states.lastUpdate > 10) {
					states.currentMessage = (states.currentMessage + 1) % states.messages.length;
					states.lastUpdate = 0;
					if (states.currentMessage == 0) {
						events.setPage(1);
						return true;
					}
				}
			}

			ctx.fillStyle = 'white';
			ctx.font = '20px monospace';

			for (let i = 0; i < states.messages.length; i++) {
				ctx.fillText(states.messages[i], canvasWidth * 0.1, states.textY + i * states.lineHeight);
			}

			ctx.fillStyle = '#00ff00';
			ctx.fillText(states.messages[states.currentMessage], canvasWidth * 0.1, states.textY + states.currentMessage * states.lineHeight);

			return true;
		},
		content: () => <div>Page 2 Content</div>,
		title: "Linux Boot Screen",
	},
	{
		pageId: 4,
		screen: (ctx: any, isUpdate: any, delta: any, states: any, events: any) => {
			const canvasWidth = ctx.canvas.width;
			const canvasHeight = ctx.canvas.height;

			ctx.fillStyle = '#11111e';
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			if (!isUpdate) {
				states.textY = canvasHeight * 0.2;
				states.lineHeight = 12;
				states.history = [];
				states.introDone = false;				
				states.currentInput = '';
				states.prompt = '$ ';
				states.introText = '$ cat /home/makano/welcome.txt\n' + WelcomeText;
				states.currentIntroIndex = 0;
				states._frame = 0;
				states.writeLine = (...lines: string[]) => {
					states.history.push(...lines);
					events.emit('terminal:write_lines', lines);
				}
				states.write = (...lines: string[]) => {
					if(!states.history.length) states.history.push('');
					states.history[states.history.length -1] += lines.join('');
					events.emit('terminal:write', lines);
				}
				states.updateLine = (index: number, line: string) => {
					states.history[index] = line;
					events.emit('terminal:update_line', index, line);
				}
				states.deleteLine = (index: number) => {
					states.history.splice(index, 1);
					events.emit('terminal:delete_line', index);
				}
				states.clear = () => {
					states.history = [];
					events.emit('terminal:clear');
				}
				states.setInput = (input: string) => {
					states.currentInput = input;
					events.emit('terminal:set_input', states.currentInput);
				}
				states.lineBreak = () => {
					events.emit('terminal:line_break');
				}
				states.updateWith = (key: string) => {
					if (key === 'Enter') {
						states.lineBreak();
						const command = states.currentInput.trim();
						states.history.push(states.prompt + command);
						const commandParts = command.split(' ');
						const commandName = commandParts.shift();
						if(existsCommand(commandName)){
							execCommand(commandName, commandParts, states);
						} else {
							states.writeLine(`bash: ${commandName}: command not found`);
						}
						states.setInput('');
					} else if (key === 'Backspace') {
						states.setInput(states.currentInput.slice(0, -1));
					} else if (key?.length === 1) {
						states.setInput(states.currentInput + key);
					}
				}

				events.on('keydown', (event: any) => {
					if(states.introDone) {
						event.preventDefault();
						const key = event.key;
						states.updateWith(key)
					}
				});

			} else {
				if(!states.introDone){
					if(states.currentIntroIndex >= states.introText.length){
						states.introDone = true;
						states.writeLine('');
						states.history = [];
						states.setInput('');
					} else {
						states._frame++;
						if(states._frame >= 5){
							states._frame = 0;

							const remainingText = states.introText.slice(states.currentIntroIndex);

							const match = remainingText.match(ANSI_REGEX);
							if (match && match.index === 0) {
								states.write(match[0]);
								states.currentIntroIndex += match[0].length;
							} else {
								const char = states.introText[states.currentIntroIndex];
								if (char === '\n') {
									states.writeLine('');
								} else {
									states.write(char);
								}
								states.currentIntroIndex += 1;
							}
						}
					}
				}
			}

			const totalLines = states.history.length;
			const totalHeight = totalLines * states.lineHeight;

			// Determine vertical scroll offset if content exceeds canvas
			const scrollOffset = Math.max(0, totalHeight - (canvasHeight / 1.3));


			ctx.fillStyle = '#ea999c';
			ctx.font = '10px monospace';

			for (let i = 0; i < states.history.length; i++) {
				ctx.fillText(states.history[i].replaceAll(
					new RegExp(ANSI_REGEX.source, 'g'), ''), canvasWidth * 0.1, states.textY + i * states.lineHeight - scrollOffset);
			}

			if(states.introDone)
				ctx.fillText(states.prompt + states.currentInput, canvasWidth * 0.1, states.textY + states.history.length * states.lineHeight - scrollOffset);
		
			return true;
		},
		content: () => {
			return <div>Page 4 Content</div>;
		},
		title: "Linux-like Terminal",
	}
];

export const LaptopCanvas = ({ currentPage, onClick, setPage, rotating = false, rotation, events }: {
	currentPage: number,
	onClick?: () => any,
	setPage: (number: number | any) => any,
	rotating?: boolean,
	rotation?: number,
	events?: LaptopEvents,
	scrollYProgress?: any
}) => {


	const updateFunction = useRef<any>();
	const canvasRef = useRef<any>();
	const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });



	useEffect(() => {
		if(!events) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		let states = {};

		// if(canvas){
		// 	canvas.width = 2048;
		// 	canvas.height = 2048;
		// }

		events!.setPage = (num: number) => {
			setPage(num);
		}

		const drawContent = () => {
			updateFunction.current = (null);
			events!.removeAll();
			states = {};

			context.clearRect(0, 0, canvas!.width, canvas!.height);
			const pageContent = pageData[currentPage];
			if (pageContent && pageContent.screen) {
				let repeating = pageContent.screen(context, false, 0, states, events);
				if (repeating === true) updateFunction.current = (delta: number) => {
					pageContent.screen(context, true, delta, states, events);
				};
				else {
					updateFunction.current = (null);
					events!.removeAll();
				}
			}
		};

		if (canvas && context) drawContent();
	}, [currentPage, events]);
	
	useEffect(() => {
		function frame(){
			if (typeof updateFunction.current == "function") {
				updateFunction.current(Date.now());
			}
			requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}, []);

	const laptopTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)", // initial
      "translate(-50%, -50%) rotateX(80deg) rotateZ(45deg)"     // final
    ]
  );

  const lidTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "translateY(-346.66px) rotateX(-90deg)", // initial
      "translateY(-346.66px) rotateX(-180deg)"          // final
    ]
  );


	return <div ref={containerRef} className="w-[300px] relative h-[300px] mx-auto">
		<motion.div
			className="laptop3d absolute left-1/2 top-1/2"
			style={{ transform: laptopTransform }}
		>
			<div className="base">
				<div className="front"></div>
			</div>

			<motion.div className="lid" style={{ transform: lidTransform }}>
				<div className="back"></div>
				<div className="front">
					<div className="screen">
						<canvas className="w-full h-full" ref={canvasRef}></canvas>
					</div>
				</div>
			</motion.div>
		</motion.div>
	</div>
}