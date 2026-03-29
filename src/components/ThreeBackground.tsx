'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = () => {
  const meshRef = useRef<THREE.Points>(null!);
  const particleCount = 200; // Controlled quantity for performance as per user feedback

  const particlesPosition = useMemo(() => {
    const array = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      let x = (Math.random() - 0.5) * 20;
      let y = (Math.random() - 0.5) * 20;
      let z = (Math.random() - 0.5) * 20;
      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8aa8aa"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0a0a0a] pointer-events-none">
      {/* 响应式降级处理：在屏幕宽度过小(移动端)时可以通过 CSS 隐藏 Canvas 减少发热 */}
      <div className="hidden sm:block h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleSystem />
        </Canvas>
      </div>
    </div>
  );
}
