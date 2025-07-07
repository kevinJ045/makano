// @ts-nocheck
'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Pixelation, Bloom } from '@react-three/postprocessing';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';


function getRandomPosition() {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(-2.25, 2.25),
    0.6,
    THREE.MathUtils.randFloat(-2.25, 2.25)
  );
}

function Character() {

  const { scene, animations } = useGLTF('/character.glb');
  const { scene: hatScene, animations: hatAnimations } = useGLTF('/horn.glb');
  const { actions, mixer } = useAnimations(animations, scene);
  // const { mixer: hatMixer } = useAnimations(hatAnimations, hatScene);
  const [animation, setCurrentAnimation] = useState(2);
  const [target, setTarget] = useState(getRandomPosition());
  const [isMoving, setIsMoving] = useState(true);

  const ref = useRef();

  useEffect(() => {
    let timeout;

    const startLookingAround = () => {
      setIsMoving(false);
      setCurrentAnimation(6);
      timeout = setTimeout(() => {
        setTarget(getRandomPosition());
        setIsMoving(true);
        setCurrentAnimation(7);
      }, 2000);
    };

    return () => clearTimeout(timeout);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || !isMoving) return;

    const pos = ref.current.position;
    const direction = target.clone().sub(pos);
    const distance = direction.length();

    if (direction.lengthSq() > 0.0001) {
      const angleToTarget = Math.atan2(direction.x, direction.z) + Math.PI;
      const currentYRotation = ref.current.rotation.y;
      ref.current.rotation.y = THREE.MathUtils.lerp(
        currentYRotation,
        angleToTarget,
        delta * 5
      );
    }


    if (distance < 0.05) {
      ref.current.position.copy(target);
      setIsMoving(false);
      setCurrentAnimation(2);
      setTimeout(() => {
        setCurrentAnimation(6);
        setTimeout(() => {
          const newTarget = getRandomPosition();
          setTarget(newTarget);
          setIsMoving(true);
          setCurrentAnimation(7);
        }, 1200);
      }, 3000); // idle
    } else {
      direction.normalize();
      ref.current.position.add(direction.multiplyScalar(delta * 1.5));
    }
  });

  useEffect(() => {
    scene.position.y = 0.6;
    scene.castShadow = true;
    scene.scale.set(0.5, 0.5, 0.5);
    hatScene.position.y = 1.9;
    hatScene.position.z = -0.5;
    console.log(scene);//children[1].children);
    scene.children[0].children[1].add(hatScene);
    scene.children[0].children[1].children[1].children[0].material = new THREE.MeshStandardMaterial({
      color: '#5FE7D8',
      emissive: '#5FE7D8',
      emissiveIntensity: 2
    });
    scene.children[0].children[0].children[0].material = createLeafMaterial('#00BBB2', '#5FE7D8');
    scene.children[0].children[0].children[3].material = new THREE.MeshStandardMaterial({
      color: '#00BBB2'
    });
    scene.children[0].children[0].children[1].material = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      emissive: '#FFFFFF',
      emissiveIntensity: 0.5
    });

    scene.traverse(o => {
      o.castShadow = true;
    });

    // const hatAction = hatMixer.clipAction(hatAnimations[0]);
    // hatAction.reset();
    // hatAction.loop = THREE.LoopRepeat;
    // hatAction.play();
  }, [scene]);

  useEffect(() => {
    mixer.stopAllAction();
    const action = mixer.clipAction(animations[animation]);
    action.reset();
    action.loop = THREE.LoopRepeat;
    action.play();
  }, [animations, mixer, hatAnimations, animation]);

  useFrame((_, delta) => {
    mixer.update(delta)
    // hatMixer.update(delta)
  });

  return <primitive ref={ref} object={scene} />;
}

function VoxelTerrain() {
  const voxels = [];
  for (let x = -3; x < 3; x++) {
    for (let z = -3; z < 3; z++) {
      voxels.push(
        <mesh key={`${x}-${z}`} position={[x, 0, z]} material={createLeafMaterial('#09D0D0', '#2bf2f2', 512, 512, 50, 100)} receiveShadow castShadow>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      );
    }
  }
  return <>{voxels}</>;
}

function createLeafMaterial(alpha, beta, width = 512, height = 512, pixelSize = 20, numSquares = 20) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = alpha;
  ctx.fillRect(0, 0, width, height);
  
  for (let i = 0; i < numSquares; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    const color = beta;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, pixelSize, pixelSize);
  }
  // document.body.innerHTML = "";
  // document.body.appendChild(canvas);

  const texture = new THREE.CanvasTexture(canvas);
  
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 1,
    emissiveIntensity: 0
  });

  return material;
}

function Tree({ url = "/tree.glb", position = [0, 1, 0] }) {

  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.castShadow = true;
    if(url.match('shroom')){
      scene.scale.set(0.5, 0.5, 0.5);
    } else {
      scene.scale.set(0.3, 0.3, 0.3);
    }

    scene.traverse(o => {
      o.castShadow = true;
      console.log(o.material?.name);
      if(o.material?.name == "Leaf" || o.material?.name == "Mushroom"){
        o.material = createLeafMaterial("#00C0BE", "#00A5A3", 512, 512, 50)
      }
      if(o.material?.name == "Log"){
        o.material = createLeafMaterial("#FFFFFF", "#000000", 512, 512, 50)
      }
      if(o.material?.name == "MushroomDot"){
        o.material = new THREE.MeshStandardMaterial({
          color: "#09d0d0",
          emissive: "#09d0d0",
          emissiveIntensity: 4 
        })
      }
    });

  }, [scene]);

  return (
    <group position={position as any}>
      <primitive object={scene} />
    </group>
  );
}

export default function IovieComponent() {
  const renderer = useRef<any>();

  return (
    <Canvas ref={renderer} shadows camera={{ position: [-5, 10, -10], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        color="#ffffff"
        castShadow
        position={[-10, 10, -5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight color="#a4a4a4" />
      <Suspense fallback={null}>
        <Character />
      </Suspense>
      <VoxelTerrain />
      <Suspense fallback={null}>
        <Tree position={[2, 0.5, 2]} />
        <Tree url="/tree2.glb" position={[-3, 0.5, 1]} />
        <Tree url="/bush.glb" position={[2, 0.5, -3]} />
        <Tree url="/shroom.glb" position={[-2.5, 0.5, -2]} />
      </Suspense>
      <EffectComposer>
        {/* <Pixelation granularity={3} /> */}
        <Bloom opacity={0.9} />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
}