'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/image';

const LEVEL_NAMES: Record<string, string> = {
  'intl': '国际级',
  'national': '国家级',
  'provincial': '省部级',
  'city': '市厅级',
  'school': '院校级',
  'patent': '专利/著作'
};

export default function AwardsContent({ awards }: { awards: any[] }) {
  const [selectedAward, setSelectedAward] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenModal = (award: any) => {
    setSelectedAward(award);
    setCurrentImageIndex(0);
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAward && selectedAward.media) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedAward.media.length);
    }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAward && selectedAward.media) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedAward.media.length) % selectedAward.media.length);
    }
  };

  const LEVEL_ORDER = ['intl', 'national', 'provincial', 'city', 'school', 'patent'];

  // 严格根据层级顺序排列数据，并收集无法识别的其它数据作为兜底
  const groupedAwards = LEVEL_ORDER.map(levelKey => ({
    id: levelKey,
    name: LEVEL_NAMES[levelKey],
    items: awards.filter((a: any) => a.domain === levelKey)
  })).filter(group => group.items.length > 0);

  const uncategorizedItems = awards.filter((a: any) => !LEVEL_NAMES[a.domain]);
  if (uncategorizedItems.length > 0) {
    groupedAwards.push({
      id: 'other',
      name: '特殊项',
      items: uncategorizedItems
    });
  }

  // No separation: show all in a minimalist text grid
  return (
    <div className="pt-24 lg:pt-32 p-8 lg:p-16 min-h-screen bg-[#0a0a0a] z-10 w-full overflow-x-hidden">
      <header className="mb-16 border-b border-[#111] pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extralight tracking-[0.2em] uppercase italic text-white flex gap-4 items-center">
            HONORS & AWARDS
            <span className="text-[10px] font-mono text-[#333] border border-[#222] px-2 py-1 not-italic">{awards.length} ITEMS</span>
          </h2>
        </div>
        <span className="hidden md:inline-block text-[10px] font-mono text-[#444] tracking-[0.4em] uppercase">Document_Archive</span>
      </header>
      
      {/* 按荣誉级别分组网格渲染 */}
      <div className="flex flex-col gap-16">
        {groupedAwards.map((group, groupIndex) => (
          <div key={group.id} className="flex flex-col w-full">
            {/* 独立的级别标签引导块 */}
            <div className="flex items-center gap-4 mb-6">
               <span className="text-[10px] font-mono text-white bg-white/10 border border-[#333] px-3 py-1.5 uppercase tracking-[0.3em]">
                 {group.name}
               </span>
               <div className="flex-grow h-px bg-[#111]" />
               <span className="text-[9px] font-mono text-[#444] tracking-[0.3em] uppercase">
                 {group.items.length} RECORDS
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.items.map((award: any, i: number) => (
                <motion.div
                  key={award._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                  className={`flex flex-col justify-between p-6 bg-[#050505] border border-[#111] transition-colors ${award.media && award.media.length > 0 ? 'hover:border-white cursor-pointer group' : ''}`}
                  onClick={() => {
                    if (award.media && award.media.length > 0) {
                      handleOpenModal(award);
                    }
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono text-[#555] tracking-[0.2em]">{award.year}</span>
                    </div>
                    <h3 className="text-sm font-light tracking-wider text-[#ccc] leading-relaxed uppercase group-hover:text-white transition-colors">
                      {award.title}
                    </h3>
                  </div>

                  {/* 当存在图片原件时，展示文字暗示组件 */}
                  {award.media && award.media.length > 0 && (
                    <div className="mt-8 pt-4 border-t border-[#111] flex justify-between items-center text-[9px] font-mono text-[#444] tracking-[0.3em] uppercase group-hover:text-[#888] transition-colors">
                      <span>Scan Available</span>
                      <span>[ VIEW ]</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {awards.length === 0 && (
         <div className="text-center py-32 border border-dashed border-[#222] text-xs font-mono text-[#333] tracking-[0.5em] uppercase">
            SYSTEM_ERROR: NO_AWARDS_FOUND
         </div>
      )}

      {/* 图片原件全屏查看器 (Lightbox Modal) */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-6 lg:p-12 w-screen h-[100dvh]"
            onClick={() => setSelectedAward(null)}
          >
            {/* 顶栏控制 */}
            <div className="relative w-full max-w-6xl flex justify-between items-center mb-6 z-[110] shrink-0 pointer-events-none">
              <span className="text-[#888] font-mono text-[9px] tracking-[0.3em] uppercase hidden md:block">Certificate._Scan</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedAward(null); }}
                className="pointer-events-auto text-white font-mono text-[10px] tracking-widest border border-[#333] bg-black/50 px-4 py-2 hover:bg-white hover:text-black transition-colors ml-auto cursor-pointer"
                >
                [ CLOSE ]
              </button>
            </div>

            {/* 图片与文字清晰分离：上方图片空间 (带有左右翻页控制) */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="relative w-full max-w-6xl flex-grow flex items-center justify-center overflow-hidden border border-[#222] bg-[#050505] group"
              onClick={e => e.stopPropagation()}
            >
               {selectedAward.media && selectedAward.media.length > 1 && (
                  <>
                     <button 
                       onClick={handlePrevMedia}
                       className="absolute left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 border border-[#333] text-white px-4 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black"
                     >
                       PREV
                     </button>
                     <button 
                       onClick={handleNextMedia}
                       className="absolute right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 border border-[#333] text-white px-4 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black"
                     >
                       NEXT
                     </button>
                  </>
               )}

               <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentImageIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-4 lg:inset-8 flex items-center justify-center"
                 >
                   <Image 
                     src={urlFor(selectedAward.media[currentImageIndex]).url()} 
                     alt={selectedAward.title} 
                     fill
                     className="object-contain shadow-2xl drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                     unoptimized
                   />
                 </motion.div>
               </AnimatePresence>
            </motion.div>

            {/* 图片与文字清晰分离：独立分割的下方文字面板 (增加进度指示器) */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="relative w-full max-w-6xl mt-6 flex flex-col md:flex-row justify-between items-center bg-[#0a0a0a] border border-[#111] p-6 lg:p-8 shrink-0 z-50 pointer-events-auto"
               onClick={e => e.stopPropagation()}
            >
              <h2 className="text-lg lg:text-xl font-light tracking-widest text-white uppercase text-center md:text-left">
                {selectedAward.title}
              </h2>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 shrink-0">
                {selectedAward.media && selectedAward.media.length > 1 && (
                  <span className="text-[10px] font-mono text-[#aaa] tracking-[0.2em] px-3 py-1 border border-[#333]">
                    {currentImageIndex + 1} / {selectedAward.media.length}
                  </span>
                )}
                <span className="text-[10px] font-mono text-[#666] tracking-[0.3em]">{selectedAward.year}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
