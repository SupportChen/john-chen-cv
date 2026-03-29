'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/image';

export default function PortfolioContent({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProject = (proj: any) => {
    setSelectedProject(proj);
    setCurrentImageIndex(0);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] z-10 w-full overflow-x-hidden">
      <header className="px-8 lg:px-16 py-12 flex justify-between items-baseline border-b border-[#111]">
        <h2 className="text-3xl lg:text-4xl font-extralight tracking-[0.2em] uppercase italic">PROJECTS</h2>
        <span className="text-[10px] font-mono text-[#333] tracking-[0.4em] uppercase">Phase_01 / Research & Practice</span>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-8 lg:px-16 pb-32">
        {projects.map((proj: any) => (
          <motion.div 
            key={proj._id} 
            layoutId={proj._id}
            onClick={() => openProject(proj)}
            className="group relative aspect-[16/11] bg-[#000] overflow-hidden cursor-pointer"
          >
            {/* 背景底图 - 高级灰/透明度处理 */}
            <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-10 transition-all duration-1000">
              {proj.media && proj.media[0] ? (
                <Image 
                  src={urlFor(proj.media[0]).toString()} 
                  alt={proj.title} 
                  fill 
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
              ) : (
                <div className="w-full h-full bg-[#080808]" />
              )}
            </div>
            
            {/* 核心交互层 - 标题布满逻辑 */}
            <div className="absolute inset-0 flex items-center justify-center z-10 p-8 lg:p-12">
               <div className="text-center w-full group-hover:scale-[1.02] transition-transform duration-700">
                  <span className="block text-[8px] font-mono text-[#444] mb-4 tracking-[0.8em] group-hover:text-[#666] transition-colors uppercase">
                    ID. {proj.year}
                  </span>
                  
                  {/* 字号进一步精细化，但放宽 max-width 让文字布满中轴 */}
                  <h3 className="text-[clamp(0.8rem,1.2vw,1.1rem)] font-light tracking-[0.3em] leading-[1.8] text-white/80 group-hover:text-white transition-all uppercase px-4 w-full">
                    {proj.title}
                  </h3>
                  
                  <div className="w-4 h-px bg-white/5 mt-8 mx-auto group-hover:w-full group-hover:bg-white/20 transition-all duration-1000" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-24">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={selectedProject._id}
              className="relative w-full max-w-7xl h-full bg-[#0a0a0a] border border-[#111] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            >
              {/* 多图滑动翻页展示区 */}
              <div className="w-full lg:w-3/4 h-1/2 lg:h-full relative bg-[#050505] flex items-center justify-center overflow-hidden group">
                {selectedProject.media && selectedProject.media.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image 
                          src={urlFor(selectedProject.media[currentImageIndex]).toString()} 
                          alt={`${selectedProject.title} - ${currentImageIndex}`} 
                          fill 
                          unoptimized
                          className="object-contain p-4 lg:p-16"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* 页面指示器 (左上角) */}
                    <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 border border-[#333] text-[10px] font-mono tracking-[0.3em] uppercase text-[#ccc]">
                      IMG {currentImageIndex + 1} / {selectedProject.media.length}
                    </div>

                    {/* 悬浮强感官翻页按钮 */}
                    {selectedProject.media.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.media.length - 1));
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-20 lg:w-16 lg:h-32 bg-black/40 hover:bg-white border border-[#333] hover:border-white text-white hover:text-black backdrop-blur-sm transition-all duration-300 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100"
                        >
                          <span className="text-2xl font-light">←</span>
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev < selectedProject.media.length - 1 ? prev + 1 : 0));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-20 lg:w-16 lg:h-32 bg-black/40 hover:bg-white border border-[#333] hover:border-white text-white hover:text-black backdrop-blur-sm transition-all duration-300 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100"
                        >
                          <span className="text-2xl font-light">→</span>
                        </button>
                        
                        {/* 底部进程点 */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 bg-black/60 px-6 py-3 border border-[#333] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {selectedProject.media.map((_: any, idx: number) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                              className={`h-[2px] transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-[#555] hover:bg-[#888]'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-[#222]">
                    NO_MEDIA_ASSETS_FOUND
                  </div>
                )}
              </div>
              
              {/* 右侧固定说明栏 */}
              <div className="w-full lg:w-1/4 h-1/2 lg:h-full p-8 lg:p-12 overflow-y-auto flex flex-col border-t lg:border-t-0 lg:border-l border-[#111] bg-[#0a0a0a]">
                <div className="flex justify-between items-start mb-16">
                   <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-[#444] tracking-[0.4em] uppercase">ID. {selectedProject.year}</span>
                      <h2 className="text-2xl font-light tracking-widest uppercase leading-tight">{selectedProject.title}</h2>
                   </div>
                   <button 
                     onClick={() => setSelectedProject(null)}
                     className="text-[10px] font-mono text-[#555] hover:text-white transition-colors border border-[#222] px-2 py-1"
                   >BACK</button>
                </div>

                <div className="flex flex-col gap-12 flex-grow">
                   <div>
                      <h4 className="text-[9px] font-mono text-[#333] mb-4 tracking-[0.4em] uppercase border-b border-[#111] pb-2">Role_Definition</h4>
                      <p className="text-xs text-[#888] font-light leading-relaxed tracking-wider">{selectedProject.role}</p>
                   </div>
                   
                   <div>
                      <h4 className="text-[9px] font-mono text-[#333] mb-4 tracking-[0.4em] uppercase border-b border-[#111] pb-2">Research_Context</h4>
                      <p className="text-xs text-[#666] font-light leading-relaxed tracking-widest whitespace-pre-line">{selectedProject.description}</p>
                   </div>
                </div>

                {selectedProject.githubLink && (
                  <a 
                    href={selectedProject.githubLink} 
                    target="_blank" 
                    className="mt-16 group flex items-center justify-between border border-[#222] p-4 transition-all hover:border-white/20"
                  >
                    <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-[#444] group-hover:text-white transition-colors">Source_Code</span>
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
