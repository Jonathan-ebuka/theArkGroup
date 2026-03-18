"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Shared state for mouse + scroll from the DOM
const interactionState = {
  mouseX: 0,
  mouseY: 0,
  scrollProgress: 0,
};

function CameraRig() {
  const { camera } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothZoom = useRef(100);

  useFrame(() => {
    // Smooth mouse follow
    smoothMouse.current.x += (interactionState.mouseX - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (interactionState.mouseY - smoothMouse.current.y) * 0.03;

    // Rotate camera around the origin based on mouse
    const rotX = smoothMouse.current.y * 0.4;
    const rotY = smoothMouse.current.x * 0.6;

    // Zoom in 25% as user scrolls (100 → 75)
    const targetZoom = 100 - interactionState.scrollProgress * 25;
    smoothZoom.current += (targetZoom - smoothZoom.current) * 0.05;

    const dist = smoothZoom.current;
    camera.position.x = Math.sin(rotY) * dist;
    camera.position.y = rotX * 30;
    camera.position.z = Math.cos(rotY) * dist;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function ParticleSwarm() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 6000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++)
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    return pos;
  }, []);

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    []
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(0.2, 4, 4), []);

  const staticData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const n = i / count;
      const y = 1 - 2 * n;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = i * 2.399963229728653;
      const sx = Math.cos(angle) * rr;
      const sz = Math.sin(angle) * rr;
      const hemi = sx < 0 ? -1 : 1;
      const mid = 1 - 0.22 * Math.exp(-sx * sx * 18);
      const phi = Math.atan2(sz, sx);
      const fb = 0.86 + 0.2 * Math.abs(sz);
      const tb = 0.82 + 0.3 * (1 - y * y);
      data.push({ n, y, angle, sx, sz, hemi, mid, phi, fb, tb });
    }
    return data;
  }, []);

  const radius = 50;
  const folds = 3.06;
  const pulse = 2.0;
  const jitter = 0.8;

  let frameCount = 0;

  useFrame((state) => {
    if (!meshRef.current) return;
    frameCount++;
    if (frameCount % 2 !== 0) return;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const d = staticData[i];

      const gy1 = Math.sin(d.phi * 6 + d.y * 7 + time * 0.25);
      const gy2 = Math.sin(d.phi * 13 - d.y * 11 - time * 0.18);
      const foldShape = 1 + (0.11 * folds * (0.55 * gy1 + 0.45 * gy2)) / 8;

      const bias = 1 + 0.08 * d.hemi * Math.sin(d.phi * 2.5 + time * 0.12);
      const base = radius * foldShape * d.mid;

      let x = d.sx * base * d.fb * bias;
      let yy = d.y * base * d.tb;
      let z = d.sz * base * 1.08;

      const inner = Math.sin(d.n * 80 + time * 1.7 + Math.abs(d.y) * 9 + d.phi * 3);
      const sparkA = Math.max(0, Math.sin(d.n * 240 - time * (6 + pulse * 2.4) + gy2 * 1.7 + d.phi * 5));
      const fire = sparkA * sparkA;

      x += d.sx * fire * pulse * 4 + Math.sin(d.angle * 1.7 + time * 3.1) * jitter * 0.15;
      yy += d.y * fire * pulse * 3 + Math.cos(d.angle * 1.3 - time * 2.7) * jitter * 0.15;
      z += d.sz * fire * pulse * 4.5 + Math.sin(d.angle * 1.1 + time * 2.9) * jitter * 0.15;

      target.set(x, yy, z);

      const h = 0.62 - 0.18 * fire + 0.04 * Math.sin(d.phi * 2 + time * 0.2);
      const sVal = 0.7 + 0.3 * fire;
      const lVal = 0.18 + 0.2 * (0.5 + 0.5 * inner) + 0.5 * fire;
      pColor.setHSL(h, sVal, lVal);

      positions[i].lerp(target, 0.08);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}

export function NeuralSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let zoomAccum = 0;
    let zoomDone = false;

    const handleMouseMove = (e: MouseEvent) => {
      interactionState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      interactionState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleWheel = (e: WheelEvent) => {
      // Scrolling down — zoom in first
      if (e.deltaY > 0) {
        if (zoomDone && window.scrollY > 0) return; // normal scroll
        e.preventDefault();
        zoomAccum = Math.min(1, zoomAccum + e.deltaY / 300);
        interactionState.scrollProgress = zoomAccum;
        if (zoomAccum >= 1) zoomDone = true;
      }
      // Scrolling up — if at top, reverse the zoom
      else {
        if (window.scrollY > 0) return; // normal scroll
        if (zoomAccum <= 0) return;
        e.preventDefault();
        zoomAccum = Math.max(0, zoomAccum + e.deltaY / 300);
        interactionState.scrollProgress = zoomAccum;
        if (zoomAccum <= 0) zoomDone = false;
      }
    };

    const handleScroll = () => {
      if (window.scrollY === 0 && zoomDone) {
        // At top — allow reverse zoom on next scroll up
      }
      if (window.scrollY > 10) {
        zoomDone = true;
        interactionState.scrollProgress = 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#0a1628", 60, 180]} />
        <CameraRig />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
