"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 70;
    const maxConn = count * 6;
    const spread = 40;
    const connDistSq = 36;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;
      vel[i3] = (Math.random() - 0.5) * 0.004;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x45cbfd,
      size: 0.08,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    const linePos = new Float32Array(maxConn * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({
      color: 0x45cbfd,
      transparent: true,
      opacity: 0.04,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let frameId: number;
    let frame = 0;
    const half = spread / 2;
    const halfZ = half * 0.5;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      frame++;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] += vel[i3];
        pos[i3 + 1] += vel[i3 + 1];
        pos[i3 + 2] += vel[i3 + 2];
        if (Math.abs(pos[i3]) > half) vel[i3] *= -1;
        if (Math.abs(pos[i3 + 1]) > half) vel[i3 + 1] *= -1;
        if (Math.abs(pos[i3 + 2]) > halfZ) vel[i3 + 2] *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      if (frame % 4 === 0) {
        let ci = 0;
        for (let i = 0; i < count && ci < maxConn; i++) {
          const i3 = i * 3;
          for (let j = i + 1; j < count && ci < maxConn; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3 + 1] - pos[j3 + 1];
            const dz = pos[i3 + 2] - pos[j3 + 2];
            if (dx * dx + dy * dy + dz * dz < connDistSq) {
              const c6 = ci * 6;
              linePos[c6] = pos[i3];
              linePos[c6 + 1] = pos[i3 + 1];
              linePos[c6 + 2] = pos[i3 + 2];
              linePos[c6 + 3] = pos[j3];
              linePos[c6 + 4] = pos[j3 + 1];
              linePos[c6 + 5] = pos[j3 + 2];
              ci++;
            }
          }
        }
        lGeo.setDrawRange(0, ci * 2);
        lGeo.attributes.position.needsUpdate = true;
      }

      if (!isMobile) {
        camera.position.x +=
          (mouseRef.current.x * 1.5 - camera.position.x) * 0.01;
        camera.position.y +=
          (mouseRef.current.y * 1.5 - camera.position.y) * 0.01;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
