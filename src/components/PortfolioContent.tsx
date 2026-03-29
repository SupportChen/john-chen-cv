'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/image';

export default function PortfolioContent({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

  const openProject = (proj: any) => {
    setSelectedProject(proj);
    setCurrentImageIndex(0);
  };

  return (
    <div className="pt-24 min-h-screen z-10 w-full overflow-x-hidden pb-40 text-white">
      <header className="px-8 lg:px-20 py-20 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 bg-klein rounded-full" />
            <span className="text-[11px] font-bold text-klein tracking-[0.5em] uppercase">Archive Collection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">Projects</h2>
          <p className="text-silver/60 max-w-md text-sm font-light leading-relaxed">数字化设计咨询与建筑科技研发集合，探索逻辑与美学的平衡点。</p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-2 opacity-20">
           <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Phase_Practice</span>
           <div className="h-px w-24 bg-white" />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 px-8 lg:px-20">
        {projects.map((proj: any, i: number) => (
          <motion.div 
            key={proj._id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => openProject(proj)}
            className="group relative aspect-[4/3] rounded-[48px] overflow-hidden cursor-pointer glass border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-white/20"
          >
            {/* 背景底图 - 由黑白变彩色 */}
            <div className="absolute inset-0 z-0">
              {proj.media && proj.media[0] ? (
                <Image 
                  src={urlFor(proj.media[0]).toString()} 
                  alt={proj.title} 
                  fill 
                  unoptimized
                  className="object-cover transition-all duration-[2s] ease-out scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full bg-white/[0.02]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity duration-1000" />
            </div>
            
            {/* 内容层 - 极简标题布局 */}
            <div className="absolute inset-x-0 bottom-0 p-12 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <span className="text-[11px] font-bold text-klein tracking-[0.3em] mb-3 uppercase drop-shadow-[0_0_12px_rgba(0,47,167,0.5)] block">
                {proj.year}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug text-white/80 group-hover:text-white transition-colors">
                {proj.title}
              </h3>
              <div className="mt-8 h-px w-0 group-hover:w-full bg-gradient-to-r from-klein to-transparent transition-all duration-1000" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 lg:p-24 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={springConfig}
              className="relative w-full max-w-7xl h-full glass rounded-[54px] overflow-hidden flex flex-col lg:flex-row shadow-4xl border border-white/20"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-all z-50 order-2 lg:order-none"
              >
                <span className="text-2xl leading-none">✕</span>
              </button>

              {/* 展示区 */}
              <div className="w-full lg:w-[65%] h-1/2 lg:h-full relative bg-black/40 flex items-center justify-center overflow-hidden group">
                {selectedProject.media && selectedProject.media.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                      >
                        <Image 
                          src={urlFor(selectedProject.media[currentImageIndex]).toString()} 
                          alt={`${selectedProject.title} - ${currentImageIndex}`} 
                          fill 
                          unoptimized
                          className="object-contain p-8 md:p-20"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* 指示器 */}
                    <div className="absolute top-10 left-12 z-20 glass px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.3em] text-white/80">
                      IMG {currentImageIndex + 1} <span className="opacity-20 px-2">/</span> {selectedProject.media.length}
                    </div>

                    {/* 翻页 (大区域交互) */}
                    {selectedProject.media.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.media.length - 1));
                          }}
                          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center z-20 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <span className="text-3xl font-light">←</span>
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev < selectedProject.media.length - 1 ? prev + 1 : 0));
                          }}
                          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center z-20 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <span className="text-3xl font-light">→</span>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-[12px] font-bold text-silver/20 tracking-widest italic uppercase">No Media Loaded</div>
                )}
              </div>
              
              {/* 说明栏 */}
              <div className="w-full lg:w-[35%] h-1/2 lg:h-full p-12 lg:p-16 overflow-y-auto flex flex-col bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5 order-1 lg:order-none">
                <div className="mb-14">
                  <span className="text-klein font-bold text-[13px] tracking-[0.4em] mb-6 block uppercase drop-shadow-[0_0_8px_rgba(0,47,167,0.3)]">ID_{selectedProject.year}</span>
                  <h2 className="text-3xl font-bold tracking-tight text-white leading-tight mb-6">{selectedProject.title}</h2>
                  <div className="h-1 w-16 bg-klein rounded-full" />
                </div>

                <div className="flex flex-col gap-12 flex-grow">
                   <div>
                      <h4 className="text-[10px] font-bold text-silver/30 mb-5 tracking-[0.5em] uppercase border-b border-white/5 pb-3">Objective</h4>
                      <p className="text-[15px] text-white/90 font-medium leading-relaxed italic">{selectedProject.role}</p>
                   </div>
                   
                   <div>
                      <h4 className="text-[10px] font-bold text-silver/30 mb-5 tracking-[0.5em] uppercase border-b border-white/5 pb-3">Case Study</h4>
                      <p className="text-[15px] text-silver/80 font-light leading-relaxed whitespace-pre-line">{selectedProject.description}</p>
                   </div>
                </div>

                {selectedProject.githubLink && (
                  <a 
                    href={selectedProject.githubLink} 
                    target="_blank" 
                    className="mt-16 group flex items-center justify-between bg-klein hover:bg-klein/90 p-6 rounded-2xl transition-all shadow-xl hover:shadow-klein/30"
                  >
                    <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-white">View Project Code</span>
                    <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
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
