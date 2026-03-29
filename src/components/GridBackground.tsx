'use client';

import { motion } from 'framer-motion';

export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden bg-[#080808]">
      {/* 极简静止网格 (Architectural Thin Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* 极简径向阴影，保持边缘深邃 */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(8,8,8,0.95) 100%)'
        }}
      />
      
      {/* 去除了扫光、大星云和动态旋转，保持绝对的静谧 */}
    </div>
  );
}
