import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { randInt } from 'three/src/math/MathUtils.js';
import { OrbitControls } from '@react-three/drei';

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
			ctx.font = '80px monospace';

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

			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			if (!isUpdate) {
				states.textY = canvasHeight * 0.1;
				states.lineHeight = 100;
				states.history = [];
				states.currentInput = '';
				states.prompt = '$ ';
				states.writeLine = (...lines: string[]) => {
					states.history.push(...lines);
					events.emit('terminal:write_lines', lines);
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
						const folders = [
							"bin  boot dev etc",
							"home lib  opt temp",
							"root run  sys proc",
							"usr  var"
						];
						const commands = ["bash", "dd", "rm", "mkdir", "touch", "cp", "cd"];
						if (command) {
							states.history.push(states.prompt + command);
							if (command === 'help') {
								states.writeLine('Available commands: help, clear, ls, echo <message>');
							} else if (command === 'clear') {
								states.clear();
							} else if (command.startsWith('echo ')) {
								const message = command.slice(5);
								states.writeLine(message);
							} else if (commands.includes(command.split(' ')[0])) {
							} else if (command.startsWith('ls')) {
								const message = command.slice(2);
								if (message && message.trim() !== '/') states.writeLine(folders.join(' ').match(message.trim()) ? `"${message.trim()}": Permission denied (os error 13)` : `"${message.trim()}": No such file or directory (os error 2)`);
								else states.writeLine(...folders);
							} else {
								states.writeLine(`bash: ${command}: command not found`);
							}
						}
						states.setInput('');
					} else if (key === 'Backspace') {
						states.setInput(states.currentInput.slice(0, -1));
					} else if (key?.length === 1) {
						states.setInput(states.currentInput + key);
					}
				}

				events.on('keydown', (event: any) => {
					event.preventDefault();
					const key = event.key;
					states.updateWith(key)
				});

			} else {

			}

			ctx.fillStyle = '#48ff22';
			ctx.font = '80px monospace';

			for (let i = 0; i < states.history.length; i++) {
				ctx.fillText(states.history[i], canvasWidth * 0.1, states.textY + i * states.lineHeight);
			}

			ctx.fillText(states.prompt + states.currentInput, canvasWidth * 0.1, states.textY + states.history.length * states.lineHeight);

			const cursorX = canvasWidth * 0.1 + ctx.measureText(states.prompt + states.currentInput).width;
			const cursorY = states.textY + states.history.length * states.lineHeight - 18;
			ctx.fillRect(cursorX, cursorY, 2, 20);

			return true;
		},
		content: () => {
			return <div>Page 4 Content</div>;
		},
		title: "Linux-like Terminal",
	}
];

