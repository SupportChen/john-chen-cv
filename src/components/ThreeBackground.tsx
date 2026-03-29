'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TinyStars = () => {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 1000; // 维持加密密度

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorWhite = new THREE.Color('#FFFFFF');
    // 调亮克莱因蓝，使其在黑夜中更具结构感与穿透性
    const colorKlein = new THREE.Color('#002FA7');
    
    for (let i = 0; i < count; i++) {
      // 广域分布
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      // 颜色混合比例：80% 高亮克莱因蓝, 20% 极简白 (降低白色比例，告别碎屑感)
      const isWhite = Math.random() > 0.8;
      const mixedColor = isWhite ? colorWhite : colorKlein;
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 极缓微旋
      meshRef.current.rotation.y += delta * 0.006;
      
      // 视差控制，给予深邃感
      meshRef.current.position.x += (state.mouse.x * 0.4 - meshRef.current.position.x) * 0.04;
      meshRef.current.position.y += (state.mouse.y * 0.4 - meshRef.current.position.y) * 0.04;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.042} // 略微放大点阵，使其看起来更像“设计的坐标点”而非“灰尘”
        vertexColors={true}
        transparent={true}
        opacity={0.6} // 提高克莱因蓝的点缀亮度
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#080808]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <TinyStars />
      </Canvas>
    </div>
  );
}
