"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as DreiImage, Preload } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const galleryPhotos = [
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260418-WA0080.jpg?updatedAt=1780539993311",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20250522-WA0065.jpg?updatedAt=1780539992415",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260311-WA0038.jpg?updatedAt=1780539991632",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20250909-WA0224.jpg?updatedAt=1780539961779",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260420-WA0028.jpg?updatedAt=1780539992971",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/He's%20Back.jpg?updatedAt=1780539961476",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20251220-WA0103.jpg?updatedAt=1780539992747",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260522-WA0043.jpg?updatedAt=1780539992930",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG_4599.HEIC.jpg?updatedAt=1780539993455",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260330-WA0025.jpg?updatedAt=1780539992947",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20260312-WA0076.jpg?updatedAt=1780539992941",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20251007-WA0411.jpg?updatedAt=1780539992896",
  "https://ik.imagekit.io/bhiaoqt1n/Porto/IMG-20250616-WA0031.jpg?updatedAt=1780539922811",
];

// Configuration
const DEPTH_LAYERS = 4;
const IMAGES_PER_LAYER = 7; // Reduced from 50 to 28 total images
const TOTAL_IMAGES = DEPTH_LAYERS * IMAGES_PER_LAYER;
const MAX_WIDTH = 60; 
const MAX_HEIGHT = 20;

function GalleryItems() {
  const group = useRef<THREE.Group>(null);

  // Generate random positions and assign images once
  const items = useMemo(() => {
    return Array.from({ length: TOTAL_IMAGES }, (_, i) => {
      const layer = i % DEPTH_LAYERS;
      const imageIndex = Math.floor(Math.random() * galleryPhotos.length);
      
      // Layer 0 is closest (z=-2), Layer 4 is furthest (z=-20)
      const z = -2 - layer * 4.5; 
      
      const x = (Math.random() - 0.5) * MAX_WIDTH;
      const y = (Math.random() - 0.5) * MAX_HEIGHT;
      
      // Deeper layers are slightly larger to compensate for perspective
      const scale = 1 + (layer * 0.2) + Math.random() * 1.5;
      
      // Closer layers move faster
      const speed = 1 - (layer / DEPTH_LAYERS) * 0.7; 

      return {
        url: galleryPhotos[imageIndex] + "&tr=w-600,q-75", // Fetch optimized lower-res images
        position: new THREE.Vector3(x, y, z),
        scale: [scale * 1.5, scale * 2], 
        speed,
        layer,
        originalX: x,
        randomYOffset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Auto movement to the right
    const autoScrollSpeed = 2; // Kecepatan gerak otomatis ke kanan
    const autoMoveOffset = state.clock.elapsedTime * autoScrollSpeed;

    const targetX = -autoMoveOffset;
    
    group.current.children.forEach((child, i) => {
      const item = items[i];
      // Parallax move
      const newX = item.originalX - targetX * item.speed;
      
      // Infinite wrap
      const bounds = MAX_WIDTH / 2;
      let wrappedX = newX % MAX_WIDTH;
      if (wrappedX < -bounds) wrappedX += MAX_WIDTH;
      if (wrappedX > bounds) wrappedX -= MAX_WIDTH;

      // Jika terjadi wrapping (lompat dari ujung kanan ke kiri), set posisi secara instan agar tidak terlihat terbang
      if (Math.abs(child.position.x - wrappedX) > bounds) {
        child.position.x = wrappedX;
      } else {
        child.position.x = THREE.MathUtils.lerp(child.position.x, wrappedX, 0.1);
      }
      
      // Floating effect
      const time = state.clock.elapsedTime;
      child.position.y = item.position.y + Math.sin(time * 0.5 + item.randomYOffset) * 0.3;
      
      // Foto selalu menghadap lurus ke depan
      child.rotation.y = 0;
      child.rotation.x = 0;
      child.rotation.z = 0;
    });
  });

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <DreiImage
          key={i}
          url={item.url}
          position={item.position}
          scale={item.scale as [number, number]}
          // Removed transparent and opacity to enable WebGL depth culling (huge performance boost)
        />
      ))}
    </group>
  );
}

export default function Gallery() {
  return (
    <div className="w-full flex flex-col items-center relative overflow-hidden h-screen bg-[#050505]">
      {/* Overlay Title */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none pt-32 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white/10 text-[10vw] md:text-[8vw] font-black uppercase tracking-tighter select-none mb-4" // Removed mix-blend-overlay (expensive on mobile)
        >
          Gallery
        </motion.h2>
      </div>

      {/* Canvas */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas 
          dpr={[1, 1.5]} // Limit pixel ratio on high-density mobile screens
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} // Disable antialias for images
          onCreated={({ scene }) => {
            scene.background = new THREE.Color('#050505');
            scene.fog = new THREE.FogExp2('#050505', 0.04);
          }}
        >
          <Suspense fallback={null}>
            <GalleryItems />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Gradient overlay to blend with other sections */}
      <div className="absolute top-0 left-0 right-0 h-[20vh] bg-linear-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-linear-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