export const Laptop3D = ({ currentPage, onClick, setPage, rotating = false, rotation, events: _events = {} }: {
	currentPage: number,
	onClick: () => any,
	setPage: (number: number) => any,
	rotating?: boolean,
	rotation?: number,
	events?: Record<string, (...data: any[]) => any>
}) => {
	const laptopRef = useRef<any>();
	const [openState, setOpenState] = useState(false);
	const [screenMaterial, setScreenMaterial] = useState<any>(null);
	const [animationMixer, setAnimationMixer] = useState<any>(null);

	const updateFunction = useRef<any>();
	const canvasRef = useRef<HTMLCanvasElement>();
	const contextRef = useRef<any>();
	const canvasTexture = useRef<any>();
	const events = useRef<Record<string, any>>();
	const rotationDelta = useRef(0);


	const { nodes, animations } = useLoader(GLTFLoader, '/laptop-mini-quality-open-close.glb');

	const findByMaterial = (object: THREE.Object3D, name: string) => {
		let screen = new THREE.Mesh();
		object.traverse((obj) => {
			let o: THREE.Mesh<THREE.BufferGeometry, THREE.MeshLambertMaterial> = obj as any;
			if (o?.material?.name?.toLowerCase() === name) {
				screen = o;
			}
		});
		return screen;
	}

	const findScreen = (object: THREE.Object3D) => {
		return findByMaterial(object, "screen");
	}

	useEffect(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 2048;
		canvas.height = 2048;
		// console.log(nodes);

		nodes.Laptop.rotation.y = rotation || Math.PI / 4;
		nodes.Laptop.position.y = -0.1;

		const colors = {
			base: 0x181825,
			lighter: 0x1e1e2e,
			emissive: 0xcba6f7
		};

		const lightUnder = new THREE.PointLight(colors.emissive, 10, 5, 0);
		lightUnder.position.set(0, 0, 0);
		nodes.Laptop.add(lightUnder);


		const lights = findByMaterial(nodes.Laptop, 'lights');
		lights.material = new THREE.MeshStandardMaterial({
			color: colors.emissive,
			emissive: colors.emissive,
			emissiveIntensity: 1,
			side: 2
		});

		const lights_01 = findByMaterial(nodes.Laptop, "lights.001");
		lights_01.material = lights.material;

		const ceramic = findByMaterial(nodes.Laptop, 'ceramic');
		ceramic.material = new THREE.MeshBasicMaterial({
			color: colors.base,
			side: 2
		});

		const touchpad = findByMaterial(nodes.Laptop, 'TOUCHPAD');
		touchpad.material = new THREE.MeshBasicMaterial({
			color: colors.lighter,
			side: 2
		});

		const keys = findByMaterial(nodes.Laptop, 'keys');
		keys.material = new THREE.MeshBasicMaterial({
			color: colors.lighter,
			side: 2
		});

		// nodes.Laptop.

		// window.addEventListener('wheel', (event) => {
		//     // Capture the scroll delta
		//     rotationDelta.current += event.deltaY;
		//     nodes.Laptop.rotation.y = rotationDelta.current * 0.001; // Scale down the delta
		// });

		events.current = {
			_events: [],
			removeAll: () => {
				events.current!._events.forEach(({ event, callback }: { event: string, callback: (...args: any[]) => any }) => {
					document.removeEventListener(event, callback);
				});
			},
			on: (event: string, callback: (...args: any[]) => any) => {
				document.addEventListener(event, callback);
				events.current!._events.push({ event, callback });
			},
			emit: (event: string, ...data: any[]) => {
				if(_events?.[event]){
					_events[event](...data);
				}
			},
			setPage: (num: number) => {
				setPage(num);
			}
		};

		// document.addEventListener('keydown', (event) => {
		//     if(!events.current.keys.includes(event.key)) events.current.keys.push(event.key);
		//     events.current.key = event.key;
		// });
		// document.addEventListener('keyup', (event) => {
		//     let found = events.current.keys.indexOf(event.key);
		//     events.current.keys = events.current.keys.filter(e => e !== event.key);
		//     events.current.key = null;
		// });

		const context = canvas.getContext('2d');
		canvasRef.current = canvas;
		contextRef.current = context;
		canvasTexture.current = (new THREE.Texture(canvas));
	}, []);

	useEffect(() => {

		const canvas = canvasRef.current;
		const context = contextRef.current;
		let states = {};

		const drawContent = () => {
			updateFunction.current = (null);
			events.current!.removeAll();
			states = {};

			context.clearRect(0, 0, canvas!.width, canvas!.height);
			const pageContent = pageData[currentPage];
			if (pageContent && pageContent.screen) {
				let repeating = pageContent.screen(context, false, 0, states, events.current);
				if (repeating === true) updateFunction.current = (delta: number) => {
					pageContent.screen(context, true, delta, states, events.current);
					canvasTexture.current.needsUpdate = true;
					(findScreen(nodes.Laptop).material as any).needsUpdate = true;
				};
				else {
					updateFunction.current = (null);
					events.current!.removeAll();
				}
			}
			(findScreen(nodes.Laptop).material as any).needsUpdate = true;
			canvasTexture.current.needsUpdate = true;
		};

		if (canvas && context) drawContent();
	}, [currentPage]);

	useEffect(() => {
		if (nodes.Laptop && nodes.Laptop.children) {
			const screenMat = new THREE.MeshBasicMaterial({
				color: 0xffffff
			});
			if (screenMat) {
				screenMat.map = canvasTexture.current || new THREE.Texture(canvasRef.current);
				screenMat.map!.wrapS = THREE.RepeatWrapping;
				screenMat.map!.wrapT = THREE.RepeatWrapping;
				screenMat.map!.rotation = -Math.PI / 2;
				screenMat.map!.repeat.set(1, -1);
				setScreenMaterial(screenMat);
				screenMat.needsUpdate = true; // Ensure the material is updated
			}
			findScreen(nodes.Laptop).material = screenMat;
		}
	}, [canvasTexture, nodes]);

	useEffect(() => {
		// const mixer = new THREE.AnimationMixer(laptopRef.current);
		// setAnimationMixer(mixer);

		// // Handle animation
		// if (animations.length) {
		//     const action = mixer.clipAction(findAnimation('LidOpening')); // Assuming first animation is for opening/closing
		//     action.play();
		// }

		// return () => {
		//     if (mixer) mixer.stopAllAction();
		// };
	}, [laptopRef]);

	const toggleLid = () => {
		if (openState) {
			// Lid Closing
			setOpenState(false);
			// animationMixer.clipAction(findAnimation("OpenLid")).play(); // Assuming CloseLid is the second animation
		} else {
			// Lid Opening
			setOpenState(true);
			// animationMixer.clipAction(findAnimation("CloseLid")).play(); // Assuming OpenLid is the third animation
		}
		onClick();
	};

	useFrame((state: any, delta: number) => {
		if (animationMixer) animationMixer.update(delta);
		if (typeof updateFunction.current == "function") {
			updateFunction.current(delta);
		}
		if (rotating) {
			nodes.Laptop.rotation.y += 0.01;
		}
	});

	return (
		<group ref={laptopRef} onClick={toggleLid} castShadow>
			<directionalLight lookAt={() => laptopRef.current} intensity={1} />
			<directionalLight position={[-3, 2, -3]} lookAt={() => laptopRef.current} intensity={1} />
			<directionalLight position={[-3, 10, -3]} lookAt={() => laptopRef.current} intensity={1} />
			<directionalLight position={[3, 10, 3]} lookAt={() => laptopRef.current} intensity={1} />
			<ambientLight color={'#ffffff'} intensity={1} />
			<primitive object={nodes.Laptop} />
		</group>
	);
};

export const LaptopCanvas = ({ currentPage, onClick, setPage, rotating = false, rotation, events }: {
	currentPage: number,
	onClick?: () => any,
	setPage: (number: number | any) => any,
	rotating?: boolean,
	rotation?: number,
	events?: any
}) => {
	return <Canvas
		style={{
			width: '300px',
			height: '300px',
		}}
		camera={{
			position: [-4, 2, 4],
			fov: 35,
		}}
		gl={{ alpha: true }}>


		<group>
			<Laptop3D rotating={rotating} rotation={rotation} setPage={setPage} onClick={onClick || (() => setPage((prev: number) => (prev + 1) % pageData.length))} currentPage={currentPage} events={events} />
		</group>

	</Canvas>
}