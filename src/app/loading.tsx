'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center">
      <div className="relative w-32 h-32 overflow-hidden">
        {/* Wireframe生长动画模拟，象征逻辑构建过程 */}
        <motion.div 
          className="absolute inset-0 border border-[#222]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        />
        <motion.div 
          className="absolute inset-0 border border-[#444]"
          initial={{ rotate: 45, scale: 0 }}
          animate={{ rotate: 45, scale: 0.8 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        />
        <motion.div 
          className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#888] to-transparent"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#888] to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </div>
      <div className="absolute bottom-12 text-[10px] font-mono tracking-[0.5em] text-[#333] uppercase">
        Constructing_Logic_Grid
      </div>
    </div>
  );
}
